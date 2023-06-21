import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { updateActivity } from "../ajax-requests";

const UpdateActivity = ({ currentActivity, token, setToken, setIsPublic }) => {

  const { id, name, description } = currentActivity;
  console.log(currentActivity.id)

  const [updatedName, setUpdatedName] = useState(name);
  const [updatedDescription, setUpdatedDescription] = useState(description);


  async function handleSubmit(event) {
    event.preventDefault();

    const activity = {
      name: updatedName,
      description: updatedDescription,
    }

    const results = await updateActivity(id, token, activity);
    
    if (!results.error) {
      alert("Activity updated successfully!");
      if (token) {
        window.location.href = "/activities";
      } else {
        window.location.href = "/";
      }
    }
  }

  function logout() {
    setToken('');
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("currentUser");
  }

  return(
    <>
      <nav id="navbar">
        { !token
          ? window.location.href="/"
          : <Fragment>
              <Link to="/activities">Back to Activities</Link>
              <Link to="/">All Routines</Link>
              <Link to="/" onClick={logout}>Logout</Link>
            </Fragment>
        }
      </nav>
      <div>
        {token
          ? <form onSubmit={handleSubmit}>
              <h2>Update Activity</h2>
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
                  <label>Description:</label>
                  <input 
                    type="text"
                    placeholder="Enter Description*"
                    value={updatedDescription}
                    onChange={(event) => {setUpdatedDescription(event.target.value)}}
                    required
                  />
                </div>
                <button type="submit">Update Activity</button>
              </fieldset>
            </form>
          : <h1 id="errorMessage">You must be logged in to update an Activity!</h1>
        }
      </div>
    </>
  )
}

export default UpdateActivity;