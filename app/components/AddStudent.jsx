import React from 'react';
import axios from 'axios';

import store, { addedStudent } from '../store';

export default class AddCampus extends React.Component {
  constructor() {
    super()
    this.state = {
      newFirstName: '',
      newLastName: '',
      newEmail: '',
      campuses: []
    }
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get('/api/campuses')
    .then( res => {
      this.setState({ campuses: res.data });
    });
  }

  handleFirstNameChange(event) {
    this.setState({ newFirstName: event.target.value });
  }
  handleLastNameChange(event) {
    this.setState({ newLastName: event.target.value });
  }
  handleEmailChange(event) {
    this.setState({ newEmail: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post('/api/students/add', {
      firstName: event.target.newFirstName.value,
      lastName: event.target.newLastName.value,
      email: event.target.newEmail.value,
      campusId: event.target.associatedCampus.value
    })
    .then( (res) => {
      this.setState({ newFirstName: '' });
      this.setState({ newLastName: '' });
      this.setState({ newEmail: '' })
      const action = addedStudent(res.data);
      store.dispatch(action);
    })
  }

  render() {
    return (
      <div className="form-container">
        <form onSubmit={this.handleSubmit}>
        <h3>Add New Student</h3>
          <div className="form-inner">
            <div className="form-group">
              <label className="form-label" htmlFor="first-name-input">First Name</label>
              <input
                required
                id="first-name-input"
                className="form-input"
                name="newFirstName"
                type="text"
                value={this.state.newFirstName}
                onChange={this.handleFirstNameChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="last-name-input">Last Name</label>
              <input
                required
                id="last-name-input"
                className="form-input"
                name="newLastName"
                type="text"
                value={this.state.newLastName}
                onChange={this.handleLastNameChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="email-input">Email</label>
              <input
                required
                id="email-input"
                className="form-input"
                name="newEmail"
                type="text"
                value={this.state.newEmail}
                onChange={this.handleEmailChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="campus-selection">Campus</label>
              <select
                required
                id="campus-selection"
                className="form-select"
                name="associatedCampus"
              >
              {
                this.state.campuses.map( campus => {
                  return (
                    <option key={campus.id} value={campus.id}>{campus.name}</option>
                  )
                })
              }
              </select>
            </div>
          </div>
          <button className="form-button" type="submit">Save</button>
        </form>
      </div>
    );
  }
}
