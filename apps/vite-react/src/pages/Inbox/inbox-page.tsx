import { InboxComponent, LayoutComponent } from "./inbox.component";
import { InboxContextProvider } from "./inbox.context";

export function InboxPage() {
  return (
    <InboxContextProvider>
      <LayoutComponent>
        <InboxComponent />
      </LayoutComponent>
    </InboxContextProvider>
  );
}
