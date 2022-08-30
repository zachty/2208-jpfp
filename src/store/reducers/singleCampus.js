import axios from 'axios';

//ACTION TYPE
const SET_CAMPUS = 'SET_CAMPUS';

//ACTION GENERATOR
const setCampus = campus => ({
    type: SET_CAMPUS,
    campus,
});
//THUNK
export const fetchCampus = id => {
    return async dispatch => {
        try {
            const { data } = await axios.get(`/api/campuses/${id}`);
            dispatch(setCampus(data));
        } catch (err) {
            console.error(err);
        }
    };
};

//INITIAL STATE
const init = { campus: {}, students: [] };

//REDUCER
export default (state = init, action) => {
    switch (action.type) {
        case SET_CAMPUS:
            return action.campus;
        default:
            return state;
    }
};
