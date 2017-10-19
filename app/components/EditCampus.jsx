import React from 'react';

import store, { editCampus } from '../store';

export default class EditCampus extends React.Component {
  constructor() {
    super()
    this.state = store.getState();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleSubmit(event) {
    event.preventDefault();
    // Only assign new values if something is defined, otherwise keep prev values
    let campusObj = {
      name: event.target.newName.value || this.props.campus.name,
      imageURL: event.target.newImageURL.value || this.props.campus.imageURL,
      id: this.props.campus.id
    }
    store.dispatch(editCampus(campusObj));
    // Reset form
    document.getElementById('edit-campus-form').reset();
  }

  render() {
    let campus = this.state.campus;
    return (
      <div className="form-container">
        <form id="edit-campus-form" className="form-container" onSubmit={this.handleSubmit}>
          <h3>Edit Campus</h3>
          <div className="form-inner">
            <h3>{this.props.name}</h3>
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
}
