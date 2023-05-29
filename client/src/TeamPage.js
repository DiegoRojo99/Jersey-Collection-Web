import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./App.css";

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
      console.log(data);
      setTeam(data);
    } catch (error) {
      console.error('Error fetching team:', error);
    }
  }

  if (!team) {
    return <div>Loading...</div>;
  }

  return (
    <div className="col-9">
      <div className="jerseys row">
        {team.map((jersey) => (
          <div className='col' key={jersey.JerseyId}>
            <img className='jersey-img' src={jersey.JerseyImage} alt={jersey.Edition+jersey.Season}></img>
            <h4>{jersey.Edition} {jersey.Season}</h4>
          </div>
        ))}
    </div>
    </div>
  );
}

export default TeamPage;
