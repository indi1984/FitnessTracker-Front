import React from 'react';

const Header = () => {

  return (
    <header>
      <h1>Fitness Tracker</h1>
    </header>
  )
}

export default Header;

/* 
  if on register page, show Posts and Login
  if on posts page, show Register and Login
    UNLESS already logged in
      then show My Posts and Logout
  if on createPost page, show My Posts and Logout
*/