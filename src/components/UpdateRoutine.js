import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { updateRoutine } from "../ajax-requests";

const UpdateRoutines = ({ currentRoutine, token, setToken }) => {

  const {title, description, price, location, willDeliver, _id } = currentPost;

  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedDescription, setUpdatedDescription] = useState(description);
  const [updatedPrice, setUpdatedPrice] = useState(price);
  const [updatedLocation, setUpdatedLocation] = useState(location);
  const [updatedWillDeliver, setUpdatedWillDeliver] = useState(willDeliver);

  async function handleSubmit(event) {
    event.preventDefault();

    const post = {
      title: updatedTitle,
      description: updatedDescription,
      price: updatedPrice,
      location: updatedLocation,
      willDeliver: updatedWillDeliver
    }

    const results = await updatePost(_id, token, post);
    
    if (results.success) {
      alert("Post updated successfully!");
      window.location.href = "/";
    };
  }

  function logout() {
    setToken('');
    window.localStorage.removeItem("token");
  }

  return(
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
              <h2>Update Post</h2>
              <fieldset>
                <div>
                  <label>Title:</label>
                  <input 
                    type="text"
                    placeholder="Enter Title*"
                    value={updatedTitle}
                    onChange={({target: {value}}) => {setUpdatedTitle(value)}}
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
                <div>
                  <label>Price:</label>
                  <input 
                    type="text"
                    placeholder="Enter Price*"
                    value={updatedPrice}
                    onChange={({target: {value}}) => {setUpdatedPrice(value)}}
                    required
                  />
                </div>
                <div>
                  <label>Location:</label>
                  <input 
                    type="text"
                    placeholder="Enter Location"
                    value={updatedLocation}
                    onChange={({target: {value}}) => {setUpdatedLocation(value)}}
                  />
                </div>
                <div>
                  <label id="checkbox">Willing to Deliver?</label>
                  <input 
                    type="checkbox"
                    value={updatedWillDeliver}
                    onChange={({target: {value}}) => {setUpdatedWillDeliver(value)}}
                  />
                </div>
                <button type="submit">Update Post</button>
              </fieldset>
            </form>
          : <h1 id="errorMessage">You must be logged in to create a post!</h1>
        }
      </div>
    </page>
  )
}

export default UpdateRoutines;