// import axios from 'axios';

// Actions
const GOT_CAMPUS = 'GOT_CAMPUS';

// Action creators
export function gotCampus(campus) {
  const action = { type: GOT_CAMPUS, campus };
  return action;
}
// Reducer
export default function reducer(state = {}, action) {
  switch (action.type) {
    case GOT_CAMPUS:
      return action.campus;
    default:
      return state;
  }
}
