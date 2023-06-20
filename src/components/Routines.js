import React, { Fragment } from "react";
import { Link } from 'react-router-dom';

function Routines({ routines, token, setCurrentRoutine, setToken }) {

  function logout() {
    setToken('');
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("currentUser");
  }

  // function postMatches(post, text) {
  //   // return true if any of the fields you want to check against include the text
  //   // strings have an .includes() method
  //   return post.description.includes(text) || post.title.includes(text);
  // }

  const filteredRoutines = routines.filter(routine => routine.isPublic === true);
  // const postsToDisplay = searchTerm.length ? filteredPosts : posts;

  return (
    <section className="routines">
      <nav id="navbar">
      { !token
        ? <React.Fragment>
            <Link to="/login">   Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/activities">All Activities</Link>
          </React.Fragment>
        : <React.Fragment>
            <Link to="/createRoutine">    Create Routine</Link>
            <Link to="/myRoutines">       My Routines</Link>
            <Link to="/activities">Activities</Link>
            <Link to="/" onClick={ logout }>Logout</Link>
          </React.Fragment>
      }
      </nav>
      {/* <div className="searchBar">
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
      </div> */}
      {
        filteredRoutines && filteredRoutines.map((routine, index) => {
          return (
            <div
              key={index}
              className="routine"
            >
              { routine.name        ? <h2>{ routine.name }</h2>                 : null }
              { routine.goal        ? <h3>Goal: { routine.goal }</h3>             : null }
              { routine.creatorName ? <h4>Creator: { routine.creatorName }</h4> : null }
              { <Link to="/viewSingleRoutine"><button onClick={() => { setCurrentRoutine(routine)} }>VIEW ROUTINE</button></Link> }
            </div>
          )
        })
      }
    </section>
  )
}

export default Routines;