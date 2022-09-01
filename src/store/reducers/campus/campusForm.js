import axios from 'axios';

//ACTION TYPE
const SUBMIT_CAMPUS = 'SUBMIT_CAMPUS';
const UPDATE_CAMPUS = 'UPDATE_CAMPUS';
const CHANGE_CAMPUS_FORM = 'CHANGE_CAMPUS_FORM';
const CAMPUS_ERROR = 'CAMPUS_ERROR';

//ACTION GENERATOR
const submitCampus = () => ({
    type: SUBMIT_CAMPUS,
});

const updatedCampus = updated => ({
    type: UPDATE_CAMPUS,
    updated,
});

export const changeCampusForm = form => ({
    type: CHANGE_CAMPUS_FORM,
    form,
});

const postError = err => ({
    type: CAMPUS_ERROR,
    err,
});

//THUNKS
export const createCampus = campus => {
    return async dispatch => {
        try {
            await axios.post('/api/campuses', campus);
            dispatch(submitCampus());
        } catch (err) {
            console.error(err);
            dispatch(postError(err));
        }
    };
};

export const updateCampus = (id, campus) => {
    return async dispatch => {
        try {
            const { data } = await axios.put(`/api/campuses/${id}`, campus);
            dispatch(updatedCampus(data));
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
        case UPDATE_CAMPUS:
            return action.updated;
        case CHANGE_CAMPUS_FORM:
            return Object.keys(action.form).length ? action.form : init;
        case CAMPUS_ERROR:
            return { ...state, error: action.err };
        default:
            return state;
    }
};
