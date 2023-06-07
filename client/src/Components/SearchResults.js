import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./App.css";

function Teams(results){
  return(
    <div className="col-9">
      <div className="row">
      {results.results.map((team) => (
        <div key={team.teamId} className="col result-centre">
          <a href={"/teams/" + team.teamId}>
            <img className="result-img" src={team.Logo} alt="Logo" />
          </a>
          <p>{team.name}</p>
        </div>
      ))}
      </div>
    </div>
  )
}

function SearchResults() {
  const { teamName } = useParams();
  const [results, setResults] = useState(null);

  useEffect(() => {
    fetchResults();
  }, [teamName]);


  async function fetchResults() {
    try {
      const response = await fetch(`http://localhost:2222/teams/name/${teamName}`); // Replace '/api/teams/${teamId}' with your actual API endpoint for fetching a specific team
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching team:", error);
    }
  }

  if (!results) {
    return (
        <div className="col-9">
          <h2 style={{textAlign:"center", margin:"32px"}}>Nothing was found</h2>
        </div>);
  }

  if (results.length!==0) {
    return (
        <Teams results={results}/>
    );
  } else {
    return (
      <div className="col-9">
        <h2 style={{textAlign:"center", margin:"32px"}}>There is no team that matches the name</h2>
      </div>
    );
  }
}

export default SearchResults;
