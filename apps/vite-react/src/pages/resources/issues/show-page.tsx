import { ResourceContextProvider } from "../resource.context";
import { IssueContextProvider } from "./issue.context";
import { ShowIssue } from "./show.component";

export function ShowPage() {
  return (
    <ResourceContextProvider>
      <IssueContextProvider>
        <ShowIssue />
      </IssueContextProvider>
    </ResourceContextProvider>
  );
}
