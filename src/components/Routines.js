import React, { Fragment } from "react";
import { Link } from 'react-router-dom';

function Routines({ routines, token, setCurrentRoutine, setToken }) {

  function logout() {
    setToken('');
    window.localStorage.removeItem("token");
  }

  // function postMatches(post, text) {
  //   // return true if any of the fields you want to check against include the text
  //   // strings have an .includes() method
  //   return post.description.includes(text) || post.title.includes(text);
  // }

  const filteredPosts = posts.filter(post => postMatches(post, searchTerm));
  const postsToDisplay = searchTerm.length ? filteredPosts : posts;

  return (
    <section className="posts">
      <nav id="navbar">
      { !token
        ? <React.Fragment>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </React.Fragment>
        : <React.Fragment>
            <Link to="/createPost">Create Listing</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/" onClick={logout}>Logout</Link>
          </React.Fragment>
      }
      </nav>
      <div className="searchBar">
        <form id="search" onSubmit={async (event) => {
          event.preventDefault();
        }}>
          <fieldset>
            <label htmlFor="keywords">Search Listings</label>
            <input 
              id="keywords" 
              type="text" 
              placeholder="enter keywords..." 
              onChange={((event) => {
                setSearchTerm(event.target.value)
              })}
            />
            <button>SEARCH</button>
          </fieldset>
        </form>
      </div>
      {
        postsToDisplay && postsToDisplay.map((post, index) => {
          return (
            <div
              key={index}
              className="post"
            >
              { post.title ? <h2>{ post.title }</h2> : <h3>MISSING INFO</h3>}
              { post.description ? <p>{post.description}</p> : null}
              { post.price ? <h4>Price: {post.price}</h4> : null}
              { <h4>Seller: {post.author.username}</h4>}
              { <h4>Location: {post.location}</h4>}
              { !post.isAuthor && token ? <Link to="/sendMessage"><button onClick={() => {setCurrentPost(post)}}>SEND MESSAGE</button></Link> : null }
              { post.isAuthor ? <Link to="/viewPost"><button onClick={() => {setCurrentPost(post)}}>VIEW POST</button></Link> : null }
            </div>
          )
        })
      }
    </section>
  )
}

export default Routines;