import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { myRoutineData, myData }from '../ajax-requests';

const MyRoutines = ({ setMyRoutines, myRoutines, token, setToken, setCurrentRoutine}) => {
   
  async function getUserInfo(token) {
    const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEzNSwidXNlcm5hbWUiOiJLZXZpbkhhcnAiLCJpYXQiOjE2ODcyMDc4MjYsImV4cCI6MTY4NzgxMjYyNn0._fdks1HhW6aa7NjePec6zcEPVy7M0pmrQKZ1gBKWnIQ'
    const results = await myData(testToken);
    const username = results.username;
    console.log(username)
    return username;
  }
  
 

  async function setUserRoutines() {
    if (token) {
      const username = await getUserInfo();
      const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEzNSwidXNlcm5hbWUiOiJLZXZpbkhhcnAiLCJpYXQiOjE2ODcyMDc4MjYsImV4cCI6MTY4NzgxMjYyNn0._fdks1HhW6aa7NjePec6zcEPVy7M0pmrQKZ1gBKWnIQ'
      const results = await myRoutineData(username, testToken);
      setMyRoutines(results);
      console.log(myRoutines);
    }
  }

  function logout() {
    setToken('');
    window.localStorage.removeItem("token");
  }

  useEffect(() => {
    getUserInfo();
    setUserRoutines();
  }, []);

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
              { routine.isPublic    ? <p>isPublic: { routine.isPublic }</p>     : null }
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