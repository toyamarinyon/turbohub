import { createContext, useContext, useRef } from "react";
import { useNavigate, useMatchRoute, Outlet } from "@tanstack/react-location";
import useSWR from "swr";
import z from "zod";
import cn from "classnames";
import { notification } from "@turbohub/github/zodScheme";
import { gitHubRestApiFetcher } from "../../lib/fetcher";
import { Notification } from "../../components/Notification";
import { LocationGenerics } from "../../App";
import { useEffect } from "react";
import { useState } from "react";

const notificationsScheme = z.array(notification);

const InboxScreenContext = createContext<{
  notifications: z.infer<typeof notificationsScheme>;
  onNotificationClick: (linkTo: string) => void;
}>({
  notifications: [],
  onNotificationClick: () => {},
});

export function InboxView() {
  const { notifications, onNotificationClick } = useContext(InboxScreenContext);
  return (
    <div className="relative">
      <section className="divide-y divide-dashed">
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            notification={notification}
            onClick={(linkTo) => onNotificationClick(linkTo)}
          />
        ))}
      </section>
    </div>
  );
}

export function Inbox() {
  const { data, error } = useSWR(
    {
      url: "https://api.github.com/notifications",
      query: {
        all: true,
        per_page: 30,
      },
    },
    gitHubRestApiFetcher(z.array(notification))
  );
  const matchRoute = useMatchRoute<LocationGenerics>();
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const showDetail =
    matchRoute({ to: ":owner/:repo/issues/:issueNumber" }) != null;
  return (
    <InboxScreenContext.Provider
      value={{
        notifications: data,
        onNotificationClick: (linkTo) => {
          navigate({ to: `/inbox/${linkTo}` });
        },
      }}
    >
      <div
        className={cn("px-1 flex-1 relative", {
          "overflow-scroll": !showDetail,
          "overflow-hidden": showDetail,
        })}
        onScroll={() => {
          if (scrollContainerRef.current == null) {
            return;
          }
          setScrollY(scrollContainerRef.current.scrollTop);
        }}
        ref={scrollContainerRef}
      >
        <InboxView />
        {scrollY}
        {showDetail && (
          <div
            className="absolute h-full bg-white w-full"
            style={{ top: `${scrollY}px` }}
          >
            <Outlet />
          </div>
        )}
      </div>
    </InboxScreenContext.Provider>
  );
}
