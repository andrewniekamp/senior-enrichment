import React from 'react';
import axios from 'axios';

import store, { editedCampus, gotCampus } from '../store';

export default class EditCampus extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      store: store.getState(),
      newName: '',
      newImageURL: ''
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleImageURLChange = this.handleImageURLChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe( () => this.setState(store.getState()));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleNameChange(event) {
    this.setState({ newName: event.target.value });
  }
  handleImageURLChange(event) {
    this.setState({ newImageURL: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    // Only assign new values if something is defined, otherwise keep prev values
    let name = event.target.newName.value || store.getState().campus.name;
    let imageURL = event.target.newImageURL.value || store.getState().campus.imageURL;
    let id = store.getState().campus.id;
    console.log({name, imageURL, id}, store.getState().campus.name)
    axios.put('/api/campuses', { name, imageURL, id })
    .then( (res) => {
      let updatedCampus = res.data[1];
      this.setState({ newName: '' });
      this.setState({ newImageURL: '' });
      // Put receives array, index 1 has returned object option as set in API
      const action = editedCampus(updatedCampus);
      store.dispatch(action);
      const setCurrentAction = gotCampus(updatedCampus);
      store.dispatch(setCurrentAction);
    })
  }

  render() {
    let currentCampus = store.getState().campus;
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>{this.props.name}</h3>
        <div className="input-group input-group-lg">
          <label htmlFor="campus-name-input">Update Campus Name</label>
          <input
            id="campus-name-input"
            name="newName"
            type="text"
            placeholder={currentCampus.name}
            value={this.state.newName}
            onChange={this.handleNameChange}
          />
          <label htmlFor="campus-image-input">Update Image URL</label>
          <input
            id="campus-image-input"
            name="newImageURL"
            type="text"
            placeholder={currentCampus.imageURL}
            value={this.state.newImageURL}
            onChange={this.handleImageURLChange}
          />
          <button type="submit">Update</button>
        </div>
      </form>
    );
  }
}
