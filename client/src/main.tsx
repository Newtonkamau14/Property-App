import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { PropertyContextProvider } from "./context/PropertyContext.tsx";
import { AuthContextProvider } from "./context/AuthContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <PropertyContextProvider>
        <App />
      </PropertyContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
