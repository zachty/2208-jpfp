import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {
    studentReducer,
    campusReducer,
    singleCampusReducer,
    singleStudentReducer,
    campusFormReducer,
    studentFormReducer,
} from './reducers';

const allReducers = combineReducers({
    students: studentReducer,
    campuses: campusReducer,
    student: singleStudentReducer,
    campus: singleCampusReducer,
    campusForm: campusFormReducer,
    studentForm: studentFormReducer,
});

function configureStore() {
    return createStore(allReducers, applyMiddleware(thunk, logger));
}

export default configureStore;
