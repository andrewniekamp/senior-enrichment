import React from 'react';
import { connect } from 'react-redux';

import { fetchStudent } from '../store';
import Student from './Student';

const mapStateToProps = (state, ownProps) => ({
  campuses: state.campuses,
  student: state.student
});

const mapDispatchToProps = {
  fetchStudent
}

const StudentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Student);

export default StudentContainer;
