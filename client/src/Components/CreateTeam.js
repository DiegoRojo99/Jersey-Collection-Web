import React, { useState } from "react";
import { CountriesSelectList, TeamsSelectList, LeaguesSelectList } from "./SelectList";

function CreateTeam() {
  const [teamName, setTeamName] = useState("");
  const [leagueName, setLeagueName] = useState("");
  const [teamBadge, setTeamBadge] = useState("");
  const [leagueLogo, setLeagueLogo] = useState("");
  const [edition, setEdition] = useState("");
  const [season, setSeason] = useState("");
  const [primaryColor, setPrimaryColor] = useState("");
  const [secondaryColor, setSecondaryColor] = useState("");
  const [jerseyImage, setJerseyImage] = useState("");
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
          TeamBadge: teamBadge,
        }),
      });
      if (response.ok) {
        setCountryCode("");
        setTeamBadge("");
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
          LeagueLogo: leagueLogo,
        }),
      });
      if (response.ok) {
        setCountryCode("");
        setLeagueLogo("");
        setLeagueName("");
        setSport("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleJerseyFormSubmit = async (event) => {
    event.preventDefault();

    try {
      var teamId = document.getElementById("jersey-team-id").value;
      var leagueId = document.getElementById("jersey-league-id").value;
      const response = await fetch("http://localhost:2222/jerseys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Season: season,
          Edition: edition,
          TeamId: teamId,
          LeagueId: leagueId,
          PrimaryColor: primaryColor,
          SecondaryColor: secondaryColor,
          JerseyImage: jerseyImage,
        }),
      });
      if (response.ok) {
        setEdition("");
        setSecondaryColor("");
        setPrimaryColor("");
        setEdition("");
        setSeason("");
        setJerseyImage("");
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
        <input
          type="text"
          value={teamBadge}
          onChange={(event) => setTeamBadge(event.target.value)}
          placeholder="Team Badge Image URL"
        />
        <button type="submit">Add Team</button>
      </form>

      <h3>New League Here</h3>
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
        <input
          type="text"
          value={leagueLogo}
          onChange={(event) => setLeagueLogo(event.target.value)}
          placeholder="Logo Image URL"
        />
        <button type="submit">Add League</button>
      </form>

      <h3>New Jersey Here</h3>
      <form onSubmit={handleJerseyFormSubmit}>
        <input
          type="text"
          value={edition}
          onChange={(event) => setEdition(event.target.value)}
          placeholder="Edition"
        />
        <TeamsSelectList id="jersey-team-id" />
        <LeaguesSelectList id="jersey-league-id" />
        <input
          type="number"
          value={season}
          onChange={(event) => setSeason(event.target.value)}
          placeholder="Season"
        />
        <input
          type="text"
          value={primaryColor}
          onChange={(event) => setPrimaryColor(event.target.value)}
          placeholder="Primary Color"
        />
        <input
          type="text"
          value={secondaryColor}
          onChange={(event) => setSecondaryColor(event.target.value)}
          placeholder="Secondary Color"
        />
        <input
          type="text"
          value={jerseyImage}
          onChange={(event) => setJerseyImage(event.target.value)}
          placeholder="Image URL"
        />
        <button type="submit">Add Jersey</button>
      </form>
    </div>
  );
}

export default CreateTeam;
