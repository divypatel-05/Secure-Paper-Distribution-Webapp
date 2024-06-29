import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { AddUser, Login, Admin } from "./routes";

import ExaminerList from "./routes/ExaminerList.jsx";
import InvigilatorList from "./routes/InvigilatorList.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" exact element={<App />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/adduser" exact element={<AddUser />} />
        <Route path="/admin" exact element={<Admin />} />
        <Route path="/examiner" exact element={<ExaminerList />} />
        <Route path="/invigilator" exact element={<InvigilatorList />} />

      </Routes>
    </Router>
  </React.StrictMode>
);
