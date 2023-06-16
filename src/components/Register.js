import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../ajax-requests";

const Register = ({ setToken, token }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match!")
    } else {
      const user = {username, password};
      const results = await registerUser(user);

      if (results.success) {
        setToken(results.data.token);
        window.localStorage.setItem("token",results.data.token);
        location.href = "/";
      }
    }
  }

  return (
    <page>
      <nav id="navbar">
      { !token
        ? <React.Fragment>
            <Link to="/login">Login</Link>
            <Link to="/">Back to Listings</Link>
          </React.Fragment>
        : window.location.href="/"
      }
      </nav>
      <section className="registerContainer">
        <div id="register">
          <form onSubmit={handleSubmit}>
          <h2>Create a New Account</h2>
            <input
              type="text"
              placeholder="Create Username"
              onChange={(event) => setUsername(event.target.value)} // passing 'event' captures the input
              required
            />
            <input
              type="password"
              placeholder="Create Password"
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Re-enter Password"
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
            />
            <button type="submit">Register</button>
          </form>
        </div>
      </section>
    </page>
  )
}

export default Register;