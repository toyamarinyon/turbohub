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
import { Inbox } from "./pages/Inbox";
import { ShowIssue } from "./pages/issues/show";

export type LocationGenerics = MakeGenerics<{
  Params: {
    owner: string;
    repo: string;
    issueNumber: string;
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
            element: <Inbox />,
            children: [
              {
                path: ":owner/:repo/issues/:issueNumber",
                element: <ShowIssue />,
              },
            ],
          },
        ]}
      >
        <div className="px-2 divide-y divide-gray-200">
          <header className="flex py-2">
            <h1 className="text-3xl font-black">TURBOHUB</h1>
          </header>
          <div className="flex">
            <ul className="w-72">
              <li>Inbox</li>
            </ul>

            <div className="px-1 flex-1 relative">
              <Outlet />
            </div>
          </div>
          <ReactLocationDevtools initialIsOpen={false} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
