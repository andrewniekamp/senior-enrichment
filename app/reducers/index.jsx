import { combineReducers } from 'redux'
// import axios from 'axios';

import campuses from './campuses';
import students from './students';

const reducer = combineReducers({
  campuses,
  students
})

export default reducer;
