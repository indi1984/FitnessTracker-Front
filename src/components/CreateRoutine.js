import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { createRoutine } from "../ajax-requests";

const CreateRoutine = ({ token, title, description, price, location, willDeliver, setTitle, setDescription, setPrice, setLocation, setWillDeliver, setToken }) => {

  async function handleSubmit(event) {
    event.preventDefault();
    const post = {  };
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
              <Link to="/">Back to Listings</Link>
              <Link to="/profile">Profile</Link>
              <Link to="/" onClick={logout}>Logout</Link>
            </React.Fragment>
        }
        </nav>
      <div>
        {token
          ? <form onSubmit={handleSubmit}>
              <h2>Add New Post</h2>
              <fieldset>
                <div>
                  <label>Title:</label>
                  <input 
                    type="text"
                    placeholder="Enter Title*"
                    value={title}
                    onChange={(event) => {setTitle(event.target.value)}}
                    required
                  />
                </div>
                <div>
                  <label>Description:</label>
                  <input 
                    type="text"
                    placeholder="Enter Description*"
                    value={description}
                    onChange={(event) => {setDescription(event.target.value)}}
                    required
                  />
                </div>
                <div>
                  <label>Price:</label>
                  <input 
                    type="text"
                    placeholder="Enter Price*"
                    value={price}
                    onChange={({target: {value}}) => {setPrice(value)}}
                    required
                  />
                </div>
                <div>
                  <label>Location:</label>
                  <input 
                    type="text"
                    placeholder="Enter Location"
                    value={location}
                    onChange={({target: {value}}) => {setLocation(value)}}
                  />
                </div>
                <div>
                  <label id="checkbox">Willing to Deliver?</label>
                  <input 
                    type="checkbox"
                    value={willDeliver}
                    onChange={({target: {value}}) => {setWillDeliver(value)}}
                  />
                </div>
                <button type="submit">Create Post</button>
              </fieldset>
            </form>
          : <h1 id="errorMessage">You must be logged in to create a post!</h1>
        }
      </div>
    </page>
  )
}

export default CreateRoutine;