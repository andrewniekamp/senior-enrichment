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
          <input
            name="newName"
            type="text"
            value={this.state.newName}
            onChange={this.handleNameChange}
          />
          <input
            name="newImageURL"
            type="text"
            value={this.state.newImageURL}
            onChange={this.handleImageURLChange}
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Chat!</button>
          </span>
        </div>
      </form>
    );
  }
}
