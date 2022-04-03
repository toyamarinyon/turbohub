import { createContext } from "react";
import { useContext } from "react";
import { ResourceContext } from "../resource.context";
import { useIssue } from "../../../hooks/resource";
import { IssueQuery } from "@turbohub/github/graphql-request-sdk";

export const IssueContext = createContext<{
  issue: IssueQuery;
}>({
  issue: {},
});

export function IssueContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { owner, repository, number } = useContext(ResourceContext);

  const [result] = useIssue({ owner, repository, number: number });

  if (result.fetching) {
    return <div>loading</div>;
  }
  if (result.data == null) {
    return <div>undefined</div>;
  }
  return (
    <IssueContext.Provider
      value={{
        issue: result.data,
      }}
    >
      {children}
    </IssueContext.Provider>
  );
}
