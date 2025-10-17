import React from "react";
import { createRoot } from "react-dom/client";
import YesServicesWebsite from "./YesServicesWebsite";
import "./index.css";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <YesServicesWebsite />
  </React.StrictMode>
);
