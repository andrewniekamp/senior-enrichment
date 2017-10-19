import React from 'react';

import store, { editCampus } from '../store';

const EditCampus = (props) => {

  function handleSubmit(event) {
    event.preventDefault();
    // Only assign new values if something is defined, otherwise keep prev values
    let campusObj = {
      name: event.target.newName.value || props.campus.name,
      imageURL: event.target.newImageURL.value || props.campus.imageURL,
      id: props.campus.id
    }
    store.dispatch(editCampus(campusObj));
    // Reset form
    document.getElementById('edit-campus-form').reset();
  }

  let campus = props.campus;
  return (
    <div className="form-container">
      <form id="edit-campus-form" className="form-container" onSubmit={handleSubmit}>
        <h3>Edit Campus</h3>
        <div className="form-inner">
          <h3>{campus.name}</h3>
          <div className="form-group">
            <label className="form-label" htmlFor="campus-name-input">Update Campus Name</label>
            <input
              id="campus-name-input"
              className="form-input"
              name="newName"
              type="text"
              placeholder={campus.name}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="campus-image-input">Update Image URL</label>
            <input
              id="campus-image-input"
              className="form-input"
              name="newImageURL"
              type="text"
              placeholder={campus.imageURL}
            />
          </div>
        </div>
        <button className="form-button" type="submit">Update</button>
      </form>
    </div>
  );
}
export default EditCampus;
