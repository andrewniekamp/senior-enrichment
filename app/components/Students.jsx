import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import store, { deletedStudent } from '../store';
import AddStudent from './AddStudent';

export default class Students extends React.Component {
  constructor() {
    super()
    this.state = store.getState();
    this.clickHandler = this.clickHandler.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe( () => this.setState(store.getState()));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  clickHandler(event) {
    axios.delete(`/api/students/${event.target.value}`)
    .then( response => {
      const action = deletedStudent(response.data);
      store.dispatch(action);
    })
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
                  <Link to={`/students/${student.id}`}>{student.firstName} {student.lastName} {student.email}</Link>
                  <button
                  value={student.id}
                  onClick={this.clickHandler}>
                  Delete</button>
              </div>
            )
          })
        }
      </div>
    )
  }
}
