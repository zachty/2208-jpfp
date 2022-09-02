//import reducers from students and campuses here for easy access
import studentReducer from './student/students';
import singleStudentReducer from './student/singleStudent';
import studentFormReducer from './student/studentForm';
import campusReducer from './campus/campuses';
import singleCampusReducer from './campus/singleCampus';
import campusFormReducer from './campus/campusForm';

//set up generalized reducers below

//for load screen
const FETCH_DATA = 'FETCH_DATA';
const GOT_DATA = 'GOT_DATA';
export const fetchData = () => ({ type: FETCH_DATA });
export const gotData = () => ({ type: GOT_DATA });
function isFetching(state = false, action) {
    switch (action.type) {
        case FETCH_DATA:
            return true;
        case GOT_DATA:
            return false;
        default:
            return state;
    }
}

//export these to be combined for store creation
export {
    studentReducer,
    campusReducer,
    singleCampusReducer,
    campusFormReducer,
    singleStudentReducer,
    studentFormReducer,
    isFetching,
};
