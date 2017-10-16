import { combineReducers } from 'redux'
// import axios from 'axios';

import campus from './campus';
import campuses from './campuses';
import students from './students';

const reducer = combineReducers({
  campuses,
  campus,
  students
})

export default reducer;
