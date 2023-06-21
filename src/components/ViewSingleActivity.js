import React from "react";
import { Link } from 'react-router-dom';

const ViewSingleActivity = ({ currentActivity, setCurrentActivity, token, setToken }) => {
    
  function logout() {
    setToken('');
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("currentUser");
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
             <Link to="/activities">Back to Activities</Link>
             <Link to="/" onClick={logout}>Logout</Link>
           </React.Fragment>
        }
      </nav>
      <div className="routine">
        <h2>{currentActivity.name}</h2>
        <p>Description: {currentActivity.description}</p>
        <div>
          { currentActivity.id ? <Link to="/updateActivity"><button onClick={() => {setCurrentActivity(currentActivity)}}>UPDATE</button></Link> : null }
        </div>
      </div>
    </section>
  )
}

export default ViewSingleActivity;
