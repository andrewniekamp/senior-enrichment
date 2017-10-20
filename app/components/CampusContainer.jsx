import React from 'react';
import { connect } from 'react-redux';

import { fetchCampus } from '../store';
import Campus from './Campus';

const mapStateToProps = (state, ownProps) => ({
  campuses: state.campuses,
  students: state.students,
  campus: state.campus
});

const mapDispatchToProps = {
  fetchCampus
}

const CampusContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Campus);

export default CampusContainer;
