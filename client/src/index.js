import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./Components/App";
import TeamPage from "./Components/TeamPage";
import UserPage from "./Components/UserPage";
import reportWebVitals from "./reportWebVitals";
import HomePage from "./Components/HomePage";
import LeaguePage from "./Components/LeaguePage";
import SearchResults from "./Components/SearchResults";
import CreateTeam from "./Components/CreateTeam";
import CountryPage from "./Components/CountryPage";
import BrandPage from "./Components/BrandPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
        <Routes>
          <Route path="/countries/:countryCode" element={<CountryPage />}/>
          <Route path="/leagues/:leagueId" element={<LeaguePage />}/>
          <Route path="/brands/:brandId" element={<BrandPage />}/>
          <Route path="/users/:userId" element={<UserPage />}/>
          <Route path="/teams/:teamId" element={<TeamPage />}/>
          <Route path="/teams/name/:teamName" element={<SearchResults />}/>
          <Route path="/homePage" element={<HomePage />}/>
          <Route path="/createTeam" element={<CreateTeam />}/>
        </Routes>
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
