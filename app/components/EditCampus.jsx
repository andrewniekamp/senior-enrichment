import React from 'react';
import axios from 'axios';

import store, { editedCampus } from '../store';

export default class EditCampus extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newName: '',
      newImageURL: '',
      campusId: this.props.campusId
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleImageURLChange = this.handleImageURLChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState({ newName: event.target.value });
  }
  handleImageURLChange(event) {
    this.setState({ newImageURL: event.target.value });
  }

  handleSubmit(event) {
    // Only assign new values if something is defined, otherwise keep prev values
    let name = event.target.newName.value || this.props.name;
    let imageURL = event.target.newImageURL.value || this.props.imageURL;
    let id = this.props.campusId;
    event.preventDefault();
    axios.put('/api/campuses/update', { name, imageURL, id })
    .then( (res) => {
      this.setState({ newName: '' });
      this.setState({ newImageURL: '' });
      // Put receives array, index 1 has returned object option as set in API
      const action = editedCampus(res.data[1]);
      store.dispatch(action);
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>{this.props.name}</h3>
        <div className="input-group input-group-lg">
          <label htmlFor="campus-name-input">Update Campus Name</label>
          <input
            id="campus-name-input"
            name="newName"
            type="text"
            placeholder={this.props.name}
            value={this.state.newName}
            onChange={this.handleNameChange}
          />
          <label htmlFor="campus-image-input">Update Image URL</label>
          <input
            id="campus-image-input"
            name="newImageURL"
            type="text"
            placeholder={this.props.imageURL}
            value={this.state.newImageURL}
            onChange={this.handleImageURLChange}
          />
          <button type="submit">Update</button>
        </div>
      </form>
    );
  }
}
