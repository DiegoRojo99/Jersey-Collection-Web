import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./App.css";

function UserPage() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, [userId]);

  async function fetchUser() {
    try {
      const response = await fetch(
        `http://localhost:2222/collection/${userId}`
      ); // Replace '/api/users/${userId}' with your actual API endpoint for fetching a specific user
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  if (!user) {
    return (
      <div className="col-9">
        <h2 style={{ textAlign: "center", margin: "32px" }}>User not found</h2>
      </div>
    );
  }

  console.log(user);
  if (user.length !== 0) {
    return (
      <div className="col-9">
        <div className="user-info">
          <h4>{user[0].username}</h4>
        </div>
        <div className="jerseys row">
          {user.map((jersey) => (
            <div className="col" key={jersey.JerseyId}>
              <img
                className="jersey-img"
                src={jersey.JerseyImage}
                alt={jersey.Edition + jersey.Season}
              ></img>
              <h4>
              {jersey.name} {jersey.Edition} {jersey.Season}
              </h4>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="col-9">
        <h2 style={{ textAlign: "center", margin: "32px" }}>
          This user has no jerseys
        </h2>
      </div>
    );
  }
}

export default UserPage;
