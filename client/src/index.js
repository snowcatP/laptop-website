import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./client/components/assets/css/bootstrap.min.css";
import "./client/components/assets/css/font-awesome.min.css";
import "./client/components/assets/css/style.css";

import { AuthContextProvider } from "./client/context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);