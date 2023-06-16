import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CreatePost, Header, Login, Posts, Profile, Register, SendMessage, UpdatePost, ViewPost } from "./" // by default ./ searches for index.js file in components folder
import { fetchPosts, myData } from '../ajax-requests';

function App() {
  const [token, setToken] = useState("");
  const [posts, setPosts] = useState([]);
  const [currentRoutine, setCurrentRoutine] = useState({});
  const [myMessages, setMyMessages] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [willDeliver, setWillDeliver] = useState(false);
  const page = window.location.pathname;

  function tokenCheck() {
    const localToken = window.localStorage.getItem("token");
    if(localToken) {
      setToken(localToken);
      getMyData(localToken);
    }
  }

  async function getPosts() {
    const results = await fetchPosts(token);
    if (results.success) {
      setPosts(results.data.posts)
    }
  };

  async function getMyData(token) {
    setMyMessages(await myData(token));
    return myMessages;
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    getPosts();
    // if (token) {
    //   getMyData();
    // }
  }, [token, myMessages]);

  return (
    <>
      <Header page={page} token={token} setToken={setToken} />
      <Routes>
        <Route 
          path='/'
          element={<Posts posts={posts} token={token} setCurrentPost={setCurrentPost} searchTerm={searchTerm} setSearchTerm={setSearchTerm} setToken={setToken} />}
        />
        <Route 
          path='/register'
          element={<Register setToken={setToken} token={token} />}
        />
        <Route
          path='/login'
          element={<Login setToken={setToken} />}
        />
        <Route
          path='/createPost'
          element={<CreatePost token={token} title={title} description={description} price={price} location={location} willDeliver={willDeliver} 
            setTitle={setTitle} setDescription={setDescription} setPrice={setPrice} setLocation={setLocation} setWillDeliver={setWillDeliver} setToken={setToken}
          />}
        />
        <Route 
          path='/sendMessage'
          element={<SendMessage currentPost={currentPost} token={token} />}
        />
        <Route
          path='/profile'
          element={<Profile myMessages={myMessages} setCurrentPost={setCurrentPost} posts={posts} token={token} setToken={setToken} />}
        />
        <Route
          path='/viewSingleRoutine'
          element={<ViewSingleRoutine currentRoutine={currentRoutine} setCurrentRoutine={setCurrentPost} token={token} setToken={setToken} />}
        />
        <Route
          path='/updatePost'
          element={<UpdatePost currentPost={currentPost} token={token} setCurrentPost={setCurrentPost} setToken={setToken} />}
        />
      </Routes>
    </>
  )
}

export default App;