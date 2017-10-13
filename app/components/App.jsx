import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Campuses from './Campuses';
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
          <Route exact path='/' component={Home} />
          <Route path='/campuses' component={Campuses} />
          <Route path='/students' component={Students} />
        </Switch>
      </div>
    )
  }
}