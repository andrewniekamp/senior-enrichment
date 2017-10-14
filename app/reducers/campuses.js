// import axios from 'axios';

// Actions
const GOT_CAMPUSES = 'GOT_CAMPUSES';

// Action creators
export function gotCampuses(campuses) {
  const action = { type: GOT_CAMPUSES, campuses };
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
    default:
      return state;
  }
}
