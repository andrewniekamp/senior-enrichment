import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Campus from './Campus';
import Campuses from './Campuses';
import Student from './Student';
import Students from './Students';
import Navbar from './Navbar';

export default class App extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route path='/campuses/:campusId' component={Campus} />
          <Route exact path='/campuses' component={Campuses} />
          <Route path='/students/:studentId' component={Student} />
          <Route exact path='/students' component={Students} />
          <Route path='/' component={Home} />
        </Switch>
      </div>
    )
  }
}
