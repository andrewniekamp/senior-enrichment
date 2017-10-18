import React from 'react';
import axios from 'axios';

import store, { deletedStudent } from '../store';
import AddStudent from './AddStudent';
import SingleStudent from './SingleStudent';

// THIS IS IN TWO PLACES (ALSO IN CAMPUS) -- REFACTOR, BUT HOW? THUNK?
const studentDeleteHandler = (event) => {
  axios.delete(`/api/students/${event.target.value}`)
  .then( response => {
    const action = deletedStudent(response.data);
    store.dispatch(action);
  })
}

export default class Students extends React.Component {
  constructor() {
    super()
    this.state = store.getState();
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe( () => this.setState(store.getState()));
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
              <SingleStudent key={student.id} student={student} clickHandler={studentDeleteHandler} />
            )
          })
        }
      </div>
    )
  }
}
