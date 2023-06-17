import React from "react";
import { Link } from 'react-router-dom';
import { deleteRoutine } from "../ajax-requests";

const ViewSingleRoutine = ({ myRoutines, currentRoutine, setCurrentRoutine, token, setToken }) => {
  
  async function handleDelete(routineId, token) {
    const results = await deleteRoutine(routineId, token);
    if (results.success) {
      window.location.href = "/";
    }
  }

  const routines = myRoutines;
  console.log(routines);
  // const singleRoutine = routines.map((routine) => routines.id === routine.id)
  // setCurrentRoutine(SingleRoutine);

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
             <Link to="/createRoutine">Create Routine</Link>
             <Link to="/myRoutines">My Routines</Link>
             <Link to="/">Back to Routines</Link>
             <Link to="/" onClick={logout}>Logout</Link>
           </React.Fragment>
        }
      </nav>
      <div className="post">
        <h2>{currentRoutine.title}</h2>
        <p>{currentRoutine.description}</p>
        <h4>{currentRoutine.price}</h4>
        <h4>{currentRoutine.location}</h4>
        <div>
          { currentRoutine.isAuthor ? <Link to="/updateRoutine"><button onClick={() => {setCurrentRoutine(currentRoutine)}}>UPDATE</button></Link> : null }
          { currentRoutine.isAuthor ? <button onClick={() => handleDelete(routineId, token)}>DELETE</button> : null }
        </div>
      </div>
    </section>
  )
}

export default ViewSingleRoutine;