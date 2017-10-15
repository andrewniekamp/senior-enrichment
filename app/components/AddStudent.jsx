import React from 'react';
import axios from 'axios';

export default class AddCampus extends React.Component {
  constructor() {
    super()
    this.state = {
      newName: '',
      newEmail: '',
      campuses: []
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get('/api/campuses')
    .then( res => {
      this.setState({ campuses: res.data });
    });
  }

  handleNameChange(event) {
    this.setState({ newName: event.target.value });
  }
  handleEmailChange(event) {
    this.setState({ newEmail: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post('/api/students/add', {
      name: event.target.newName.value,
      email: event.target.newEmail.value,
      campusId: event.target.associatedCampus.value
    })
    .then( () => {
      this.setState({ newName: '' });
      this.setState({ newEmail: '' })
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
            name="newEmail"
            type="text"
            value={this.state.newEmail}
            onChange={this.handleEmailChange}
          />
          <select name="associatedCampus">
          {
            this.state.campuses.map( campus => {
              return (
                <option key={campus.id} value={campus.id}>{campus.name}</option>
              )
            })
          }
          </select>
          <button type="submit">Save</button>
        </div>
      </form>
    );
  }
}
