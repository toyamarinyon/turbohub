import { createContext } from "react";
import { useContext } from "react";
import { ResourceContext } from "../resource.context";
import { useIssue } from "../../../hooks/resource";
import { IssueQuery } from "@turbohub/github/typed-document-node";

export const IssueContext = createContext<{
  issueQuery: IssueQuery;
}>({
  issueQuery: {},
});

export function IssueContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { owner, repository, number } = useContext(ResourceContext);

  const [result] = useIssue({ owner, repository, number });

  if (result.fetching) {
    return <div>loading</div>;
  }
  if (result.data == null) {
    return <div>undefined</div>;
  }
  return (
    <IssueContext.Provider
      value={{
        issueQuery: result.data,
      }}
    >
      {children}
    </IssueContext.Provider>
  );
}
