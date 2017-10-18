import axios from 'axios';
import { gotCampus } from './campus';

// Actions
const GOT_CAMPUSES = 'GOT_CAMPUSES';
const ADDED_CAMPUS = 'ADDED_CAMPUS';
const EDITED_CAMPUS = 'EDITED_CAMPUS';
const DELETED_CAMPUS = 'DELETED_CAMPUS';

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
export function deletedCampus(campus) {
  const action = { type: DELETED_CAMPUS, campus };
  return action;
}

// Couldn't get this to work yet, maybe use later

// Thunk creators
export function fetchCampuses() {
  return function thunk(dispatch) {
    axios.get('/api/campuses')
    .then( res => res.data)
    .then( campuses => {
      const action = gotCampuses(campuses);
      dispatch(action);
    });
  }
}

export function addCampus(newCampus) {
  return function thunk(dispatch) {
    axios.post('/api/campuses/add', {
      name: newCampus.name,
      imageURL: newCampus.imageURL
    })
    .then( res => res.data)
    .then( campus => {
      dispatch(addedCampus(campus));
    })
  }
}

export function deleteCampus(id) {
  return function thunk(dispatch) {
    axios.delete(`/api/campuses/${id}`)
    .then( res => res.data)
    .then( campus => {
      const action = deletedCampus(campus);
      dispatch(action);
    });
  }
}

export function editCampus(modifiedCampus) {
  return function thunk(dispatch) {
    axios.put('/api/campuses', modifiedCampus)
    // Put receives array, index 1 has returned object option as set in API
    .then( res => res.data )
    .then( updatedCampus => {
      // Update campus in campuses (array)
      dispatch(editedCampus(updatedCampus));
      // Update campus in campus (singular {})
      dispatch(gotCampus(updatedCampus));
    });
  }
}

// Reducer
export default function reducer(state = [], action) {
  switch (action.type) {
    case GOT_CAMPUSES:
      return action.campuses;
    case ADDED_CAMPUS:
      return [...state, action.campus];
    case EDITED_CAMPUS:
      // Returns all from prevState except one that needed update, then concats updated one from action
      return state.filter( campus => (campus.id !== action.campus.id)).concat(action.campus);
    case DELETED_CAMPUS:
      // Returns all from prevState except one deleted
      return state.filter( campus => (campus.id !== action.campus.id));
    default:
      return state;
  }
}
