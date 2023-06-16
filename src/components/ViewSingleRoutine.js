import React from "react";
import { Link } from 'react-router-dom';
import { deletePost } from "../ajax-requests";

const ViewPost = ({ currentPost, token, setCurrentPost, setToken }) => {

  async function handleDelete(id, token) {
    const results = await deletePost(id, token);
    if (results.success) {
      window.location.href = "/";
    }
  }

  function logout() {
    setToken('');
    window.localStorage.removeItem("token");
  }

  return (
    <section className="viewPost">
      <nav id="navbar">
        { !token
          ? <React.Fragment>
             <Link to="/">Back to Listings</Link>
           </React.Fragment>
          :<React.Fragment>
             <Link to="/createPost">Create Listing</Link>
             <Link to="/profile">Profile</Link>
             <Link to="/">Back to Listings</Link>
             <Link to="/" onClick={logout}>Logout</Link>
           </React.Fragment>
        }
      </nav>
      <div className="post">
        <h2>{currentPost.title}</h2>
        <p>{currentPost.description}</p>
        <h4>{currentPost.price}</h4>
        <h4>{currentPost.location}</h4>
        <div>
          { currentPost.isAuthor ? <Link to="/updatePost"><button onClick={() => {setCurrentPost(currentPost)}}>UPDATE</button></Link> : null }
          { currentPost.isAuthor ? <button onClick={() => handleDelete(currentPost._id, token)}>DELETE</button> : null }
        </div>
      </div>
    </section>
  )
}

export default ViewPost;