import React, { useState } from "react";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  // Function to handle search input change
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  function lookForResults(){
    //TO DO
  }

  function makeSearch(){
    window.location = "http://localhost:3000/teams/name/"+searchTerm;
  }

  return (
    <div className="row">
      <div className="col-1"></div>
      <input
        className="col-8"
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      <button className="col-2" onClick={makeSearch}>
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
      {/* Add button or submit functionality here */}
    </div>
  );
}

export default SearchBar;
