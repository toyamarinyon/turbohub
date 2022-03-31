import { ResourceContextProvider } from "../resource.context";
import { ShowIssue } from "./show..component";

export function ShowPage() {
  return (
    <ResourceContextProvider>
      <ShowIssue />
    </ResourceContextProvider>
  );
}
