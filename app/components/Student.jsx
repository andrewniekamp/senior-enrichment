import React from 'react';
import { Link } from 'react-router-dom';

import store, { fetchStudent } from '../store';
import EditStudent from './EditStudent';

export default class Student extends React.Component {
  constructor() {
    super()
    this.state = store.getState();
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));

    store.dispatch(fetchStudent(this.props.match.params.studentId))
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    let student = this.state.student;
    return (
      <div className="padded-container">
        <h2>Student: {student.firstName} {student.lastName}</h2>
        <span id="student-campus"> Campus:
        {
          this.state.campuses.map(campus => {
            return (
              student.campusId === campus.id &&
              <Link key={campus.id} to={`/campuses/${campus.id}`}>{campus.name}</Link>
            )
          })
        }
        </span>
        <EditStudent student={student} campuses={this.state.campuses} />
      </div>
    )
  }
}
