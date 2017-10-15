import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Campuses extends React.Component {
  constructor() {
    super()
    this.state = {
      campus: {}
    }
  }

  componentDidMount() {
    axios.get(`/api/campuses/${this.props.match.params.campusId}`)
    .then( res => {
      this.setState({ campus: res.data });
    });
  }

  render() {
    return (
      <div>
        <h2>Campus: {this.state.campus.name}</h2>
        <h3>Students</h3>
        { this.state.campus.students &&
          store.getState().students.map( student => {
            return (
              <Link key={student.id} to={`/students/${student.id}`}>{student.name}</Link>
            )
          })
        }
      </div>
    )
  }
}
