import { combineReducers } from 'redux'
// import axios from 'axios';

import campus from './campus';
import campuses from './campuses';
import students from './students';
import student from './student';

const reducer = combineReducers({
  campuses,
  campus,
  students,
  student
})

export default reducer;
