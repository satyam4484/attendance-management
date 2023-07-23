import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter as Routes } from "react-router-dom";
import { AppProvider } from "./context/Context";

const root = createRoot(document.getElementById("root"));

root.render(
  <AppProvider>
    <Routes>
      <App />
    </Routes>
  </AppProvider>
);