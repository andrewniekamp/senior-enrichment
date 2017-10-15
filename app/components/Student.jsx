import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Student extends React.Component {
  constructor() {
    super()
    this.state = {
      student: {}
    }
  }

  componentDidMount() {
    axios.get(`/api/students/${this.props.match.params.studentId}`)
    .then( res => {
      this.setState({ student: res.data });
    });
  }

  render() {
    return (
      <div>
        <h2>Student: {this.state.student.firstName} {this.state.student.lastName}</h2>
        <h3>Campus</h3>
        <Link to={`/campuses/${this.state.student.campusId}`}>{this.state.student.campus && this.state.student.campus.name}</Link>
      </div>
    )
  }
}
