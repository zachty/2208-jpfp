import axios from 'axios';

//ACTION CONSTS
const SET_STUDENTS = 'SET_STUDENTS';

//ACTION GENERATORS
const setStudents = studentList => ({
    type: SET_STUDENTS,
    studentList,
});

//THUNKS
export const fetchStudents = () => {
    return async dispatch => {
        try {
            const { data } = await axios.get('/api/students');
            dispatch(setStudents(data));
        } catch (err) {
            console.error(err);
        }
    };
};

//REDUCER
export default (state = [], action) => {
    switch (action.type) {
        case SET_STUDENTS:
            return action.studentList;
        default:
            return state;
    }
};
