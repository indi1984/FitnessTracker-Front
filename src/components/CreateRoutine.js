import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { createRoutine } from "../ajax-requests";

const CreateRoutine = ({ token, setToken, setMyRoutineGoal, setMyRoutineName, myRoutineName, myRoutineGoal }) => {

  async function handleSubmit(event) {
    event.preventDefault();
    const routine = {myRoutineName, myRoutineGoal};
    const results = await createRoutine(routine, token);
     if (!results.error) {  // unable to use 'results.success' because no 'success' property exists like in Stranger's Things (where would we add that?)
      alert("Routine created successfully!");
      window.location.href = "/";
    } else if (results.error.includes("duplicate key")) {
      alert("A routine with this name already exists! Please try another routine name.");
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
          : <React.Fragment>
              <Link to="/">Back to Routines</Link>
              <Link to="/profile">My Routines</Link>
              <Link to="/" onClick={logout}>Logout</Link>
            </React.Fragment>
        }
        </nav>
      <div>
        {token
          ? <form onSubmit={ handleSubmit }>
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
                    value={myRoutineGoal}
                    onChange={(event) => {setMyRoutineGoal(event.target.value)}}
                    required
                  />
                </div>
                <div>
                  <label id="checkbox">Make Public?</label>
                  <input 
                    type="checkbox"
                    value={ isPublic }
                    onChange={({ target: { value } }) => { setIsPublic(value) }}
                  />
                </div>
                <button type="submit">Create Routine</button>
              </fieldset>
            </form>
          : <h1 id="errorMessage">You must be logged in to create a routine!</h1>
        }
      </div>
    </main>
  )
}

export default CreateRoutine;