import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";

// Entrambi i fogli di stile vengono caricati una volta per tutta l'app.
import "../style.css";
import "../home.css";

// HashRouter usa l'indirizzo dopo #, così le rotte funzionano anche su hosting statici.
// React inserisce tutte le schermate dentro il div con id "root" di index.html.
createRoot(document.getElementById("root")).render(
  <HashRouter>
    <App />
  </HashRouter>
);
