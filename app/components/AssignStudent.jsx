import React from 'react';

import store, { editStudent } from '../store';

const AssignStudent = (props) => {

  const handleSubmit = (event) => {
    event.preventDefault();
    let studentObj = {
      id: event.target.associatedStudent.value,
      campusId: props.campusId
    }
    store.dispatch(editStudent(studentObj));
  }

  return (
    <div className="form-container">
      <form id="edit-student-form" onSubmit={handleSubmit}>
        <h3>Assign Student</h3>
        <div className="form-inner">
          <div className="form-group">
            <label id="assign-student-label" className="form-label" htmlFor="campus-selection">Student</label>
            <select
              id="campus-selection"
              className="form-select"
              name="associatedStudent"
            >
              {
                props.students.map(student => {
                  return (
                    <option
                      key={student.id}
                      value={student.id}>
                      {student.firstName} {student.lastName} { !student.campusId && ' (UNASSIGNED)' }
                    </option>
                  )
                })
              }
            </select>
          </div>
        </div>
        <button className="form-button" type="submit">Assign</button>
      </form>
    </div>
  );
}
export default AssignStudent;
