import React from 'react';
import { Link } from 'react-router-dom';

import store, { deleteCampus } from '../store';
import AddCampus from './AddCampus';

export default class Campuses extends React.Component {
  constructor() {
    super();
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
            // Sort them by ID, so newly added campuses render at the top
            this.state.campuses.sort((val1, val2) => val2.id - val1.id).map(campus => {
              return (
                <div key={campus.id} className="campus-item">
                  <h3><Link to={`/campuses/${campus.id}`}>{campus.name}</Link></h3>
                  <img src={campus.imageURL} alt="Space!" />
                  <button
                    onClick={() => store.dispatch(deleteCampus(campus.id))}>
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
