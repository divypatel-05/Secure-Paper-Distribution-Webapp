import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { AddUser, Login } from "./routes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" exact element={<App />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/adduser" exact element={<AddUser />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
