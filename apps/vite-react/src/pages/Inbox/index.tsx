import { createContext, useContext } from "react";
import { useNavigate, useMatchRoute, Outlet } from "@tanstack/react-location";
import useSWR from "swr";
import z from "zod";
import { notification } from "@turbohub/github/zodScheme";
import { gitHubRestApiFetcher } from "../../lib/fetcher";
import { Notification } from "../../components/Notification";
import { LocationGenerics } from "../../App";

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
      <InboxView />
      {showDetail && (
        <div className="absolute inset-0">
          <Outlet />
        </div>
      )}
    </InboxScreenContext.Provider>
  );
}
