import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import createLogger from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk

export default createStore(rootReducer, applyMiddleware(thunkMiddleware, createLogger()))

// Needed to make exports available when importing store into components
export * from './reducers/campuses';
export * from './reducers/campus';
export * from './reducers/students';
export * from './reducers/student';
