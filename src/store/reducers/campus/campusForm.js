import axios from 'axios';

//ACTION TYPE
const SUBMIT_CAMPUS = 'SUBMIT_CAMPUS';
const CHANGE_CAMPUS_FORM = 'CHANGE_CAMPUS_FORM';
const ERROR = 'ERROR';

//ACTION GENERATOR
const submitCampus = () => ({
    type: SUBMIT_CAMPUS,
});

export const changeCampusForm = (target, value) => ({
    type: CHANGE_CAMPUS_FORM,
    target,
    value,
});

const postError = err => ({
    type: ERROR,
    err,
});

//THUNKS
export const createCampus = campus => {
    return async dispatch => {
        try {
            //TODO: figure out if I need this
            const data = await axios.post('/api/campuses', campus);
            dispatch(submitCampus());
        } catch (err) {
            console.error(err);
            dispatch(postError(err));
        }
    };
};

//INITIAL STATE
const init = {
    name: '',
    address: '',
};

//REDUCER
export default (state = init, action) => {
    switch (action.type) {
        case SUBMIT_CAMPUS:
            return init;
        case CHANGE_CAMPUS_FORM:
            return { ...state, [action.target]: action.value };
        case ERROR:
            return { state, error: action.err.message };
        default:
            return state;
    }
};
