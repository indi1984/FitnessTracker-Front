import React, { Fragment } from "react";
import { Link } from 'react-router-dom';

function Activities({ activities, token, setCurrentActivity, setToken }) {

  function logout() {
    setToken('');
    window.localStorage.removeItem("token");
  }

  // function postMatches(post, text) {
  //   // return true if any of the fields you want to check against include the text
  //   // strings have an .includes() method
  //   return post.description.includes(text) || post.title.includes(text);
  // }

  // const filteredRoutines = routines.filter(routine => routine.isPublic === true);
  // const postsToDisplay = searchTerm.length ? filteredPosts : posts;

  return (
    <section className="routines">
      <nav id="navbar">
      { !token
        ? <React.Fragment>
            <Link to="/">    All Routines</Link>
            <Link to="/login">   Login</Link>
            <Link to="/register">Register</Link>
          </React.Fragment>
        : <React.Fragment>
            <Link to="/">    All Routines</Link>
            <Link to="/MyRoutines">    My Routines</Link>
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
        activities && activities.map((activity, index) => {
          return (
            <div
              key={index}
              className="routine"
            >
              { activity.name        ? <h2>{ activity.name }</h2>                 : null }
              { activity.description        ? <h3>Goal: { activity.description }</h3>             : null }
              {/* { routine.activities  ? <h4>ACTIVITIES</h4>                       : null }  // <=== Made each routine look too long I think, we could use this on the viewSingleRoutine
              { routine.activities  ? routine.activities.map((activity, id) => {
                return (
                <div 
                  key={id}
                  className="routine_activity"
                >
                  { activity.name        ? <h5>{ activity.name }</h5>             : null }
                </div>
                )
              })                                                               : null } */}
              { <Link to="/viewSingleActivity"><button onClick={() => { setCurrentActivity(activity)} }>VIEW ACTIVITY</button></Link> }
            </div>
          )
        })
      }
    </section>
  )
}

export default Activities;

// for "/viewSingleRoutine":
  // return (
  //   <div 
  //     key={id}
  //     className="routine_activity"
  //   >
  //     { activity.name        ? <h5>{ activity.name }</h5>             : null }
  //     { activity.description ? <p>{ activity.description } </p>       : null }
  //     { activity.duration    ? <h5>Duration: {activity.duration}</h5> : null }
  //     { activity.count       ? <h5>Count: {activity.count}</h5>       : null }
  //   </div>
  //   )