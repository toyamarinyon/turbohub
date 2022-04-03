import { ResourceContextProvider } from "../resources/resource.context";
import { ShowThread } from "./show.component";

export function ThreadPage() {
  return (
    <ResourceContextProvider>
      <ShowThread />
    </ResourceContextProvider>
  );
}
