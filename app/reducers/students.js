// import axios from 'axios';

// Actions
const GOT_STUDENTS = 'GOT_STUDENTS';

// Action creators
export function gotStudents(students) {
  const action = { type: GOT_STUDENTS, students };
  return action;
}

// Maybe later...

// Thunk creators
// export function fetchStudents() {
//   return function thunk(dispatch) {
//     axios.get('/api/students')
//     .then( res => res.data)
//     .then( students => {
//       const action = getStudents(students);
//       dispatch(action);
//     });
//   }
// }

// Reducer
export default function reducer(state = [], action) {
  switch (action.type) {
    case GOT_STUDENTS:
      return action.students;
    default:
      return state;
  }
}
