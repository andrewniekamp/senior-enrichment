import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import store, { gotCampus } from '../store';
// import EditCampus from './EditCampus';

export default class Campuses extends React.Component {
  constructor() {
    super()
    this.state = store.getState();
  }

  componentDidMount() {
    axios.get(`/api/campuses/${this.props.match.params.campusId}`)
    .then( res =>  res.data)
    .then( campus => {
      const action = gotCampus(campus);
      store.dispatch(action);
    });
  }

  render() {
    let currentCampus = store.getState().campus;
    return (
      <div>
        <h2>Campus: {currentCampus.name}</h2>
        {/* <EditCampus name={this.state.campus.name} imageURL={this.state.campus.imageURL} /> */}
        <h3>Students</h3>
        {
          store.getState().students.map( student => {
            return (
              student.campusId === currentCampus.id &&
              <div key={student.id}>
                <Link to={`/students/${student.id}`}>{student.firstName} {student.lastName}</Link>
              </div>
            )
          })
        }
      </div>
    )
  }
}
