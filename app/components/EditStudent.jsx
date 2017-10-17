import React from 'react';
import axios from 'axios';

import store, { editedStudent, gotStudent } from '../store';

export default class EditStudent extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe( () => this.setState(store.getState()));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleSubmit(event) {
    event.preventDefault();
    // Only assign new values if something is defined, otherwise keep prev values
    let firstName = event.target.newFirstName.value || store.getState().student.firstName;
    let lastName = event.target.newLastName.value || store.getState().student.lastName;
    let email = event.target.newEmail.value || store.getState().student.email;
    let id = store.getState().student.id;
    axios.put('/api/students', { firstName, lastName, email, id })
    .then( (res) => {
      let updatedStudent = res.data[1];
      // Put receives array, index 1 has returned object option as set in API
      const editAction = editedStudent(updatedStudent);
      store.dispatch(editAction);
      const setCurrentAction = gotStudent(updatedStudent);
      store.dispatch(setCurrentAction);
    })
  }

  render() {
    let currentStudent = store.getState().student;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="input-group input-group-lg">
          <label htmlFor="first-name-input">Update Last Name</label>
          <input
            id="first-name-input"
            name="newFirstName"
            type="text"
            placeholder={currentStudent.firstName}
          />
          <label htmlFor="last-name-input">Update First Name</label>
          <input
            id="last-name-input"
            name="newLastName"
            type="text"
            placeholder={currentStudent.lastName}
          />
          <label htmlFor="email-input">Update Email</label>
          <input
            id="email-input"
            name="newEmail"
            type="text"
            placeholder={currentStudent.email}
          />
          <button type="submit">Update</button>
        </div>
      </form>
    );
  }
}
