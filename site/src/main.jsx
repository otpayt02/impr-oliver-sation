import React from "react";
import { createRoot } from "react-dom/client";
import { StudioExperience } from "./StudioExperience.jsx";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StudioExperience />
  </React.StrictMode>,
);
