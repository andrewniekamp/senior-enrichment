import React from 'react';
import { Link } from 'react-router-dom';

const SingleStudent = (props) => {
  return (
    <div className="student-container">
      <Link to={`/students/${props.student.id}`}>{props.student.firstName} {props.student.lastName} {props.student.email}</Link>
      <button
        value={props.student.id}
        onClick={props.clickHandler}>
        Delete
      </button>
    </div>
  )
}

export default SingleStudent;
