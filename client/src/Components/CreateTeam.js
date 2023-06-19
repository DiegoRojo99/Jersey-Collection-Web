import React, { useState } from "react";
import { CountriesSelectList } from "./SelectList";

function CreateTeam() {
  const [teamName, setTeamName] = useState("");
  const [leagueName, setLeagueName] = useState("");
  const [sport, setSport] = useState("");
  const [countryCode, setCountryCode] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
        var teamCC = document.getElementById("team-country-code").value;
      const response = await fetch("http://localhost:2222/teams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          TeamName: teamName,
          TeamCountryCode: teamCC,
        }),
      });
      if (response.ok) {
        setCountryCode("");
        setTeamName("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLeagueFormSubmit = async (event) => {
    event.preventDefault();

    try {
      var leagueCC = document.getElementById("league-country-code").value;
      const response = await fetch("http://localhost:2222/leagues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          LeagueName: leagueName,
          LeagueCountryCode: leagueCC,
          LeagueSport: sport,
        }),
      });
      if (response.ok) {
        setCountryCode("");
        setLeagueName("");
        setSport("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="col-9">
      <h3>New Team Here</h3>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={teamName}
          onChange={(event) => setTeamName(event.target.value)}
          placeholder="Team Name"
        />
        <CountriesSelectList id="team-country-code" />
        <button type="submit">Add Team</button>
      </form>

      <form onSubmit={handleLeagueFormSubmit}>
        <input
          type="text"
          value={leagueName}
          onChange={(event) => setLeagueName(event.target.value)}
          placeholder="League Name"
        />
        <CountriesSelectList id="league-country-code" />
        <input
          type="text"
          value={sport}
          onChange={(event) => setSport(event.target.value)}
          placeholder="Sport"
        />
        <button type="submit">Add League</button>
      </form>
    </div>
  );
}

export default CreateTeam;
