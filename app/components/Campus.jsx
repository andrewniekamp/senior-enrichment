import React from 'react';

import store, { fetchCampus } from '../store';
import EditCampus from './EditCampus';
import SingleStudent from './SingleStudent';

export default class Campuses extends React.Component {
  constructor() {
    super()
    this.state = store.getState();
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe( () => this.setState(store.getState()));

    store.dispatch(fetchCampus(this.props.match.params.campusId));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    let campus = store.getState().campus;
    return (
      <div>
        <div className="campus-banner" >
          <img className="campus-banner-img" src={campus.imageURL} />
          <h2 className="campus-banner-name" >Campus: {campus.name}</h2>
        </div>
        <EditCampus campus={campus} />
        <h3>Students</h3>
        {
          this.state.students.map( student => {
            return (
              student.campusId === campus.id &&
              <SingleStudent key={student.id} student={student} campus={campus} />
            )
          })
        }
      </div>
    )
  }
}
