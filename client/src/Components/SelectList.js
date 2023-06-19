import React, { useEffect, useState } from "react";

function CountriesSelectList(args) {
  const [countries, setCountries] = useState([]);
  const [countryCode, setCountryCode] = useState('');

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

export { CountriesSelectList };
