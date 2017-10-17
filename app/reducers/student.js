// import axios from 'axios';

// Actions
const GOT_STUDENT = 'GOT_STUDENT';

// Action creators
export function gotStudent(student) {
  const action = { type: GOT_STUDENT, student };
  return action;
}
// Reducer
export default function reducer(state = {}, action) {
  switch (action.type) {
    case GOT_STUDENT:
      return action.student;
    default:
      return state;
  }
}
