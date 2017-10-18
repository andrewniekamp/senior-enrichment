import React from 'react';
import { Link } from 'react-router-dom';
import store, { deleteStudent } from '../store';

const SingleStudent = (props) => {
  return (
    <div className="student-container">
      <Link to={`/students/${props.student.id}`}>{props.student.firstName} {props.student.lastName} {props.student.email}</Link>
      {
        // Only renders delete if canDelete prop was passed
        props.canDelete &&
        <button
          onClick={() => store.dispatch(deleteStudent(props.student.id))}>
          Delete
        </button>
      }
    </div>
  )
}

export default SingleStudent;
