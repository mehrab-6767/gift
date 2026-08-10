import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import App from "./App";
import { AppFlowProvider } from "./context/AppFlowContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppFlowProvider>
      <App />
    </AppFlowProvider>
  </React.StrictMode>
);