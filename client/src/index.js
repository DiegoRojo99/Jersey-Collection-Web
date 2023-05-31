import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import TeamPage from "./TeamPage";
import UserPage from "./UserPage";
import reportWebVitals from "./reportWebVitals";
import HomePage from "./HomePage";
import LeaguePage from "./LeaguePage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
        <Routes>
          <Route path="/leagues/:leagueId" element={<LeaguePage />}/>
          <Route path="/collections/:userId" element={<UserPage />}/>
          <Route path="/teams/:teamId" element={<TeamPage />}/>
          <Route path="/homePage" element={<HomePage />}/>
        </Routes>
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
