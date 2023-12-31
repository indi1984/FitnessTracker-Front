import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { createRoutine } from "../ajax-requests";

const CreateRoutine = ({ token, setToken, setIsPublic, setMyRoutineGoal, setMyRoutineName, myRoutineName, myRoutineGoal, isPublic }) => {

  async function handleSubmit(event) {
    event.preventDefault();
    const routine = { 
      name: myRoutineName, 
      goal: myRoutineGoal,
      isPublic 
    };

    const results = await createRoutine(routine, token);
     if (!results.error) {  
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
    window.localStorage.removeItem("currentUser");
  }

  return (
    <main>
      <nav id="navbar">
        { !token
          ? window.location.href="/"
          : <React.Fragment>
              <Link to="/">Back to Routines</Link>
              <Link to="/myRoutines">My Routines</Link>
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
                    value={ myRoutineName }
                    onChange={(event) => { setMyRoutineName(event.target.value) }}
                    required
                  />
                </div>
                <div>
                  <label>Goal:</label>
                  <input 
                    type="text"
                    placeholder="Enter Goal*"
                    value={ myRoutineGoal }
                    onChange={(event) => { setMyRoutineGoal(event.target.value) }}
                    required
                  />
                </div>
                <div>
                  <label id="checkbox">Make Public?</label>
                  <input 
                    type="checkbox"
                    defaultChecked={ isPublic }
                    onClick={(event) => {setIsPublic(event.target.checked)}}
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
