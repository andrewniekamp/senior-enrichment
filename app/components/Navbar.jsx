import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="nav-container">
      <Link to="/">
        <img className="logo" src="/doge-logo.png" />
      </Link>
      <div className="nav-link-container">
        <Link to="/">Home</Link>
        <Link to="/campuses">Campuses</Link>
        <Link to="/students">Students</Link>
      </div>
    </div>
  )
}
export default Navbar;
