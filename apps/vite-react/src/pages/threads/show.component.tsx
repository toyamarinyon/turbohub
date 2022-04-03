import { useContext } from "react";
import { IssueContextProvider } from "../resources/issues/issue.context";
import { ShowIssue } from "../resources/issues/show.component";
import { PullRequestContextProvider } from "../resources/pull-requests/pull-request.context";
import { ShowPullRequest } from "../resources/pull-requests/show.component";
import { ResourceContext } from "../resources/resource.context";

export function ShowThread() {
  const { type } = useContext(ResourceContext);
  if (type === "pulls") {
    return (
      <PullRequestContextProvider>
        <ShowPullRequest />
      </PullRequestContextProvider>
    );
  } else if (type === "issues") {
    return (
      <IssueContextProvider>
        <ShowIssue />
      </IssueContextProvider>
    );
  }
  return <div>WIP</div>;
}
