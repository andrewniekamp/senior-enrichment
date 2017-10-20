import React from 'react';
import { Route, Switch } from 'react-router-dom';

import store, { fetchCampuses, fetchStudents } from '../store';
import Home from './Home';
import CampusContainer from './CampusContainer';
import Campuses from './Campuses';
import StudentsContainer from './StudentsContainer';
import StudentContainer from './StudentContainer';
import Navbar from './Navbar';

const App = () => {
  store.dispatch(fetchStudents());
  store.dispatch(fetchCampuses());
  return (
    <div>
      <Navbar />
      <Switch>
        <Route path="/campuses/:campusId" component={CampusContainer} />
        <Route exact path="/campuses" component={Campuses} />
        <Route path="/students/:studentId" component={StudentContainer} />
        <Route exact path="/students" component={StudentsContainer} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  )
}
export default App;
