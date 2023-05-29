import React, { useEffect, useState } from "react";
import "./App.css";
import TeamPage from "./TeamPage";

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
      {leagues.map((league) => (
        <div key={league.LeagueId} className="col option-div">
          <img
            className="option-img"
            src={league.Logo}
            alt={league.LeagueName + " Logo"}
          />
          <p>{league.LeagueName}</p>
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
      {teams.map((team) => (
        <div key={team.teamId} className="col option-div">
          <a href={"/teams/" + team.teamId}>
            <img
              className="option-img"
              src={team.Logo}
              alt={team.name + " Logo"}
            />
          </a>
          <p>{team.name}</p>
        </div>
      ))}
    </div>
  );
}

export { LeagueOptions, TeamOptions };
