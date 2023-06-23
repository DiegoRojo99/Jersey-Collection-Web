import React, { useEffect, useState } from "react";
import "./App.css";

function LeagueOptions() {
  const [leagues, setLeagues] = useState([]);

  useEffect(() => {
    getLeagueOptions();
  }, []);

  async function getLeagueOptions() {
    try {
      const response = await fetch("http://localhost:2222/leagues"); // Replace '/api/leagues' with your actual API endpoint
      const data = await response.json();
      setLeagues(data);
    } catch (error) {
      console.error("Error fetching leagues:", error);
    }
  }

  return (
    <div className="row" id="league-options">
      {leagues.map((l) => (
        <div key={l.LeagueId} className="col-4 option-div">
          <a href={"/leagues/" + l.LeagueId}>
            <img className="option-img" src={l.LeagueLogo} alt={l.LeagueName + "Logo"} />
          </a>
        </div>
      ))}
    </div>
  );
}

function TeamOptions() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    getTeamOptions();
  }, []);

  async function getTeamOptions() {
    try {
      const response = await fetch("http://localhost:2222/teams"); // Replace '/api/leagues' with your actual API endpoint
      const data = await response.json();
      setTeams(data);
    } catch (error) {
      console.error("Error fetching leagues:", error);
    }
  }

  return (
    <div className="row" id="league-options">
      {teams.map((t) => (
        <div key={t.TeamId} className="col-3 option-div">
          <a href={"/teams/" + t.TeamId}>
            <img className="option-img" src={t.TeamBadge} alt={t.TeamName} />
          </a>
        </div>
      ))}
    </div>
  );
}

function BrandOptions() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    getBrandOptions();
  }, []);

  async function getBrandOptions() {
    try {
      const response = await fetch("http://localhost:2222/brands"); // Replace '/api/leagues' with your actual API endpoint
      const data = await response.json();
      setBrands(data);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  }

  return (
    <div className="row" id="league-options">
      {brands.map((b) => (
        <div key={b.BrandId} className="col-4 option-div">
          <a href={"/brands/" + b.BrandId}>
            <img className="option-img" src={b.BrandLogo} alt={b.BrandName} />
          </a>
        </div>
      ))}
    </div>
  );
}

export { LeagueOptions, TeamOptions, BrandOptions };
