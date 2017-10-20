import React from 'react';
import { connect } from 'react-redux';

import { deleteCampus } from '../store';
import Campuses from './Campuses';

const mapStateToProps = (state, ownProps) => ({
  campuses: state.campuses
});

const mapDispatchToProps = {
  deleteCampus
}

const CampusesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Campuses);

export default CampusesContainer;
