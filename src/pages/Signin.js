import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import avatar from "../assets/images/avatar.png";

function Signin() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSignIn = (event) => {
    event.preventDefault();
    if (username.length >= 4 && username.length <= 16) {
      localStorage.setItem("username", username);
      navigate("/book-list");
    }
  };

  return (
    <main className="login-container">
      <div className="login">
        <img src={avatar} alt="user_avatar" width="160" height="160" />
        <form onSubmit={handleSignIn}>
          <div className="username-field">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="type Username"
              value={username}
              onChange={handleUsernameChange}
            />
            <button type="submit" className="btn submit-btn">
              Sign-In
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Signin;
