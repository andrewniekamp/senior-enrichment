import React from 'react';
import { Link } from 'react-router-dom';

import EditStudent from './EditStudent';

const Student = (props) => {

  if (!props.student.id) props.fetchStudent(props.match.params.studentId)

  return (
    <div className="padded-container">
      <h2>Student: {props.student.firstName} {props.student.lastName}</h2>
      <span id="student-campus"> Campus:
      {
        props.campuses.map(campus => {
          return (
            props.student.campusId === campus.id &&
            <Link key={campus.id} to={`/campuses/${campus.id}`}>{campus.name}</Link>
          )
        })
      }
      {
        !props.student.campusId && '(Unassigned)'
      }
      </span>
      <EditStudent student={props.student} campuses={props.campuses} />
    </div>
  )
}
export default Student;
