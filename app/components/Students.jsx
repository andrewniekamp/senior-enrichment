import React from 'react';
import { Link } from 'react-router-dom';

import store from '../store';
import AddStudent from './AddStudent';

export default class Students extends React.Component {
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
        <AddStudent />
        <h2>Students</h2>
        {
          store.getState().students.map( student => {
            return (
              <div key={student.id} className="student-container">
                <h4>
                  <Link to={`/students/${student.id}`}>{student.firstName} {student.lastName} {student.email}</Link>
                  { store.getState().campuses[0] &&
                    store.getState().campuses[student.campusId -1].name
                  }
                </h4>
              </div>
            )
          })
        }
      </div>
    )
  }
}
