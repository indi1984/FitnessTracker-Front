import React from "react";
import { Link } from 'react-router-dom';

const ViewSingleActivity = ({ currentActivity, setCurrentActivity, token, setToken }) => {
    
  // async function handleDelete(routineId, token) {
  //   const results = await deleteRoutine(routineId, token);
  //   if (!results.error) {
  //     window.location.href = "/";
  //   }
  // }

  function logout() {
    setToken('');
    window.localStorage.removeItem("token");
  }

  console.log(currentActivity)

    return (
    <section className="viewRoutine">
      <nav id="navbar">
        { !token
          ? <React.Fragment>
             <Link to="/">Back to Listings</Link>
           </React.Fragment>
          :<React.Fragment>
             <Link to="/createRoutine">Create Routine</Link>
             <Link to="/myRoutines">My Routines</Link>
             <Link to="/">Back to Routines</Link>
             <Link to="/" onClick={logout}>Logout</Link>
           </React.Fragment>
        }
      </nav>
      <div className="routine">
        <h2>{currentRoutine.name}</h2>
        <p>Goal: {currentRoutine.goal}</p>
        { currentRoutine.activities ? <h4>ACTIVITIES</h4> : null }
        { currentRoutine.activities ? 
            currentRoutine.activities.map((activity, index) => {
              return (
                <div 
                  key={index}
                  className="routine_activity"
                >
                  { activity.name        ? <h5>{ activity.name }</h5>                    : null }
                  { activity.description ? <p>Description: { activity.description } </p> : null }
                  { activity.duration    ? <h5>Duration: {activity.duration}</h5>        : null }
                  { activity.count       ? <h5>Count: {activity.count}</h5>              : null }
                </div>
              )
            })
            : null 
        }
        <div>
          {/* { currentRoutine.creatorName ? <Link to="/updateActivity"><button onClick={() => {setCurrentActivity(currentActivity)}}>UPDATE</button></Link> : null } */}
          {/* { currentRoutine.creatorName ? <button onClick={() => handleDelete(routineId, token)}>DELETE</button> : null } */}
        </div>
      </div>
    </section>
  )
}

export default ViewSingleActivity;