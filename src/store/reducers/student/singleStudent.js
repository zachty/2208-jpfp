import axios from 'axios';

//ACTION TYPE
const SET_STUDENT = 'SET_STUDENT';

//ACTION GENERATOR
const setStudent = student => ({
    type: SET_STUDENT,
    student,
});
//THUNK
export const fetchStudent = id => {
    return async dispatch => {
        try {
            const { data } = await axios.get(`/api/students/${id}`);
            dispatch(setStudent(data));
        } catch (err) {
            console.error(err);
        }
    };
};

//INITIAL STATE
const init = {};

//REDUCER
export default (state = init, action) => {
    switch (action.type) {
        case SET_STUDENT:
            return action.student;
        default:
            return state;
    }
};
