import React from 'react';
import { Link } from 'react-router-dom';
import store, { deleteStudent } from '../store';

// TODO: IS THIS THE BEST PLACE FOR THIS?
const clickHandler = (event) => {
  store.dispatch(deleteStudent(event.target.value));
}

const SingleStudent = (props) => {
  return (
    <div className="student-container">
      <Link to={`/students/${props.student.id}`}>{props.student.firstName} {props.student.lastName} {props.student.email}</Link>
      {
        // Only renders delete if canDelete prop was passed
        props.canDelete &&
        <button
        value={props.student.id}
        onClick={clickHandler}>
        Delete
        </button>
      }
    </div>
  )
}

export default SingleStudent;
