import { useMatch } from "@tanstack/react-location";
import { threadUrlFetcher } from "@turbohub/github";
import { createContext } from "react";
import useSWR from "swr";
import { LocationGenerics } from "../../App";

export const ResourceContext = createContext<{
  onBackButtonClick: () => void;
  onArchiveButtonClick: () => void;
  url: string;
  owner: string;
  repository: string;
  type: string;
  number: number;
}>({
  onBackButtonClick: () => {},
  onArchiveButtonClick: () => {},
  url: "",
  owner: "",
  repository: "",
  type: "",
  number: 0,
});

export function ResourceContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    params: { threadId },
  } = useMatch<LocationGenerics>();
  const { data, error } = useSWR(
    {
      threadId: parseInt(threadId),
      token: import.meta.env.VITE_GITHUB_PERSONAL_ACCESS_TOKEN,
    },
    threadUrlFetcher
  );
  if (error) return <div>failed to load{JSON.stringify(error)}</div>;
  if (!data) return <div>loading...</div>;

  return (
    <ResourceContext.Provider
      value={{
        onBackButtonClick: () => {
          history.back();
        },
        onArchiveButtonClick: () => {},
        ...data
      }}
    >
      {children}
    </ResourceContext.Provider>
  );
}
