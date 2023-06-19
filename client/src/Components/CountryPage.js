import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./App.css";
import Jersey from "./Jersey";

function CountryPage() {
  const { countryCode } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    fetchCountry();
  }, [countryCode]);

  async function fetchCountry() {
    try {
      const response = await fetch(
        `http://localhost:2222/countries/${countryCode}`
      );
      const data = await response.json();
      console.log(data);
      setCountry(data);
    } catch (error) {
      console.error("Error fetching country:", error);
    }
  }

  if (!country) {
    return (
      <div className="col-9">
        <h2 style={{ textAlign: "center", margin: "32px" }}>
          Country not found
        </h2>
      </div>
    );
  }
  console.log(country[0]);

  if (country.length !== 0) {
    return (
      <div className="col-9">
        <div className="club-info">
          <div className="row">
            <img
              className="club-logo"
              src={country[0].CountryFlag}
              alt={country[0].CountryName}
            ></img>
          </div>
          <div className="row">
            <h4>{country[0].CountryName}</h4>
          </div>
        </div>
        <div className="jerseys row">
          {country.map((team) => (
            <div className="team-small col-2">
              <img src="{team.teamBadge}.png"/>
              <p>{team.TeamName}</p>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="col-9">
        <h2 style={{ textAlign: "center", margin: "32px" }}>
          This country has no jerseys
        </h2>
      </div>
    );
  }
}

export default CountryPage;
