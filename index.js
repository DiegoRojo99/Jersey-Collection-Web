const express = require("express");
const app = express();
const axios = require("axios");
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Create a connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "jersey_app",
});

// Test the database connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to the database");
    connection.release();
  }
});

app.get("/", (req, res) => {});
app.get("/teams/name/:teamName", (req, res) => {
  const teamName = req.params.teamName;
  let q = "SELECT * FROM team t WHERE t.name like '%" + teamName + "%'";
  // Here, you can write your logic to retrieve data for the specified team ID from your database or any other data source
  pool.query(q, (err, results) => {
    if (err) {
      console.error("Error fetching jerseys from the database:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json(results);
    }
  });
});

app.get("/countries", (req, res) => {
  pool.query("SELECT * FROM country", (err, results) => {
    if (err) {
      console.error("Error fetching jerseys from the database:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json(results);
    }
  });
});

app.get("/countries/:countryCode", (req, res) => {
  const countryCode = req.params.countryCode;

  // Here, you can write your logic to retrieve data for the specified team ID from your database or any other data source
  pool.query(
    "SELECT * FROM country c, team t WHERE c.CountryCode=t.TeamCountryCode and c.CountryCode=?",
    countryCode,
    (err, results) => {
      if (err) {
        console.error("Error fetching teams from the database:", err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.status(200).json(results);
      }
    }
  );
});


app.get("/teams/:teamId", (req, res) => {
  const teamId = req.params.teamId;

  // Here, you can write your logic to retrieve data for the specified team ID from your database or any other data source
  pool.query(
    "SELECT * FROM jersey j, team t WHERE j.teamId=t.teamId and j.teamId=?",
    teamId,
    (err, results) => {
      if (err) {
        console.error("Error fetching jerseys from the database:", err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.status(200).json(results);
      }
    }
  );
});

app.put("/teams/:teamId", (req, res) => {
  const teamId = req.params.teamId;
  const teamLogo = req.body.teamLogo;
  let q = 'update team set TeamBadge="'+teamLogo+'" where TeamId=?';
  
  pool.query(
    q,
    teamId,
    (err, results) => {
      if (err) {
        console.error("Error fetching jerseys from the database:", err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.status(200).json(results);
      }
    }
  );
});

app.get("/collection/:userId", (req, res) => {
  const userId = req.params.userId;

  // Here, you can write your logic to retrieve data for the specified team ID from your database or any other data source
  pool.query(
    "SELECT * FROM jersey j, team t, user u, collection c WHERE c.user_id=u.id and t.teamId=j.teamId and j.jerseyID=c.jersey_id and c.user_id=?",
    userId,
    (err, results) => {
      if (err) {
        if (err.errno === 1062) {
          console.error("Jersey already in collection :", err);
          res.status(409).json({ error: "Jersey already in collection" });
        } else {
          console.error("Error fetching jerseys to the database:", err);
          res.status(500).json({ error: "Internal server error" });
        }
      } else {
        res.status(200).json(results);
      }
    }
  );
});

app.post("/wishlist/:userId", (req, res) => {
  const userId = req.params.userId;
  const jerseyId = req.body.jerseyId;
  let insertQuery =
    "INSERT INTO wishlist (user_id,jersey_id) VALUES(" +
    userId +
    "," +
    jerseyId +
    ")";

  // Here, you can write your logic to retrieve data for the specified team ID from your database or any other data source
  pool.query(insertQuery, (err, results) => {
    if (err) {
      if (err.errno === 1062) {
        console.error("Jersey already in wishlist :", err);
        res.status(409).json({ error: "Jersey already in wishlist" });
      } else {
        console.error("Error fetching jerseys to the database:", err);
        res.status(500).json({ error: "Internal server error" });
      }
    } else {
      res.status(200).json(results);
    }
  });
});

app.post("/collection/:userId", (req, res) => {
  const userId = req.params.userId;
  const jerseyId = req.body.jerseyId;
  let insertQuery =
    "INSERT INTO collection (user_id,jersey_id) VALUES(" +
    userId +
    "," +
    jerseyId +
    ")";

  // Here, you can write your logic to retrieve data for the specified team ID from your database or any other data source
  pool.query(insertQuery, (err, results) => {
    if (err) {
      console.error("Error fetching jerseys to the database:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json(results);
    }
  });
});

app.get("/wishlist/:userId", (req, res) => {
  const userId = req.params.userId;

  // Here, you can write your logic to retrieve data for the specified team ID from your database or any other data source
  pool.query(
    "SELECT * FROM jersey j, team t, user u, wishlist c WHERE c.user_id=u.id and t.teamId=j.teamId and j.jerseyID=c.jersey_id and c.user_id=?",
    userId,
    (err, results) => {
      if (err) {
        console.error("Error fetching jerseys from the database:", err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.status(200).json(results);
      }
    }
  );
});

app.get("/leagues/:leagueId", (req, res) => {
  const leagueId = req.params.leagueId;

  // Here, you can write your logic to retrieve data for the specified team ID from your database or any other data source
  pool.query(
    "SELECT * FROM jersey j, team t, league l WHERE j.LeagueId=l.LeagueId and j.teamId=t.teamId and j.LeagueId=?",
    leagueId,
    (err, results) => {
      if (err) {
        console.error("Error fetching jerseys from the database:", err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.status(200).json(results);
      }
    }
  );
});

const port = 2222; // Replace with your desired port number

app.get("/jerseys", (req, res) => {
  pool.query("SELECT * FROM jersey", (err, results) => {
    if (err) {
      console.error("Error fetching jerseys from the database:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json(results);
    }
  });
});

app.get("/teams", (req, res) => {
  pool.query("SELECT * FROM team", (err, results) => {
    if (err) {
      console.error("Error fetching jerseys from the database:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json(results);
    }
  });
});

app.post('/teams', (req, res) => {
  const teamName = req.body.TeamName;
  const countryCode = req.body.TeamCountryCode;
  let insertQuery = 'INSERT INTO team (TeamName,TeamCountryCode) VALUES("'+teamName+'","'+countryCode+'")';

  // Here, you can write your logic to retrieve data for the specified team ID from your database or any other data source
  pool.query(insertQuery, (err, results) => {
    if (err) {
      console.error('Error fetching jerseys to the database:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json(results);
    }
  });
});

app.get("/countries", (req, res) => {
  pool.query("SELECT * FROM country", (err, results) => {
    if (err) {
      console.error("Error fetching jerseys from the database:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json(results);
    }
  });
});

app.get("/leagues", (req, res) => {
  pool.query("SELECT * FROM league", (err, results) => {
    if (err) {
      console.error("Error fetching jerseys from the database:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json(results);
    }
  });
});

app.post('/leagues', (req, res) => {
  const leagueName = req.body.LeagueName;
  const countryCode = req.body.LeagueCountryCode;
  const sport = req.body.LeagueSport;
  let insertQuery = 'INSERT INTO league (LeagueName,LeagueCountryCode, LeagueSport) VALUES("'+leagueName+'","'+countryCode+'","'+sport+'")';

  // Here, you can write your logic to retrieve data for the specified team ID from your database or any other data source
  pool.query(insertQuery, (err, results) => {
    if (err) {
      console.error('Error fetching jerseys to the database:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Fetch teams from an API and insert into the database
async function populateLeague() {
  try {
    const response = await axios.get(
      "https://www.thesportsdb.com/api/v1/json/3/all_leagues.php"
    );
    const leagues = response.data.leagues;

    leagues.forEach(async (league) => {
      await insertLeague(league);
    });

    console.log("Leagues inserted successfully");
  } catch (error) {
    console.error("Error populating teams:", error);
  }
}

// Insert a team into the database
async function insertLeague(league) {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO leagues (LeagueId, LeagueName, Sport) VALUES (?, ?, ?)",
      [league.idLeague, league.strLeague, league.strSport],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}

// Call the function to populate teams
function getLeagues() {
  console.log("HERE 1");
  pool.query("SELECT * FROM team", (err, results) => {
    if (err) {
      console.error("Error fetching jerseys from the database:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      console.log("HERE");
      fillLeagueOptions(results);
    }
  });
}

function fillLeagueOptions(results) {
  let lo = document.getElementById("league-options");
  results.forEach((element) => {
    let divRow = document.createElement("div");
    divRow.class = "col team-option";
    let img = document.createElement("img");
    img.class = "option-img";
    img.src = element.logo;
    let p = document.createElement("p");
    p.textContent = element.LeagueName;
    divRow.appendChild(img);
    divRow.appendChild(p);
    lo.appendChild(divRow);
  });
}
