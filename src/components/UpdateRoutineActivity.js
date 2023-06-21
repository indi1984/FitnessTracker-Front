import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { updateRoutineActivity } from "../ajax-requests";

const UpdateRoutineActivity = ({ token, setToken, currentRoutineActivity }) => {
  const { routineActivityId, count, duration } = currentRoutineActivity;
  const [updatedCount, setUpdatedCount] = useState(count);
  const [updatedDuration, setUpdatedDuration] = useState(duration);

  async function handleSubmit(event) {
    event.preventDefault();
    const routineActivity = { 
      count: updatedCount, 
      duration: updatedDuration, 
    };
    const results = await updateRoutineActivity(routineActivityId, token, routineActivity);
     if (!results.error) {  
      alert("Activity updated successfully!");
      window.location.href = "/";
    } else if (results.error.includes("duplicate key")) {
      alert("An activity with this name already exists! Please try another activity name.");
      setName("");
    }
  }

  function logout() {
    setToken('');
    window.localStorage.removeItem("token");
  }

  return (
    <main>
      <nav id="navbar">
        { !token
          ? window.location.href="/"
          : <Fragment>
              <Link to="/">Back to Routines</Link>
              <Link to="/myRoutines">My Routines</Link>
              <Link to="/" onClick={logout}>Logout</Link>
            </Fragment>
        }
        </nav>
      <div>
        {token
          ? <form onSubmit={ handleSubmit }>
              <h2>Update Routine Activity</h2>
              <fieldset>
                <div>
                  <label>Count:</label>
                  <input 
                    type="text"
                    placeholder="Enter Count*"
                    value={ updatedCount }
                    onChange={(event) => { setUpdatedCount(event.target.value) }}
                    required
                  />
                </div>
                <div>
                  <label>Duration:</label>
                  <input 
                    type="text"
                    placeholder="Enter Duration*"
                    value={ updatedDuration }
                    onChange={(event) => { setUpdatedDuration(event.target.value) }}
                    required
                  />
                </div>
                <button type="submit">Update Routine Activity</button>
              </fieldset>
            </form>
          : <h1 id="errorMessage">You must be logged in to create an activity!</h1>
        }
      </div>
    </main>
  )
}

export default UpdateRoutineActivity;
