import React from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';

import store, { gotStudents, gotCampuses } from '../store';
import Home from './Home';
import Campus from './Campus';
import Campuses from './Campuses';
import Student from './Student';
import Students from './Students';
import Navbar from './Navbar';

export default class App extends React.Component {
  constructor() {
    super()
    this.state = store.getState();
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe( () => this.setState(store.getState()));

    axios.get('/api/students')
    .then( res => {
      const action = gotStudents(res.data);
      store.dispatch(action);
    });
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
        <Navbar />
        <Switch>
          <Route path="/campuses/:campusId" component={Campus} />
          <Route exact path="/campuses" component={Campuses} />
          <Route path="/students/:studentId" component={Student} />
          <Route exact path="/students" component={Students} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    )
  }
}
