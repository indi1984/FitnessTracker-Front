import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CreateRoutine, Header, Login, Routines, MyRoutines, Register, UpdateRoutine, ViewSingleRoutine } from "./" // by default ./ searches for index.js file in components folder
import { routines } from "../ajax-requests";

function App() {
  const [token, setToken] = useState("");
  const [routines, setRoutines] = useState([]);
  const [currentRoutine, setCurrentRoutine] = useState({});
  const [myRoutines, setMyRoutines] = useState({});
  // const [searchTerm, setSearchTerm] = useState("");
  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  // const [price, setPrice] = useState("");
  // const [location, setLocation] = useState("");
  // const [willDeliver, setWillDeliver] = useState(false);
  const page = window.location.pathname;

  function tokenCheck() {
    const localToken = window.localStorage.getItem("token");
    if(localToken) {
      setToken(localToken);
      // getMyData(localToken);
    }
  }

  async function getRoutines() {
    const results = await routines();
    if (results.success) {
      setRoutines(results)
    }
  };

  // async function getMyData(token) {
  //   setMyMessages(await myData(token));
  //   return myMessages;
  // }

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    getRoutines();
  }, [token]);

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
          element={<Register setToken={setToken} token={token} />}
        />
        <Route
          path='/login'
          element={<Login setToken={setToken} token={token} setMyRoutines={setMyRoutines} myRoutines={myRoutines} />}
        />
        <Route
          path='/createRoutine'
          element={<CreateRoutine token={token} setToken={setToken} />}
        />
        {/* <Route 
          path='/sendMessage'
          element={<SendMessage currentRoutine={currentRoutine} token={token} />}
        /> */}
        <Route
          path='/myRoutines'
          element={<MyRoutines myRoutines={myRoutines} setMyRoutines={setMyRoutines} routines={routines} token={token} setToken={setToken} />}
        />
        <Route
          path='/viewSingleRoutine'
          element={<ViewSingleRoutine myRoutines={myRoutines} currentRoutine={currentRoutine} setCurrentRoutine={setCurrentRoutine} token={token} setToken={setToken} />}
        />
        <Route
          path='/updateRoutine'
          element={<UpdateRoutine currentRoutine={currentRoutine} token={token} setCurrentRoutine={setCurrentRoutine} setToken={setToken} />}
        />
      </Routes>
    </>
  )
}

export default App;