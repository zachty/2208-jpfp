//might be able to combine the two forms reducers, lots of repeated code maybe look later
import axios from 'axios';

//ACTION TYPES
const SUBMIT_STUDENT = 'SUBMIT_STUDENT';
const CHANGE_FORM = 'CHANGE_FORM';
const ERROR = 'ERROR';

//ACTION GENERATORS
const submitStudent = () => ({
    type: SUBMIT_STUDENT,
});

export const changeStudentForm = (target, value) => ({
    type: CHANGE_FORM,
    target,
    value,
});

const postError = err => ({
    type: ERROR,
    err,
});

//THUNKS
export const createStudent = student => {
    return async dispatch => {
        try {
            //TODO: figure out if I need this data
            const data = await axios.post('/api/students', student);
            dispatch(submitStudent());
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
        case CHANGE_FORM:
            return { ...state, [action.target]: action.value };
        case ERROR:
            return { ...state, error: action.err.response.data };
        default:
            return state;
    }
};
