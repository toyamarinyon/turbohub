import { createContext, useRef } from "react";
import { useNavigate, useMatchRoute, Outlet } from "@tanstack/react-location";
import useSWR from "swr";
import z from "zod";
import cn from "classnames";
import { notification } from "@turbohub/github/zodScheme";
import { gitHubRestApiFetcher } from "../../lib/fetcher";
import { LocationGenerics } from "../../App";

const notificationsScheme = z.array(notification);

export const InboxContext = createContext<{
  notifications: z.infer<typeof notificationsScheme>;
  onNotificationClick: (linkTo: string) => void;
  showDetail: boolean;
  outlet: typeof Outlet;
}>({
  notifications: [],
  onNotificationClick: () => {},
  showDetail: false,
  outlet: Outlet,
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
        per_page: 30,
      },
    },
    gitHubRestApiFetcher(z.array(notification))
  );
  const matchRoute = useMatchRoute<LocationGenerics>();
  const navigate = useNavigate();
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <InboxContext.Provider
      value={{
        notifications: data,
        onNotificationClick: (linkTo) => {
          navigate({ to: `/inbox/${linkTo}` });
        },
        showDetail:
          matchRoute({ to: ":owner/:repo/issues/:issueNumber" }) != null,
        outlet: Outlet,
      }}
    >
      {children}
    </InboxContext.Provider>
  );
}
