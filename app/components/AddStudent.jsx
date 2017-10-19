import React from 'react';

import store, { addStudent } from '../store';

const AddStudent = (props) => {

  function handleSubmit(event) {
    event.preventDefault();
    const newStudent = {
      firstName: event.target.newFirstName.value,
      lastName: event.target.newLastName.value,
      email: event.target.newEmail.value,
      campusId: event.target.associatedCampus.value
    }
    store.dispatch(addStudent(newStudent));

    document.getElementById('add-student-form').reset();
  }

  return (
    <div className="form-container">
      <form id="add-student-form" onSubmit={handleSubmit}>
      <h3>Add New Student</h3>
        <div className="form-inner">
          <div className="form-group">
            <label className="form-label" htmlFor="first-name-input">First Name</label>
            <input
              required
              id="first-name-input"
              className="form-input"
              name="newFirstName"
              type="text"
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="last-name-input">Last Name</label>
            <input
              required
              id="last-name-input"
              className="form-input"
              name="newLastName"
              type="text"
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="email-input">Email</label>
            <input
              required
              id="email-input"
              className="form-input"
              name="newEmail"
              type="email"
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="campus-selection">Campus</label>
            <select
              required
              id="campus-selection"
              className="form-select"
              name="associatedCampus"
            >
            {
              props.campuses.map( campus => {
                return (
                  <option key={campus.id} value={campus.id}>{campus.name}</option>
                )
              })
            }
            </select>
          </div>
        </div>
        <button className="form-button" type="submit">Save</button>
      </form>
    </div>
  );
}
export default AddStudent;
