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
    let student = this.state.store.student;
    return (
      <div className="form-container">
        <form id="edit-student-form" onSubmit={this.handleSubmit}>
          <h3>Edit Student</h3>
            <div className="form-inner">
            <div className="form-group">
              <label className="form-label" htmlFor="first-name-input">Update First Name</label>
              <input
                id="first-name-input"
                className="form-input"
                name="newFirstName"
                type="text"
                placeholder={student.firstName}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="last-name-input">Update Last Name</label>
              <input
                id="last-name-input"
                className="form-input"
                name="newLastName"
                type="text"
                placeholder={student.lastName}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="email-input">Update Email</label>
              <input
                id="email-input"
                className="form-input"
                name="newEmail"
                type="text"
                placeholder={student.email}
              />
            </div>
            <div className="form-group">
              <label htmlFor="campus-selection">Update Campus</label>
              <select
                id="campus-selection"
                className="form-select"
                name="associatedCampus"
                // Must set to updatedCampus if you can, otherwise
                // it gets stuck on props and can't change
                value={this.state.updatedCampus || this.props.campusId || ''}
                onChange={this.handleChange}
              >
                {
                  // If the student is unassigned, default to 'Unassigned'
                  !student.campusId &&
                  <option disabled>Unassigned</option>
                }
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
            </div>
          </div>
          <button className="form-button" type="submit">Update</button>
        </form>
      </div>
    );
  }
}
