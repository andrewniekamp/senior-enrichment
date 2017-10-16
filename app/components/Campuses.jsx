import React from 'react';
import { Link } from 'react-router-dom';

import store from '../store';
import AddCampus from './AddCampus';

export default class Campuses extends React.Component {
  constructor() {
    super()
    this.state = store.getState();
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe( () => this.setState(store.getState()));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <div>
      <AddCampus />
      <h2>Campuses</h2>
      {
        store.getState().campuses.map( campus => {
          return (
            <div key={campus.id} className="campus-container">
              <h3><Link to={`/campuses/${campus.id}`}>{campus.name}</Link></h3>
              <img src={campus.imageURL} alt="Space!" />
            </div>
            )
          })
        }
      </div>
    )
  }
}
