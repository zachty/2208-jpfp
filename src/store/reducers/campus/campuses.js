import axios from 'axios';

//ACTION CONSTS
const SET_CAMPUSES = 'SET_CAMPUSES';

//ACTION GENERATORS
const setCampuses = campusList => ({
    type: SET_CAMPUSES,
    campusList,
});

//THUNKS
export const fetchCampuses = () => {
    return async dispatch => {
        try {
            const { data } = await axios.get('/api/campuses');
            dispatch(setCampuses(data));
        } catch (err) {
            console.error(err);
        }
    };
};

//REDUCER
export default (state = [], action) => {
    switch (action.type) {
        case SET_CAMPUSES:
            return action.campusList;
        default:
            return state;
    }
};
