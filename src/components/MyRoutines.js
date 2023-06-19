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
    console.log(myRoutines)
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
      {
        myRoutines && myRoutines.map((routine, index) => {
          return (
            <div
              key={index}
              className="routine"
            >
              { routine.name        ? <h2>{ routine.name }</h2>                 : null }
              { routine.goal        ? <p>Goal: { routine.goal }</p>             : null }
              { routine.creatorName ? <h4>Creator: { routine.creatorName }</h4> : null }
              { routine.activities  ? routine.activities.map((activity, index) => {
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