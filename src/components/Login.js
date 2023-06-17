import React, { useState, useEffect } from "react";
import { registeredUser, myRoutineData } from "../ajax-requests";

const Login = ({ token, setToken, setMyRoutines }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const user = {username, password};
    const results = await registeredUser(user);
    console.log(results)
      
    if (results) {
      setToken(results.token);
      window.localStorage.setItem("token",results.token);
      location.href = "/";
    } else {
      window.alert("Username and/or Password not accepted!")
    }
  };

  async function setUserRoutines (username, token) {
    if (token) {
      const results = await myRoutineData(username, token);
      setMyRoutines(results);
    }
  }

  useEffect((token) => {
    setUserRoutines();
  }, [ token ]);


  return (
    <form id="login" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter Username"
        onChange={(event) => setUsername(event.target.value)}
      />
      <input
        type="password"
        placeholder="Enter Password"
        onChange={(event) => setPassword(event.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  )
}

export default Login;