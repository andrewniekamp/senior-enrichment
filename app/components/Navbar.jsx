import React from 'react';
import { Route, Link } from 'react-router-dom';

export default class Navbar extends React.Component {
  constructor() {
    super()
  }
  render() {
    return (
      <div>
        <ul>
          <Link to='/'>Home</Link>
          <Link to='/campuses'>Campuses</Link>
          <Link to='/students'>Students</Link>
        </ul>
      </div>
    )
  }
}
