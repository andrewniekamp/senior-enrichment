import React from 'react';
import { Link } from 'react-router-dom';

import AddCampus from './AddCampus';

const Campuses = (props) => {

  return (
    <div className="padded-container">
      <AddCampus />
      <h2>Campuses</h2>
      <div className="campus-container">
        {
          // Sort them by ID, so newly added campuses render at the top
          props.campuses &&
          props.campuses.sort((val1, val2) => val2.id - val1.id).map(campus => {
            return (
              <div key={campus.id} className="campus-item">
                <Link to={`/campuses/${campus.id}`}>
                  <div className="link-box">
                    <h3>{campus.name}</h3>
                    <img src={campus.imageURL} alt="Space!" />
                  </div>
                </Link>
                <button
                  className="campus-button"
                  onClick={() => props.deleteCampus(campus.id)}>
                  Delete
                </button>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
export default Campuses;
