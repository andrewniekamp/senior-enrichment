import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import store, { gotStudents } from '../store';
import AddStudent from './AddStudent';

export default class Students extends React.Component {
  constructor() {
    super()
    this.state = store.getState();
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe( () => this.setState(store.getState()));

    axios.get('/api/students')
    .then( res => {
      const action = gotStudents(res.data);
      store.dispatch(action);
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <div>
        <AddStudent />
        <h2>Students</h2>
        {
          store.getState().students.map( student => {
            return (
              <div key={student.id} className="student-container">
                <h4><Link to={`/students/${student.id}`}>{student.firstName} {student.lastName} {student.email}</Link> {student.campus.name} </h4>
              </div>
            )
          })
        }
      </div>
    )
  }
}
