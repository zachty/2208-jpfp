//might be able to combine the two forms reducers, lots of repeated code maybe look later
import axios from 'axios';

//ACTION TYPES
const SUBMIT_STUDENT = 'SUBMIT_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';
const CHANGE_STUDENT_FORM = 'CHANGE_STUDENT_FORM';
const STUDENT_ERROR = 'STUDENT_ERROR';

//ACTION GENERATORS
const submitStudent = () => ({
    type: SUBMIT_STUDENT,
});

const updatedStudent = updatedStudent => ({
    type: UPDATE_STUDENT,
    updatedStudent,
});

export const changeStudentForm = form => ({
    type: CHANGE_STUDENT_FORM,
    form,
});

const postError = err => ({
    type: STUDENT_ERROR,
    err,
});

//THUNKS
export const createStudent = student => {
    return async dispatch => {
        try {
            await axios.post('/api/students', student);
            dispatch(submitStudent());
        } catch (err) {
            console.error(err);
            dispatch(postError(err));
        }
    };
};

export const updateStudent = (id, student) => {
    return async dispatch => {
        try {
            const { data } = await axios.put(`/api/students/${id}`, student);
            dispatch(updatedStudent(data));
        } catch (err) {
            console.error(err);
            dispatch(postError(err));
        }
    };
};

//INITIAL STATE
const init = {
    firstName: '',
    lastName: '',
    email: '',
};

//REDUCER
export default (state = init, action) => {
    switch (action.type) {
        case SUBMIT_STUDENT:
            return init;
        case UPDATE_STUDENT:
            return action.updatedStudent;
        case CHANGE_STUDENT_FORM:
            return Object.keys(action.form).length ? action.form : init;
        case STUDENT_ERROR:
            return { ...state, error: action.err };
        default:
            return state;
    }
};
