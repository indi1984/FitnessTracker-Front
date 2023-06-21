import React, { Fragment } from "react";
import { Link } from 'react-router-dom';

function Activities({ activities, token, setCurrentActivity, setToken }) {

  function logout() {
    setToken('');
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("currentUser");
  }

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
              { <Link to="/viewSingleActivity"><button onClick={() => { setCurrentActivity(activity)} }>VIEW ACTIVITY</button></Link> }
            </div>
          )
        })
      }
    </section>
  )
}

export default Activities;
