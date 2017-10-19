import axios from 'axios';
import { gotStudent } from './student';

// Actions
const GOT_STUDENTS = 'GOT_STUDENTS';
const ADDED_STUDENT = 'ADDED_STUDENT';
const EDITED_STUDENT = 'EDITED_STUDENT';
const DELETED_STUDENT = 'DELETED_STUDENT';

// Action creators
export function gotStudents(students) {
  const action = { type: GOT_STUDENTS, students };
  return action;
}
export function addedStudent(student) {
  const action = { type: ADDED_STUDENT, student };
  return action;
}
export function editedStudent(student) {
  const action = { type: EDITED_STUDENT, student };
  return action;
}
export function deletedStudent(student) {
  const action = { type: DELETED_STUDENT, student };
  return action;
}

// Maybe later...

// Thunk creators
export function fetchStudents() {
  return function thunk(dispatch) {
    axios.get('/api/students')
    .then( res => res.data)
    .then( students => {
      const action = gotStudents(students);
      dispatch(action);
    });
  }
}

export function addStudent(newStudent) {
  return function thunk(dispatch) {
    axios.post('/api/students/add', {
      firstName: newStudent.firstName,
      lastName: newStudent.lastName,
      email: newStudent.email,
      campusId: newStudent.campusId
    })
    .then( res => res.data)
    .then( student => {
      dispatch(addedStudent(student));
    })
  }
}

export function deleteStudent(id) {
  return function thunk(dispatch) {
    axios.delete(`/api/students/${id}`)
    .then( res => res.data)
    .then( student => {
      const action = deletedStudent(student);
      dispatch(action);
    });
  }
}

export function editStudent(modifiedStudent) {
  return function thunk(dispatch) {
    axios.put('/api/students', modifiedStudent)
    // Put receives array, index 1 has returned object option as set in API
    // .then((res => res[1]))
    .then( res => res.data )
    .then( updatedStudent => {
      // Update student in students (array)
      dispatch(editedStudent(updatedStudent));
      // Update student in student (singular {})
      dispatch(gotStudent(updatedStudent));
    });
  }
}

const compareFunc = (prevVal, nextVal) => {
  if (prevVal.lastName < nextVal.lastName) return -1;
  if (prevVal.lastName > nextVal.lastName) return 1;
  return 0;
}

// Reducer
export default function reducer(state = [], action) {
  switch (action.type) {
    case GOT_STUDENTS:
      return action.students.sort(compareFunc);
    case ADDED_STUDENT:
      return [...state, action.student].sort(compareFunc);
    case EDITED_STUDENT:
      // Returns all from prevState except one that needed update, then concats updated one from action
      return state.filter( student => (student.id !== action.student.id)).concat(action.student).sort(compareFunc);
    case DELETED_STUDENT:
      // Returns all from prevState except one that was deleted
      return state.filter( student => (student.id !== action.student.id));
    default:
      return state;
  }
}
