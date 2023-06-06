import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./App.css";
import Jersey from "./Jersey";

function UserPage() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [wishlist, setWishlist] = useState(null);

  useEffect(() => {
    fetchUser();
    fetchWishlist();
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
  async function fetchWishlist() {
    try {
      const response = await fetch(
        `http://localhost:2222/wishlist/${userId}`
      ); // Replace '/api/users/${userId}' with your actual API endpoint for fetching a specific user
      const data = await response.json();
      setWishlist(data);
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
          <h4>{user[0].username.toUpperCase()}</h4>
        </div>
        <div className="jerseys row">
          <div className="title-div">
            <h4 className="title">Collection</h4>
          </div>
          {user.map((jersey) => (
            <Jersey jerseyData={jersey}/>
          ))}
        </div>
        <div className="jerseys row">
          <div className="title-div">
            <h4 className="title">Wishlist</h4>
          </div>
          {wishlist.map((jersey) => (
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
