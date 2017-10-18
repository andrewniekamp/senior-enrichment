import React from 'react';

import store, { addCampus } from '../store';

const AddCampus = () => {

  function handleSubmit(event) {
    event.preventDefault();
    const newCampus = {
      name: event.target.newName.value,
      imageURL: event.target.newImageURL.value
    }
    store.dispatch(addCampus(newCampus));

    document.getElementById('add-campus-form').reset();
  }

  return (
    <div className="form-container">
      <form id="add-campus-form" onSubmit={handleSubmit}>
        <h3>Add New Campus</h3>
        <div className="form-inner">
          <div className="form-group">
            <label className="form-label" htmlFor="campus-name-input">Campus Name</label>
            <input
              required
              id="campus-name-input"
              className="form-input"
              name="newName"
              type="text"
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="campus-image-input">Image URL</label>
            <input
              required
              id="campus-image-input"
              className="form-input"
              name="newImageURL"
              type="text"
            />
          </div>
        </div>
        <button className="form-button" type="submit">Save</button>
      </form>
    </div>
  );
}
export default AddCampus;
