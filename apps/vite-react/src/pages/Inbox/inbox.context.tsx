import { createContext, useState } from "react";
import { useNavigate, useMatchRoute, Outlet } from "@tanstack/react-location";
import useSWR from "swr";
import z from "zod";
import { notificationScheme, fetchNotification } from "@turbohub/github";
import { LocationGenerics } from "../../App";
import { Prefetch } from "./prefetch/prefech.component";

export const InboxContext = createContext<{
  notifications: z.infer<typeof notificationScheme>;
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
      },
      token: import.meta.env.VITE_GITHUB_PERSONAL_ACCESS_TOKEN,
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
        showDetail: matchRoute({ to: "t/:threadId" }) != null,
        Outlet,
      }}
    >
      {children}
      <div>
        {prefetchUrls.map((prefetchUrl) => (
          <Prefetch url={prefetchUrl} key={prefetchUrl} />
        ))}
      </div>
    </InboxContext.Provider>
  );
}
