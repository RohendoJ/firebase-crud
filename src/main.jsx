import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCircleNotch,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

library.add(faCircleNotch, faPenToSquare, faTrash);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
