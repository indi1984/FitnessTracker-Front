import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { createRoutine } from "../ajax-requests";

const CreateRoutine = ({ token, setToken, setMyRoutineGoal, setMyRoutineName, myRoutineName, myRoutineGoal }) => {

  async function handleSubmit(event) {
    event.preventDefault();
    const routine = {myRoutineName, myRoutineGoal};
    const results = await createRoutine(routine, token);
    if (results.success) {
      alert("Routine created successfully!");
      window.location.href = "/";
    }
  }

  function logout() {
    setToken('');
    window.localStorage.removeItem("token");
  }

  return (
    <page>
      <nav id="navbar">
        { !token
          ? window.location.href="/"
          : <React.Fragment>
              <Link to="/">Back to Routines</Link>
              <Link to="/profile">My Routines</Link>
              <Link to="/" onClick={logout}>Logout</Link>
            </React.Fragment>
        }
        </nav>
      <div>
        {token
          ? <form onSubmit={handleSubmit}>
              <h2>Add New Routine</h2>
              <fieldset>
                <div>
                  <label>Name:</label>
                  <input 
                    type="text"
                    placeholder="Enter Name*"
                    value={myRoutineName}
                    onChange={(event) => {setMyRoutineName(event.target.value)}}
                    required
                  />
                </div>
                <div>
                  <label>Goal:</label>
                  <input 
                    type="text"
                    placeholder="Enter Goal*"
                    value={myRoutineDescription}
                    onChange={(event) => {setMyRoutineGoal(event.target.value)}}
                    required
                  />
                </div>
                 <button type="submit">Create Routine</button>
              </fieldset>
            </form>
          : <h1 id="errorMessage">You must be logged in to create a post!</h1>
        }
      </div>
    </page>
  )
}

export default CreateRoutine;