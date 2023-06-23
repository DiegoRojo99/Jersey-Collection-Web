import React, { useEffect, useState } from "react";

function CountriesSelectList(args) {
  const [countries, setCountries] = useState([]);
  const [countryCode, setCountryCode] = useState("");

  useEffect(() => {
    getCountriesSelectList();
  }, []);

  async function getCountriesSelectList() {
    try {
      const response = await fetch("http://localhost:2222/countries"); // Replace '/api/leagues' with your actual API endpoint
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error("Error fetching leagues:", error);
    }
  }

  const handleCountryChange = (event) => {
    setCountryCode(event.target.value);
  };

  return (
    <select id={args.id} value={countryCode} onChange={handleCountryChange}>
      {countries.map((country) => (
        <option key={country.CountryCode} value={country.CountryCode}>
          {country.CountryName}
        </option>
      ))}
    </select>
  );
}

function TeamsSelectList(args) {
  const [teams, setTeams] = useState([]);
  const [teamId, setTeamId] = useState("");

  useEffect(() => {
    getTeamsSelectList();
  }, []);

  async function getTeamsSelectList() {
    try {
      const response = await fetch("http://localhost:2222/teams"); // Replace '/api/leagues' with your actual API endpoint
      const data = await response.json();
      setTeams(data);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  }

  const handleTeamChange = (event) => {
    setTeamId(event.target.value);
  };

  return (
    <select id={args.id} value={teamId} onChange={handleTeamChange}>
      {teams.map((team) => (
        <option key={team.TeamId} value={team.TeamId}>
          {team.TeamName}
        </option>
      ))}
    </select>
  );
}

function LeaguesSelectList(args) {
  const [leagues, setLeagues] = useState([]);
  const [leagueId, setLeagueId] = useState("");

  useEffect(() => {
    getLeaguesSelectList();
  }, []);

  async function getLeaguesSelectList() {
    try {
      const response = await fetch("http://localhost:2222/leagues"); // Replace '/api/leagues' with your actual API endpoint
      const data = await response.json();
      setLeagues(data);
    } catch (error) {
      console.error("Error fetching leagues:", error);
    }
  }

  const handleLeagueChange = (event) => {
    setLeagueId(event.target.value);
  };

  return (
    <select id={args.id} value={leagueId} onChange={handleLeagueChange}>
      {leagues.map((league) => (
        <option key={league.LeagueId} value={league.LeagueId}>
          {league.LeagueName}
        </option>
      ))}
    </select>
  );
}

function BrandsSelectList(args) {
  const [brands, setBrands] = useState([]);
  const [brandId, setBrandId] = useState("");

  useEffect(() => {
    getBrandsSelectList();
  }, []);

  async function getBrandsSelectList() {
    try {
      const response = await fetch("http://localhost:2222/brands"); // Replace '/api/leagues' with your actual API endpoint
      const data = await response.json();
      setBrands(data);
    } catch (error) {
      console.error("Error fetching leagues:", error);
    }
  }

  const handleBrandChange = (event) => {
    setBrandId(event.target.value);
  };

  return (
    <select id={args.id} value={brandId} onChange={handleBrandChange}>
      {brands.map((b) => (
        <option key={b.BrandId} value={b.BrandId}>
          {b.BrandName}
        </option>
      ))}
    </select>
  );
}

export {
  CountriesSelectList,
  TeamsSelectList,
  LeaguesSelectList,
  BrandsSelectList,
};
