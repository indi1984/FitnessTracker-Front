import React from "react";
import { Link } from 'react-router-dom';
import { deleteRoutine, myData } from "../ajax-requests";

const ViewSingleRoutine = ({ user, currentRoutine, setCurrentRoutine, token, setToken }) => {
  console.log(user);
    
  async function handleDelete(routineId, token) {
    const results = await deleteRoutine(routineId, token);
    if (results.success) {
      window.location.href = "/";
    }
  }

  function logout() {
    setToken('');
    window.localStorage.removeItem("token");
  }

  console.log(currentRoutine)

    return (
    <section className="viewPost">
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
      <div className="post">
        <h2>{currentRoutine.name}</h2>
        <p>{currentRoutine.goal}</p>
          { currentRoutine.activities ? currentRoutine.activities.map((activity, index) => {
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
        <div>
          { currentRoutine.creatorName ? <Link to="/updateRoutine"><button onClick={() => {setCurrentRoutine(currentRoutine)}}>UPDATE</button></Link> : null }
          { currentRoutine.creatorName ? <button onClick={() => handleDelete(routineId, token)}>DELETE</button> : null }
        </div>
      </div>
    </section>
  )
}

export default ViewSingleRoutine;