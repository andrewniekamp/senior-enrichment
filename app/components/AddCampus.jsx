import React from 'react';
import axios from 'axios';

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
    .then( () => {
      this.setState({ newName: '' });
      this.setState({ newImageURL: '' })
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="input-group input-group-lg">
          <label htmlFor="campus-name-input">Campus Name</label>
          <input
            id="campus-name-input"
            name="newName"
            type="text"
            value={this.state.newName}
            onChange={this.handleNameChange}
          />
          <label htmlFor="campus-image-input">Image URL</label>
          <input
            id="campus-image-input"
            name="newImageURL"
            type="text"
            value={this.state.newImageURL}
            onChange={this.handleImageURLChange}
          />
          <button type="submit">Save</button>
        </div>
      </form>
    );
  }
}
