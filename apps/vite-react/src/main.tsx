import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { NotificationList } from "./components/Notification";

ReactDOM.render(
  <React.StrictMode>
    <NotificationList />
  </React.StrictMode>,
  document.getElementById("root")
);
