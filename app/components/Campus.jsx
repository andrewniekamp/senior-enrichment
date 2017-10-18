import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import store, { gotCampus, deletedStudent } from '../store';
import EditCampus from './EditCampus';
import SingleStudent from './SingleStudent';

const studentDeleteHandler = (event) => {
  axios.delete(`/api/students/${event.target.value}`)
  .then( response => {
    const action = deletedStudent(response.data);
    store.dispatch(action);
  })
}

export default class Campuses extends React.Component {
  constructor() {
    super()
    this.state = store.getState();
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe( () => this.setState(store.getState()));

    axios.get(`/api/campuses/${this.props.match.params.campusId}`)
    .then( res =>  res.data)
    .then( campus => {
      const action = gotCampus(campus);
      store.dispatch(action);
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    let currentCampus = store.getState().campus;
    return (
      <div>
        <div className="campus-banner" >
          <img className="campus-banner-img" src={currentCampus.imageURL} />
          <h2 className="campus-banner-name" >Campus: {currentCampus.name}</h2>
        </div>
        <EditCampus />
        <h3>Students</h3>
        {
          store.getState().students.map( student => {
            return (
              student.campusId === currentCampus.id &&
              <SingleStudent key={student.id} student={student} campus={currentCampus} clickHandler={studentDeleteHandler} />
            )
          })
        }
      </div>
    )
  }
}
