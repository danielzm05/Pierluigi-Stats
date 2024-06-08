import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import { FiltersProvider } from "./context/filter.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      <Route path="/pierluigi-stats" element={<Home />} />
      <Route
        path="/pierluigi-stats/dashboard"
        element={
          <FiltersProvider>
            <App />
          </FiltersProvider>
        }
      />
    </Routes>
  </Router>
);
