const express = require('express');
const app = express();
const axios = require('axios');
const mysql = require('mysql');


// Create a connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'jersey_app',
});

// Test the database connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database');
    connection.release();
  }
});

app.get('/', (req, res) => {
});


const port = 2222; // Replace with your desired port number

app.get('/jerseys', (req, res) => {
    pool.query('SELECT * FROM jerseys', (err, results) => {
      if (err) {
        console.error('Error fetching jerseys from the database:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.status(200).json(results);
      }
    });
  });
  
  app.get('/teams', (req, res) => {
    pool.query('SELECT * FROM teams', (err, results) => {
      if (err) {
        console.error('Error fetching jerseys from the database:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.status(200).json(results);
      }
    });
  });

  app.get('/leagues', (req, res) => {
    pool.query('SELECT * FROM leagues', (err, results) => {
      if (err) {
        console.error('Error fetching jerseys from the database:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.status(200).json(results);
      }
    });
  });

app.post('/wishlist', (req, res) => {
  // Handle the /wishlist endpoint logic here
  // Create wishlist, save to database, and send response
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);  
});

// Fetch teams from an API and insert into the database
async function populateLeague() {
  try {
    const response = await axios.get('https://www.thesportsdb.com/api/v1/json/3/all_leagues.php');
    const leagues = response.data.leagues;

    leagues.forEach(async (league) => {
      await insertLeague(league);
    });

    console.log('Leagues inserted successfully');
  } catch (error) {
    console.error('Error populating teams:', error);
  }
}

// Insert a team into the database
async function insertLeague(league) {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO leagues (LeagueId, LeagueName, Sport) VALUES (?, ?, ?)', [league.idLeague,league.strLeague,league.strSport], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

// Call the function to populate teams
function getLeagues(){
  
  console.log("HERE 1");
  pool.query('SELECT * FROM teams', (err, results) => {
    if (err) {
      console.error('Error fetching jerseys from the database:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      console.log("HERE");
      fillLeagueOptions(results);
    }
  });
}

function fillLeagueOptions(results){
  let lo=document.getElementById("league-options");
  results.forEach(element => {
    let divRow=document.createElement("div");
    divRow.class="col team-option";
    let img=document.createElement("img");
    img.class="option-img";
    img.src=element.logo;
    let p=document.createElement("p");
    p.textContent=element.LeagueName;
    divRow.appendChild(img);
    divRow.appendChild(p);
    lo.appendChild(divRow);
  });
}
