import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./App.css";
import Jersey from "./Jersey";

function TeamPage() {
  const { teamId } = useParams();
  const [team, setTeam] = useState(null);

  useEffect(() => {
    fetchTeam();
  }, [teamId]);

  async function fetchTeam() {
    try {
      const response = await fetch(`http://localhost:2222/teams/${teamId}`); // Replace '/api/teams/${teamId}' with your actual API endpoint for fetching a specific team
      const data = await response.json();
      setTeam(data);
    } catch (error) {
      console.error("Error fetching team:", error);
    }
  }

  if (!team) {
    return (
        <div className="col-9">
          <h2 style={{textAlign:"center", margin:"32px"}}>Team not found</h2>
        </div>);
  }

  if (team.length!==0) {
    return (
      <div className="col-9">
        <div className="club-info">
          <div className="row">
            <img
              className="club-logo"
              src={team[0].Logo}
              alt={team[0].name}
            ></img>
          </div>
          <div className="row">
            <h4>{team[0].name}</h4>
          </div>
        </div>
        <div className="jerseys row">
          {team.map((jersey) => (
            <Jersey jerseyData={jersey}/>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="col-9">
        <h2 style={{textAlign:"center", margin:"32px"}}>This team has no jerseys</h2>
      </div>
    );
  }
}

export default TeamPage;
