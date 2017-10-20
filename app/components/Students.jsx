import React from 'react';

import AddStudent from './AddStudent';
import SingleStudent from './SingleStudent';

const Students = (props) => {

  return (
    <div className="padded-container">
      <AddStudent campuses={props.campuses} />
      <h2>Students</h2>
      <div className="content-section">
        {
          props.students.map(student => {
          return (
            <SingleStudent
              key={student.id}
              student={student}
              canDelete={true} />
          )
        })
        }
      </div>
    </div>
  )
}
export default Students;
