// api.js

// Function to fetch jerseys
export const fetchJerseys = async () => {
    try {
      const response = await fetch('/api/jerseys'); // Replace '/api/jerseys' with your actual API endpoint
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching jerseys:', error);
      throw error;
    }
  };
  
// Function to fetch jerseys
export const fetchLeagues = async () => {
    try {
        var myHeaders= {'Access-Control-Allow-Origin' : '*'};
        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
            Headers: myHeaders
          };
      const response = await fetch('http://localhost:2222/leagues',requestOptions); // Replace '/api/jerseys' with your actual API endpoint
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching jerseys:', error);
      throw error;
    }
  };
  