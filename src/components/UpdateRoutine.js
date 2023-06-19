import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { updateRoutine } from "../ajax-requests";

const UpdateRoutines = ({ currentRoutine, token, setToken, setIsPublic }) => {

  const { id, name, goal, isPublic } = currentRoutine;
  console.log(currentRoutine.id)

  const [updatedName, setUpdatedName] = useState(name);
  const [updatedGoal, setUpdatedGoal] = useState(goal);


  async function handleSubmit(event) {
    event.preventDefault();

    const routine = {
      name: updatedName,
      goal: updatedGoal,
      isPublic
    }

    const results = await updateRoutine(id, token, routine);
    
    if (!results.error) {
      alert("Routine updated successfully!");
      if (token) {
        window.location.href = "/myRoutines";
      } else {
        window.location.href = "/";
      }
    } else {
      alert("You are not the creator of this routine!");
      window.location.href = "/";
    };
  }

  function logout() {
    setToken('');
    window.localStorage.removeItem("token");
  }

  return(
    <>
      <nav id="navbar">
        { !token
          ? window.location.href="/"
          : <React.Fragment>
              <Link to="/">Back to Routines</Link>
              <Link to="/MyRoutines">My Routines</Link>
              <Link to="/" onClick={logout}>Logout</Link>
            </React.Fragment>
        }
      </nav>
      <div>
        {token
          ? <form onSubmit={handleSubmit}>
              <h2>Update Routine</h2>
              <fieldset>
                <div>
                  <label>Name:</label>
                  <input 
                    type="text"
                    placeholder="Enter Name*"
                    value={updatedName}
                    onChange={({target: {value}}) => {setUpdatedName(value)}}
                    required
                  />
                </div>
                <div>
                  <label>Goal:</label>
                  <input 
                    type="text"
                    placeholder="Enter Goal*"
                    value={updatedGoal}
                    onChange={(event) => {setUpdatedGoal(event.target.value)}}
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
                <button type="submit">Update Routine</button>
              </fieldset>
            </form>
          : <h1 id="errorMessage">You must be logged in to update a routine!</h1>
        }
      </div>
    </>
  )
}

export default UpdateRoutines;