import axios from 'axios';

// Actions
const GOT_CAMPUS = 'GOT_CAMPUS';

// Action creators
export function gotCampus(campus) {
  const action = { type: GOT_CAMPUS, campus };
  return action;
}

// Thunk creators
export function fetchCampus(id) {
  return function thunk(dispatch) {
    axios.get(`/api/campuses/${id}`)
    .then( res => res.data)
    .then( campus => {
      const action = gotCampus(campus);
      dispatch(action);
    });
  }
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
