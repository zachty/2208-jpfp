//might be better to add the form state to this file
//keeping the state of each "page" separate
import axios from 'axios';

//ACTION CONSTS
const SET_STUDENTS = 'SET_STUDENTS';
const DELETE_STUDENT = 'DELETE_STUDENT';
const ORDER_STUDENTS = 'ORDER_STUDENTS';
const FILTER_STUDENTS = 'FILTER_STUDENTS';

//ACTION GENERATORS
const setStudents = studentList => ({
    type: SET_STUDENTS,
    studentList,
});

const resetStudents = deletedStudent => ({
    type: DELETE_STUDENT,
    deletedStudent,
});

export const orderStudents = order => ({
    type: ORDER_STUDENTS,
    order,
});

export const filterStudents = filter => ({
    type: FILTER_STUDENTS,
    filter,
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

//INITIAL STATE
const init = {
    students: [],
    filter: 'all',
    order: { by: 'lastName', ascending: true },
};

//REDUCER
export default (state = init, action) => {
    switch (action.type) {
        case SET_STUDENTS:
            return { ...state, students: action.studentList };
        case DELETE_STUDENT:
            return {
                ...state,
                students: state.students.filter(
                    student => student.id !== action.deletedStudent.id
                ),
            };
        case ORDER_STUDENTS:
            return {
                ...state,
                order: action.order,
            };
        case FILTER_STUDENTS:
            return { ...state, filter: action.filter };
        default:
            return state;
    }
};
