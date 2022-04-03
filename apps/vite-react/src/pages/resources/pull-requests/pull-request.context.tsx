import { createContext, useContext } from "react";
import { PullRequestQuery } from "@turbohub/github/typed-document-node";
import { ResourceContext } from "../resource.context";
import { usePullRequest } from "../../../hooks/resource";

export const PullRequestContext = createContext<{
  pullRequestQuery: PullRequestQuery;
}>({
  pullRequestQuery: {},
});

export function PullRequestContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { owner, repository, number } = useContext(ResourceContext);
  const [result] = usePullRequest({ owner, repository, number });

  if (result.fetching) {
    return <div>loading</div>;
  }
  if (result.data == null) {
    return <div>undefined</div>;
  }
  return (
    <PullRequestContext.Provider
      value={{
        pullRequestQuery: result.data,
      }}
    >
      {children}
    </PullRequestContext.Provider>
  );
}
