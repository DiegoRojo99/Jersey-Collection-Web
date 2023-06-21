import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./App.css";

function Teams(results){
  if (results.results.length%4===0) {
    return(
      <div className="col-9">
        <div className="row">
        {results.results.map((team) => (
          <div key={team.TeamId} className="col-3 result-centre">
            <a href={"/teams/" + team.TeamId}>
              <img className="result-img" src={team.TeamBadge} alt="Logo" />
            </a>
            <p>{team.TeamName}</p>
          </div>
        ))}
        </div>
      </div>
    )
  } else if(results.results.length%6===0) {
    return(
      <div className="col-9">
        <div className="row">
        {results.results.map((team) => (
          <div key={team.TeamId} className="col-2 result-centre">
            <a href={"/teams/" + team.TeamId}>
              <img className="result-img" src={team.TeamBadge} alt="Logo" />
            </a>
            <p>{team.TeamName}</p>
          </div>
        ))}
        </div>
      </div>
    )
  }else if(results.results.length%5===0){
    return(
      <div className="col-9">
        <div className="row">
        {results.results.map((team) => (
          <div key={team.TeamId} className="col only-five result-centre">
            <a href={"/teams/" + team.TeamId}>
              <img className="result-img" src={team.TeamBadge} alt="Logo" />
            </a>
            <p>{team.TeamName}</p>
          </div>
        ))}
        </div>
      </div>
    )
  }else if(results.results.length%3===0){
    return(
      <div className="col-9">
        <div className="row">
        {results.results.map((team) => (
          <div key={team.TeamId} className="col-4 result-centre">
            <a href={"/teams/" + team.TeamId}>
              <img className="result-img" src={team.TeamBadge} alt="Logo" />
            </a>
            <p>{team.TeamName}</p>
          </div>
        ))}
        </div>
      </div>
    )
  }else{
    return(
      <div className="col-9">
        <div className="row">
        {results.results.map((team) => (
          <div key={team.TeamId} className="col result-centre">
            <a href={"/teams/" + team.TeamId}>
              <img className="result-img" src={team.TeamBadge} alt="Logo" />
            </a>
            <p>{team.TeamName}</p>
          </div>
        ))}
        </div>
      </div>
    )
  }

  
}

function SearchResults() {
  const { teamName } = useParams();
  const [results, setResults] = useState(null);

  useEffect(() => {
    fetchResults();
  }, [teamName]);


  async function fetchResults() {
    try {
      const response = await fetch(`http://localhost:2222/teams/name/${teamName}`); // Replace '/api/teams/${TeamId}' with your actual API endpoint for fetching a specific team
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
