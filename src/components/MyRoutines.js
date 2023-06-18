import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const MyRoutines = ({ setCurrentRoutines, username, token, setToken }) => {

  async function getRoutine(username, token) {
    const routineToView = await myRoutineData(username, token);
    setCurrentRoutines(routineToView);
  }

  function logout() {
    setToken('');
    window.localStorage.removeItem("token");
  }

   return (
    <section className="messages">
      <nav id="navbar">
        { !token
          ? window.location.href="/"
          : <React.Fragment>
              <Link to="/createPost">Create Routine</Link>
              <Link to="/">Back to Routines</Link>
              <Link to="/" onClick={logout}>Logout</Link>
            </React.Fragment>
        }
        </nav>
      <h2>My Routines</h2>
      {
        routineToView.map((routine, index) => {
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
      }
    </section>
   )
}

export default MyRoutines;