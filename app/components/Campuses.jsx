import React from 'react';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';

import AddCampus from './AddCampus';

export default class Campuses extends React.Component {
  constructor() {
    super()
    this.state = {
      campuses: []
    }
  }
  componentDidMount() {
    axios.get('/api/campuses')
    .then( res => {
      this.setState({ campuses: res.data });
    });
  }
  render() {
    return (
      <div>
        <AddCampus />
        <h2>Campuses</h2>
        {
          this.state.campuses.map( campus => {
            return (
              <Link key={campus.id} to={`/campuses/${campus.id}`}>{campus.name}</Link>
            )
          })
        }
      </div>
    )
  }
}
