// import axios from 'axios';

// Actions
const GOT_CAMPUSES = 'GOT_CAMPUSES';
const ADDED_CAMPUS = 'ADDED_CAMPUS';
const EDITED_CAMPUS = 'EDITED_CAMPUS';

// Action creators
export function gotCampuses(campuses) {
  const action = { type: GOT_CAMPUSES, campuses };
  return action;
}
export function addedCampus(campus) {
  const action = { type: ADDED_CAMPUS, campus };
  return action;
}
export function editedCampus(campus) {
  const action = { type: EDITED_CAMPUS, campus };
  return action;
}

// Couldn't get this to work yet, maybe use later

// Thunk creators
// export function fetchCampuses() {
//   return function thunk(dispatch) {
//     axios.get('/api/campuses')
//     .then( res => res.data)
//     .then( campuses => {
//       const action = getCampuses(campuses);
//       dispatch(action); // still dispatch from in here?
//     });
//   }
// }

// Reducer
export default function reducer(state = [], action) {
  switch (action.type) {
    case GOT_CAMPUSES:
      return action.campuses;
    case ADDED_CAMPUS:
      return [...state, action.campus];
    case EDITED_CAMPUS:
      return [state.map( campus => (campus.id !== action.campus.id)), action.campus];
    default:
      return state;
  }
}
