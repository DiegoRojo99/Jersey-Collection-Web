import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./App.css";
import Jersey from "./Jersey";

function LeaguePage() {
  const { leagueId } = useParams();
  const [league, setLeague] = useState(null);

  useEffect(() => {
    fetchLeague();
  }, [leagueId]);

  async function fetchLeague() {
    try {
      const response = await fetch(`http://localhost:2222/leagues/${leagueId}`); // Replace '/api/leagues/${leagueId}' with your actual API endpoint for fetching a specific league
      const data = await response.json();
      setLeague(data);
    } catch (error) {
      console.error("Error fetching league:", error);
    }
  }

  if (!league) {
    return (
        <div className="col-9">
          <h2 style={{textAlign:"center", margin:"32px"}}>League not found</h2>
        </div>);
  }
  console.log(league[0]);

  if (league.length!==0) {
    return (
      <div className="col-9">
        <div className="club-info">
          <div className="row">
            <img
              className="club-logo"
              src={league[0].Logo}
              alt={league[0].LeagueName}
            ></img>
          </div>
          <div className="row">
            <h4>{league[0].LeagueName}</h4>
          </div>
        </div>
        <div className="jerseys row">
          {league.map((jersey) => (
            <Jersey jerseyData={jersey}/>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="col-9">
        <h2 style={{textAlign:"center", margin:"32px"}}>This league has no jerseys</h2>
      </div>
    );
  }
}

export default LeaguePage;