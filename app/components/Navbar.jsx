import React from 'react';
import { Route, Link } from 'react-router-dom';

export default class Navbar extends React.Component {
  constructor() {
    super()
  }
  render() {
    return (
      <div className="nav-container">
        <img className="logo" src="/doge-logo.png" />
        <div className="nav-link-container">
          <Link to='/'>Home</Link>
          <Link to='/campuses'>Campuses</Link>
          <Link to='/students'>Students</Link>
        </div>
      </div>
    )
  }
}
