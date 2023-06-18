import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { myRoutineData, myData }from '../ajax-requests';

const MyRoutines = ({ setMyRoutines, myRoutines, routines, token, setToken }) => {

  async function getUserData (token) {
    const results = await myData(token);
    console.log("USER DATA", results);
    const username = results.username;
    return username;
  }
  
    async function getRoutines(token) {
    getUserData(token);
    const routineToView = await myRoutineData(token);
    console.log(routineToView)
    setMyRoutines(routineToView);
  }

  function logout() {
    setToken('');
    window.localStorage.removeItem("token");
  }

  useEffect((username, token) => {
    getRoutines(username, token);
  }, []);

   return (
    <section className="messages">
      <nav id="navbar">
        { !token
          ? window.location.href="/"
          : <React.Fragment>
              <Link to="/createRoutine">Create Routine</Link>
              <Link to="/">Back to Routines</Link>
              <Link to="/" onClick={logout}>Logout</Link>
            </React.Fragment>
        }
        </nav>
      <h2>My Routines</h2>
      {/* {
        // myRoutines.map((routine, index) => {
          return (
            <div
              key={index}
              className="message"
            >
              <h3>From: {message.fromUser.username}</h3>
              { message.content ? <h4>Message: {message.content}</h4> : null}
              <Link to="/viewPost" onClick={() => getPost(message.post._id)}>VIEW MY POST: {message.post.title}</Link>
            </div>
          )
        })
      } */}
    </section>
   )
}

export default MyRoutines;