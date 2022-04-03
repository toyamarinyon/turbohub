import { Provider } from "urql";
import {
  Outlet,
  ReactLocation,
  Router,
  MakeGenerics,
} from "@tanstack/react-location";
import { ReactLocationDevtools } from "@tanstack/react-location-devtools";
import { client } from "./lib/urql";
import "./index.css";
import { InboxPage } from "./pages/Inbox/inbox-page";
import { DexiePlaygroundListPage } from "./pages/dev/dexie-playground/list-page";
import { DexiePlaygroundShowPage } from "./pages/dev/dexie-playground/show-page";
import { ThreadPage } from "./pages/threads/thread-page";

export type LocationGenerics = MakeGenerics<{
  Params: {
    threadId: string;
  };
}>;

function App() {
  // Set up a ReactLocation instance
  const location = new ReactLocation();
  return (
    <Provider value={client}>
      <Router
        location={location}
        routes={[
          {
            path: "/inbox",
            element: <InboxPage />,
            children: [
              {
                path: "t/:threadId",
                element: <ThreadPage />,
              },
            ],
          },
          {
            path: "/dexie-playground/:threadId",
            element: <DexiePlaygroundShowPage />,
          },
          {
            path: "/dexie-playground",
            element: <DexiePlaygroundListPage />,
          },
        ]}
      >
        <div className="divide-y divide-gray-200 h-screen flex flex-col">
          <header className="flex py-2 px-4">
            <h1 className="text-3xl font-black">TURBOHUB</h1>
          </header>
          <div className="flex flex-1 overflow-hidden px-4">
            <ul className="w-72 px-4 pt-8 text-xl">
              <li>Inbox</li>
            </ul>

            <Outlet />
          </div>
          <ReactLocationDevtools initialIsOpen={false} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
