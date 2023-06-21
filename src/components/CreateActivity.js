import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { newActivity } from "../ajax-requests";

const CreateActivity = ({ token, setToken, myActivityName, myActivityDescription, setMyActivityName, setMyActivityDescription }) => {

  async function handleSubmit(event) {
    event.preventDefault();
    const activity = { 
      name: myActivityName, 
      description: myActivityDescription, 
    };
    const results = await newActivity(activity, token);
     if (!results.error) {  
      alert("Activity created successfully!");
      window.location.href = "/activities";
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
              <h2>Add New Activity</h2>
              <fieldset>
                <div>
                  <label>Name:</label>
                  <input 
                    type="text"
                    placeholder="Enter Name*"
                    value={ myActivityName }
                    onChange={(event) => { setMyActivityName(event.target.value) }}
                    required
                  />
                </div>
                <div>
                  <label>Description:</label>
                  <input 
                    type="text"
                    placeholder="Enter Description*"
                    value={ myActivityDescription }
                    onChange={(event) => { setMyActivityDescription(event.target.value) }}
                    required
                  />
                </div>
                <button type="submit">Create Activity</button>
              </fieldset>
            </form>
          : <h1 id="errorMessage">You must be logged in to create an activity!</h1>
        }
      </div>
    </main>
  )
}

export default CreateActivity;
