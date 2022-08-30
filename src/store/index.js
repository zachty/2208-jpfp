import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { studentReducer, campusReducer } from './reducers';

const allReducers = combineReducers({
    students: studentReducer,
    campuses: campusReducer,
});

function configureStore() {
    return createStore(allReducers, applyMiddleware(thunk, logger));
}

export default configureStore;
