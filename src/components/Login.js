import React, { useState } from "react";
import { registeredUser, myData } from "../ajax-requests";

const Login = ({ setToken, setMyMessages }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function getMyData(token) {
    return await myData(token);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const user = {username, password};

    const results = await registeredUser(user);
    console.log(results)
    

    if (results.success) {
      setToken(results.data.token);
      setMyMessages(getMyData(results.data.token));
      window.localStorage.setItem("token",results.data.token);
      location.href = "/";
    } else {
      window.alert("Username and/or Password not accepted!")
    }
  };

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