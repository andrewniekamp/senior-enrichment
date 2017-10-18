import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import store, { deletedCampus } from '../store';
import AddCampus from './AddCampus';

export default class Campuses extends React.Component {
  constructor() {
    super()
    this.state = store.getState();
    this.clickHandler = this.clickHandler.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe( () => this.setState(store.getState()));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  clickHandler(event) {
    axios.delete(`/api/campuses/${event.target.value}`)
    .then( response => {
      const action = deletedCampus(response.data);
      store.dispatch(action);
    })
  }

  render() {
    return (
      <div>
      <AddCampus />
      <h2>Campuses</h2>
      <div className="campus-container">
      {
        store.getState().campuses.map( campus => {
          return (
            <div key={campus.id} className="campus-item">
              <h3><Link to={`/campuses/${campus.id}`}>{campus.name}</Link></h3>
              <img src={campus.imageURL} alt="Space!" />
              <button
              value={campus.id}
              onClick={this.clickHandler}>
              Delete</button>
            </div>
            )
          })
        }
        </div>
      </div>
    )
  }
}
