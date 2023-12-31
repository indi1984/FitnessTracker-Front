import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CreateRoutine, 
  Header, 
  Login, 
  Routines, 
  MyRoutines, 
  Register, 
  UpdateRoutine, 
  ViewSingleRoutine, 
  Activities, 
  ViewSingleActivity, 
  UpdateActivity, 
  CreateActivity, 
  UpdateRoutineActivity } from "./" 
import { allRoutines, allActivities, myRoutineData, myData } from '../ajax-requests'

function App() {
  const [token, setToken] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [routines, setRoutines] = useState([]);
  const [activities, setActivities] = useState([]);
  const [currentActivity, setCurrentActivity] = useState([]);
  const [currentRoutine, setCurrentRoutine] = useState({});
  const [myRoutines, setMyRoutines] = useState({});
  const [myRoutineName, setMyRoutineName] = useState("");
  const [myRoutineGoal, setMyRoutineGoal] = useState("");
  const [myActivityName, setMyActivityName] = useState("");
  const [myActivityDescription, setMyActivityDescription] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [activityCount, setActivityCount] = useState(0);
  const [activityDuration, setActivityDuration] = useState("");
  const [currentRoutineActivity, setCurrentRoutineActivity] = useState({});
  const page = window.location.pathname;

  async function tokenCheck() {
    const localToken = window.localStorage.getItem("token");
    const user = window.localStorage.getItem("currentUser");
    if(localToken) {
      setToken(localToken);
      setCurrentUser(user);
      const { username } = await myData(localToken);
      setMyRoutines(await myRoutineData(username, localToken));
    }
  }

  async function getRoutines() {
    const results = await allRoutines();
    if (results) {
      setRoutines(results)
    }
  };

  async function getActivities() {
    const results = await allActivities();
    if (results) {
      setActivities(results)
    }
  };

  useEffect(() => {
    getRoutines();
    getActivities();
    tokenCheck();
  }, [ token ]);

  return (
    <>
      <Header page={page} token={token} setToken={setToken} />
      <Routes>
        <Route 
          path='/'
          element={<Routines routines={routines} token={token} setCurrentRoutine={setCurrentRoutine} setToken={setToken} />}
        />
        <Route 
          path='/register'
          element={<Register setToken={setToken} token={token} setCurrentUser={setCurrentUser} />}
        />
        <Route
          path='/login'
          element={<Login setToken={setToken} token={token} setMyRoutines={setMyRoutines} myRoutines={myRoutines} setCurrentUser={setCurrentUser} />}
        />
        <Route
          path='/createRoutine'
          element={<CreateRoutine token={token} setToken={setToken} myRoutineName={myRoutineName} setMyRoutineName={setMyRoutineName} myRoutineGoal={myRoutineGoal} setMyRoutineGoal={setMyRoutineGoal} isPublic={isPublic} setIsPublic={setIsPublic} />}
        />
        <Route
          path='/createActivity'
          element={<CreateActivity token={token} myActivityName={myActivityName} setMyActivityName={setMyActivityName} myActivityDescription={myActivityDescription} setMyActivityDescription={setMyActivityDescription} />}
        />
        <Route
          path='/myRoutines'
          element={<MyRoutines myRoutines={myRoutines} setMyRoutines={setMyRoutines} routines={routines} token={token} setToken={setToken} setCurrentUser={setCurrentUser} currentUser={currentUser} setCurrentRoutine={setCurrentRoutine} />}
        />
        <Route
          path='/viewSingleRoutine'
          element={<ViewSingleRoutine currentUser={currentUser} myRoutines={myRoutines} currentRoutine={currentRoutine} setCurrentRoutine={setCurrentRoutine} token={token} setToken={setToken} activities={activities} setCurrentActivity={setCurrentActivity} setActivityDuration={setActivityDuration} setActivityCount={setActivityCount} activityCount={activityCount} activityDuration={activityDuration} setCurrentRoutineActivity={setCurrentRoutineActivity} currentRoutineActivity={currentRoutineActivity} />}
        />
        <Route
          path='/viewSingleActivity'
          element={<ViewSingleActivity currentUser={currentUser} currentActivity={currentActivity} setCurrentActivity={setCurrentActivity} token={token} setToken={setToken} />}
        />
        <Route
          path='/updateRoutine'
          element={<UpdateRoutine currentRoutine={currentRoutine} token={token} setCurrentRoutine={setCurrentRoutine} setToken={setToken} setIsPublic={setIsPublic} />}
        />
        <Route
          path='/updateActivity'
          element={<UpdateActivity currentActivity={currentActivity} token={token} setCurrentActivity={setCurrentActivity} setToken={setToken} />}
        />
        <Route
          path='/updateRoutineActivity'
          element={<UpdateRoutineActivity currentActivity={currentActivity} token={token} setCurrentActivity={setCurrentActivity} setToken={setToken} setActivityDuration={setActivityDuration} setActivityCount={setActivityCount} activityCount={activityCount} activityDuration={activityDuration} currentRoutineActivity={currentRoutineActivity}/>}
        />
        <Route
          path='/activities'
          element={<Activities activities={activities} currentActivity= {currentActivity} setCurrentActivity={setCurrentActivity} currentRoutine={currentRoutine} token={token} setCurrentRoutine={setCurrentRoutine} setToken={setToken} setIsPublic={setIsPublic} />}
        />
      </Routes>
    </>
  )
}

export default App;