import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const MyRoutines = ({ myRoutines, token, setToken, setCurrentRoutine }) => {

  function logout() {
    setToken('');
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("currentUser");
  }

   return (
    <section className="routines">
      <nav id="navbar">
        { !token
          ? window.location.href="/"
          : <React.Fragment>
              <Link to="/createRoutine">Create Routine</Link>
              <Link to="/">Back to All Routines</Link>
              <Link to="/" onClick={logout}>Logout</Link>
            </React.Fragment>
        }
        </nav>
      <h2>My Routines</h2>
      {
        myRoutines && myRoutines.map((routine, index) => {
          return (
            <div
              key={index}
              className="routine"
            >
              { routine.name        ? <h2>{ routine.name }</h2>                 : null }
              { routine.goal        ? <p>Goal: { routine.goal }</p>             : null }
              { routine.isPublic    ? <p>Public: TRUE</p>      : <p>Public: FALSE</p> }
              {/* { routine.creatorName ? <h4>Creator: { routine.creatorName }</h4> : null } <= seemed unnecessary when viewing only "my" routines */}
              { routine.activities.length > 0 ? <h4>ACTIVITIES</h4> : <h4>NO ACTIVITIES ADDED YET!</h4> }
              { routine.activities.length > 0 ? routine.activities.map((activity, index) => {
                <div 
                  key={index}
                  className="routine_activity"
                >
                  { activity.name     ? <h5>{ activity.name }</h5>             : null }
                  { activity.goal     ? <p>{ activity.goal } </p>              : null }
                  { activity.duration ? <h5>Duration: {activity.duration}</h5> : null }
                  { activity.count    ? <h5>Count: {activity.count}</h5>       : null }
                </div>
              })                                                               : null }
              { <Link to="/viewSingleRoutine"><button onClick={() => {setCurrentRoutine(routine)}}>VIEW ROUTINE</button></Link> }
            </div>
          )
        })
      }
    </section>
   )
}

export default MyRoutines;
