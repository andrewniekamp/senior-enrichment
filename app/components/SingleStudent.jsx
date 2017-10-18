import React from 'react';
import { Link } from 'react-router-dom';
import store, { deleteStudent, editStudent } from '../store';


const SingleStudent = (props) => {
  function unassignStudent() {
    let unassignedStudent = Object.assign({}, props.student, {campusId: null})
    console.log(unassignedStudent);
    store.dispatch(editStudent(unassignedStudent))
  }
  return (
    <div className="student-container">
      <Link to={`/students/${props.student.id}`}>{props.student.firstName} {props.student.lastName} {props.student.email}</Link>
      {
        // Only renders delete if canDelete prop was passed
        props.canDelete &&
        <button
          className="student-button"
          onClick={() => store.dispatch(deleteStudent(props.student.id))}>
          Delete
        </button>
      }
      {
        props.canUnassign &&
        <button
          className="student-button"
          onClick={unassignStudent}>
          Unassign
        </button>
      }
    </div>
  )
}

export default SingleStudent;
