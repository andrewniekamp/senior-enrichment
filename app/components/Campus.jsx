import React from 'react';

import store, { fetchCampus } from '../store';
import EditCampus from './EditCampus';
import SingleStudent from './SingleStudent';
import AssignStudent from './AssignStudent';

export default class Campuses extends React.Component {
  constructor() {
    super()
    this.state = store.getState();
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));

    store.dispatch(fetchCampus(this.props.match.params.campusId));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    let campus = this.state.campus;
    return (
      <div>
        <div className="campus-banner" >
          <img
            className="campus-banner-img"
            src={campus.imageURL} />
          <h2 className="campus-banner-name" >Campus: {campus.name}</h2>
        </div>
        <div className="padded-container">
          <EditCampus campus={campus} />
          <AssignStudent
            students={this.state.students}
            campusId={campus.id} />
          <h3>Students</h3>
          {
            this.state.students.map(student => {
              return (
                student.campusId === campus.id &&
                <SingleStudent
                  key={student.id}
                  student={student}
                  campus={campus}
                  canUnassign={true} />
              )
            })
          }
        </div>
      </div>
    )
  }
}
