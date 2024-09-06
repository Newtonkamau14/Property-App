import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { PropertyContextProvider } from "./context/PropertyContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PropertyContextProvider>
      <App />
    </PropertyContextProvider>
  </React.StrictMode>
);
