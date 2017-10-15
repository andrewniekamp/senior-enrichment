// import axios from 'axios';

// Actions
const GOT_STUDENTS = 'GOT_STUDENTS';
const ADDED_STUDENT = 'ADDED_STUDENT';

// Action creators
export function gotStudents(students) {
  const action = { type: GOT_STUDENTS, students };
  return action;
}
export function addedStudent(student) {
  const action = { type: ADDED_STUDENT, student };
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
    case ADDED_STUDENT:
      return [...state, action.student];
    default:
      return state;
  }
}
