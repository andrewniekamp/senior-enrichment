import React from 'react';

import store, { editStudent } from '../store';

const AssignStudent = (props) => {

  function handleSubmit(event) {
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
        <div className="input-group input-group-lg">
          <label htmlFor="campus-selection">Assign Student</label>
          <select
            id="campus-selection"
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
          <button type="submit">Assign</button>
        </div>
      </form>
    </div>
  );
}
export default AssignStudent;
