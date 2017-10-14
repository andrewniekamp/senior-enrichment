import React from 'react';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';

import AddStudent from './AddStudent';

export default class Students extends React.Component {
  constructor() {
    super()
    this.state = {
      students: []
    }
  }
  componentDidMount() {
    axios.get('/api/students')
    .then( res => {
      this.setState({ students: res.data });
    });
  }
  render() {
    return (
      <div>
        <AddStudent />
        <h2>Students</h2>
        {
          this.state.students.map( student => {
            return (
              <Link key={student.id} to={`/students/${student.id}`}>{student.name}</Link>
            )
          })
        }
      </div>
    )
  }
}
