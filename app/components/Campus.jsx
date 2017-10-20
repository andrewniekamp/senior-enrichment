import React from 'react';

import EditCampus from './EditCampus';
import SingleStudent from './SingleStudent';
import AssignStudent from './AssignStudent';

const Campuses = (props) => {

  if (!props.campus.id) props.fetchCampus(props.match.params.campusId)

  return (
    <div>
      <div className="campus-banner" >
        <img
          className="campus-banner-img"
          src={props.campus.imageURL} />
        <h2 className="campus-banner-name" >Campus: {props.campus.name}</h2>
      </div>
      <div className="padded-container">
        <div className="campus-edit-container">
          <EditCampus campus={props.campus} />
          <AssignStudent
            students={props.students}
            campusId={props.campus.id} />
        </div>
        <div className="content-section">
          <h3>Students</h3>
          {
            props.students.map(student => {
              return (
                student.campusId === props.campus.id &&
                <SingleStudent
                  key={student.id}
                  student={student}
                  campus={props.campus}
                  canUnassign={true} />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}
export default Campuses;
