import { createContext, useRef, useState } from "react";
import { useNavigate, useMatchRoute, Outlet } from "@tanstack/react-location";
import useSWR from "swr";
import z from "zod";
import { notificationScheme } from "@turbohub/github/zodScheme";
import { LocationGenerics } from "../../App";
import { fetchNotification } from "./fetch";
import { Prefetch } from "./prefetch/prefech.component";

const notificationsScheme = z.array(notificationScheme);

export const InboxContext = createContext<{
  notifications: z.infer<typeof notificationsScheme>;
  onResourceClick: (linkTo: string) => void;
  onResourceHover: (linkTo: string) => void;
  showDetail: boolean;
  Outlet: typeof Outlet;
}>({
  notifications: [],
  onResourceClick: () => {},
  onResourceHover: () => {},
  showDetail: false,
  Outlet: Outlet,
});

export function InboxContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, error } = useSWR(
    {
      url: "https://api.github.com/notifications",
      query: {
        all: true,
        per_page: 10,
        query: "is:done",
      },
    },
    fetchNotification
  );
  const matchRoute = useMatchRoute<LocationGenerics>();
  const navigate = useNavigate();
  const [prefetchUrls, setPrefetchUrls] = useState<string[]>([]);
  if (error) return <div>failed to load{JSON.stringify(error)}</div>;
  if (!data) return <div>loading...</div>;

  return (
    <InboxContext.Provider
      value={{
        notifications: data,
        onResourceClick: (linkTo) => {
          navigate({ to: `/inbox/${linkTo}` });
        },
        onResourceHover: (linkTo) => {
          setPrefetchUrls((prev) => [...new Set([...prev, linkTo])]);
        },
        showDetail:
          matchRoute({ to: ":owner/:repo/issues/:issueNumber" }) != null,
        Outlet,
      }}
    >
      {children}
      <div>
        {prefetchUrls.map((prefetchUrl) => (
          <Prefetch url={prefetchUrl} key={prefetchUrl}/>
        ))}
      </div>
    </InboxContext.Provider>
  );
}
