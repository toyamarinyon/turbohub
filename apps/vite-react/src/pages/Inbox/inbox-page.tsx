import { InboxComponent } from "./inbox.component";
import { LayoutComponent } from "./layout.component";
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
