import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import EditStudent from './EditStudent';
import store, { gotStudent, gotCampus } from '../store';

export default class Student extends React.Component {
  constructor() {
    super()
    this.state = store.getState();
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe( () => this.setState(store.getState()));

    axios.get(`/api/students/${this.props.match.params.studentId}`)
    .then( res => res.data)
    .then( student => {
      const action = gotStudent(student);
      store.dispatch(action);
    })
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    let currentStudent = store.getState().student;
    return (
      <div>
        <h2>Student: {currentStudent.firstName} {currentStudent.lastName}</h2>
        <EditStudent campusId={currentStudent.campusId} />
        <h3>Campus</h3>
        {
          store.getState().campuses.map( campus => {
            return (
              currentStudent.campusId === campus.id &&
              <div key={currentStudent.id}>
                <Link to={`/campuses/${campus.id}`}>{campus.name}</Link>
              </div>
            )
          })
        }
      </div>
    )
  }
}
