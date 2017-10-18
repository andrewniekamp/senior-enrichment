import React from 'react';

import store from '../store';
import AddStudent from './AddStudent';
import SingleStudent from './SingleStudent';

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
          this.state.students.map( student => {
            return (
              <SingleStudent key={student.id} student={student} canDelete={true} />
            )
          })
        }
      </div>
    )
  }
}
