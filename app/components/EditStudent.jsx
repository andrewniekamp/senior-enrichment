import React from 'react';

import store, { editStudent } from '../store';

export default class EditStudent extends React.Component {
  constructor() {
    super()
    this.state = {
      store: store.getState(),
      // This is needed as a holder for the value
      // It comes into the form as props, but further renders
      // will show updatedCampus (id of selected campus)
      updatedCampus: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.setState({ store: store.getState() }));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleChange(event) {
    this.setState({ updatedCampus: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault();
    // Only assign new values if something is defined, otherwise keep prev values
    let studentObj = {
      firstName: event.target.newFirstName.value || this.props.student.firstName,
      lastName: event.target.newLastName.value || this.props.student.lastName,
      email: event.target.newEmail.value || this.props.student.email,
      campusId: this.state.updatedCampus || this.props.student.campusId,
      id: this.props.student.id
    };
    store.dispatch(editStudent(studentObj));
    // Reset form
    document.getElementById('edit-student-form').reset();
  }

  render() {
    let currentStudent = this.state.store.student;
    return (
      <div className="form-container">
        <form id="edit-student-form" onSubmit={this.handleSubmit}>
          <div className="input-group input-group-lg">
            <label htmlFor="first-name-input">Update First Name</label>
            <input
              id="first-name-input"
              name="newFirstName"
              type="text"
              placeholder={currentStudent.firstName}
            />
            <label htmlFor="last-name-input">Update Last Name</label>
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
            <label htmlFor="campus-selection">Update Campus</label>
            <select
              id="campus-selection"
              name="associatedCampus"
              // Must set to updatedCampus if you can, otherwise
              // it gets stuck on props and can't change
              value={this.state.updatedCampus || this.props.campusId}
              onChange={this.handleChange}
            >
              {
                this.state.store.campuses.map(campus => {
                  return (
                    <option
                      key={campus.id}
                      value={campus.id}>
                      {campus.name}
                    </option>
                  )
                })
              }
            </select>
            <button type="submit">Update</button>
          </div>
        </form>
      </div>
    );
  }
}
