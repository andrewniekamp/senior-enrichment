import React from 'react';
import axios from 'axios';

import store, { addedCampus } from '../store';

export default class AddCampus extends React.Component {
  constructor() {
    super()
    this.state = {
      newName: '',
      newImageURL: ''
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
    event.preventDefault();
    axios.post('/api/campuses/add', {
      name: event.target.newName.value,
      imageURL: event.target.newImageURL.value
    })
    .then( (res) => {
      this.setState({ newName: '' });
      this.setState({ newImageURL: '' })
      const action = addedCampus(res.data);
      store.dispatch(action);
    })
  }

  render() {
    return (
      <div className="form-container">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="campus-name-input">Campus Name</label>
            <input
              required
              id="campus-name-input"
              className="form-input"
              name="newName"
              type="text"
              value={this.state.newName}
              onChange={this.handleNameChange}
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
              value={this.state.newImageURL}
              onChange={this.handleImageURLChange}
            />
          </div>
          <button className="form-button" type="submit">Save</button>
        </form>
      </div>
    );
  }
}
