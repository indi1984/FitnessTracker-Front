import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { deleteRoutine, attachActivity } from "../ajax-requests";

const ViewSingleRoutine = ({ currentUser, currentRoutine, setCurrentRoutine, token, setToken, activities, setCurrentActivity }) => {

  const [activityName, setActivityName] = useState("");
  const [activityCount, setActivityCount] = useState(0);
  const [activityDuration, setActivityDuration] = useState("");

  async function handleDelete(routineId, token) {
    const results = await deleteRoutine(routineId, token);
    if (!results.error) {
      window.location.href = "/";
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();
    
    const activityId = activities.filter(activity => activity.name === activityName)[0].id;
    
    const activity = {
      activityId: activityId,
      name: activityName,
      count: activityCount,
      duration: activityDuration
    };

    const results = await attachActivity(currentRoutine.id, activity);

    if (!results.error) {
      window.location.href = "/myRoutines";
    }
  }

  function logout() {
    setToken('');
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("currentUser");
  }

  function openForm() {
    document.getElementById("myForm").style.display = "flex";
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }

  console.log(currentRoutine.activities)

    return (
    <section className="viewRoutine">
      <nav id="navbar">
        { !token
          ? <React.Fragment>
             <Link to="/">Back to Listings</Link>
           </React.Fragment>
          :<React.Fragment>
             <Link to="/createRoutine">Create Routine</Link>
             <Link to="/myRoutines">My Routines</Link>
             <Link to="/">Back to Routines</Link>
             <Link to="/" onClick={logout}>Logout</Link>
           </React.Fragment>
        }
      </nav>
      <div className="routine">
        <h2>{currentRoutine.name}</h2>
        <p>Goal: {currentRoutine.goal}</p>
        { currentRoutine.activities.length > 0 ? <h4>ACTIVITIES</h4> : <h4>NO ACTIVITIES ADDED YET!</h4> }
        { currentRoutine.activities.length > 0 ? 
            currentRoutine.activities.map((activity, index) => {
              return (
                <div 
                  key={index}
                  className="routine_activity"
                >
                  { activity.name        ? <h5>{ activity.name }</h5>                    : null }
                  { activity.description ? <p>Description: { activity.description } </p> : null }
                  { activity.duration    ? <h5>Duration: {activity.duration}</h5>        : null }
                  { activity.count       ? <h5>Count: {activity.count}</h5>              : null }
                  { currentRoutine.creatorName === currentUser ? <Link to="/updateActivity"><button onClick={() => {setCurrentActivity(activity)}}>UPDATE ACTIVITY</button></Link> : null }
                </div>
              )
            })
            : null
        }
        {<div className="form-popup" id="myForm">
          <form action="/action_page.php" className="form-container" onSubmit={ handleSubmit }>
            <h1>Add Activity</h1>

            <label htmlFor="select-activity"><b>Select Activity</b></label>
            <select
              name="activity"
              onChange={(event) => {
                setActivityName(event.target.value)
              }}
            >
              {activities.map(({name, id}) => {
                return <option value={name} key={id}>{name}</option>
              })}
            </select>

            <label htmlFor="duration"><b>Duration</b></label>
            <input type="number" placeholder="Enter Duration" name="duration" required onChange={(event) => { setActivityDuration(event.target.value) }}/>

            <label htmlFor="count"><b>Count</b></label>
            <input type="number" placeholder="Enter Count" name="count" required onChange={(event) => { setActivityCount(event.target.value) }}/>

            <button type="submit" className="btn">Add Activity</button>
            <button type="button" className="btn cancel" onClick={() => closeForm()}>Cancel</button>
          </form>
        </div>}
        <div>
          { currentRoutine.creatorName === currentUser ? <Link to="/updateRoutine"><button onClick={() => {setCurrentRoutine(currentRoutine)}}>UPDATE</button></Link> : null }
          { currentRoutine.creatorName === currentUser ? <button onClick={() => handleDelete(currentRoutine.id, token)}>DELETE</button> : null }
          { currentRoutine.creatorName === currentUser ? <button className="open-button" onClick={() => openForm()}>ADD ACTIVITY</button> : null }
        </div>
      </div>
    </section>
  )
}

export default ViewSingleRoutine;