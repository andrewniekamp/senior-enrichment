import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import store, { gotCampuses } from '../store';
import AddCampus from './AddCampus';

export default class Campuses extends React.Component {
  constructor() {
    super()
    this.state = store.getState();
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe( () => this.setState(store.getState()));

    axios.get('/api/campuses')
    .then( res => {
      const action = gotCampuses(res.data);
      store.dispatch(action);
    });
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
          this.state.campuses.map( campus => {
            return (
              <Link key={campus.id} to={`/campuses/${campus.id}`}>{campus.name}</Link>
            )
          })
        }
      </div>
    )
  }
}
