import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import store, { deletedCampus } from '../store';
import AddCampus from './AddCampus';

function clickHandler(event) {
  axios.delete(`/api/campuses/${event.target.value}`)
    .then(response => {
      const action = deletedCampus(response.data);
      store.dispatch(action);
    })
}

export default class Campuses extends React.Component {
  constructor() {
    super()
    this.state = store.getState();
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }
  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <div>
        <AddCampus />
        <h2>Campuses</h2>
        <div className="campus-container">
          {
            this.state.campuses.map(campus => {
              return (
                <div key={campus.id} className="campus-item">
                  <h3><Link to={`/campuses/${campus.id}`}>{campus.name}</Link></h3>
                  <img src={campus.imageURL} alt="Space!" />
                  <button
                    value={campus.id}
                    onClick={clickHandler}>
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
