import { Provider } from "urql";
import { Outlet, ReactLocation, Router } from "@tanstack/react-location";
import { ReactLocationDevtools } from "@tanstack/react-location-devtools";
import { client } from "./lib/urql";
import "./index.css";
import { Inbox } from "./pages/Inbox";

function App() {
  // Set up a ReactLocation instance
  const location = new ReactLocation();
  return (
    <Provider value={client}>
      <Router
        location={location}
        routes={[
          {
            path: "/",
            element: <Inbox />,
          },
        ]}
      >
        <Outlet />
        <ReactLocationDevtools initialIsOpen={false} />
      </Router>
    </Provider>
  );
}

export default App;
