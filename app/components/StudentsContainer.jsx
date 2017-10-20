import React from 'react';
import { connect } from 'react-redux';

import { fetchStudents } from '../store';
import Students from './Students';

const mapStateToProps = (state, ownProps) => ({
  campuses: state.campuses,
  students: state.students
});

const mapDispatchToProps = {

}

const StudentsContainer = connect(
  mapStateToProps
)(Students);

export default StudentsContainer;
