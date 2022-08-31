//might be better to add the form state to this file
//keeping the state of each "page" separate
import axios from 'axios';

//ACTION CONSTS
const SET_STUDENTS = 'SET_STUDENTS';
const DELETE_STUDENT = 'DELETE_STUDENT';

//ACTION GENERATORS
const setStudents = studentList => ({
    type: SET_STUDENTS,
    studentList,
});

const resetStudents = deletedStudent => ({
    type: DELETE_STUDENT,
    deletedStudent,
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

export const deleteStudent = id => {
    return async dispatch => {
        try {
            const { data } = await axios.delete(`/api/students/${id}`);
            dispatch(resetStudents(data));
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
        case DELETE_STUDENT:
            return state.filter(
                student => student.id !== action.deletedStudent.id
            );
        default:
            return state;
    }
};
