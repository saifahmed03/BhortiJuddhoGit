// src/index.js
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// GLOBAL STYLES
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.css";

// ROOT CONTAINER
const rootContainer = document.getElementById("root");
const root = createRoot(rootContainer);

// RENDER APP
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
