import React from 'react';

import store, { editStudent } from '../store';

const EditStudent = (props) => {

  function handleSubmit(event) {
    event.preventDefault();
    // Only assign new values if something is defined, otherwise keep prev values
    let newCampusId;
    if (event.target.associatedCampus.value === 'UNASSIGNED') newCampusId = null;
    else newCampusId = event.target.associatedCampus.value || props.student.campusId;
    console.log(newCampusId);
    let studentObj = {
      firstName: event.target.newFirstName.value || props.student.firstName,
      lastName: event.target.newLastName.value || props.student.lastName,
      email: event.target.newEmail.value || props.student.email,
      campusId: newCampusId,
      id: props.student.id
    };
    store.dispatch(editStudent(studentObj));
    // Reset form
    document.getElementById('edit-student-form').reset();
  }

  let student = props.student;
  return (
    <div className="form-container">
      <form id="edit-student-form" onSubmit={handleSubmit}>
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
            >
              {
                // If the student is unassigned, default to 'Unassigned'
                !student.campusId &&
                <option value="UNASSIGNED">Unassigned</option>
              }
              {
                // Didn't prefer to use two maps here, but was getting
                // React error message to not set 'selected' on options...
                props.campuses.map(campus => {
                  return (
                      campus.id === student.campusId &&
                      <option
                        key={campus.id}
                        value={campus.id}>
                        {campus.name}
                      </option>
                  )
                })
              }
              {
                props.campuses.map(campus => {
                  return (
                      campus.id !== student.campusId &&
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
export default EditStudent;
