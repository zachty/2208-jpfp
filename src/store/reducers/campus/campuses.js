import axios from 'axios';

//ACTION CONSTS
const SET_CAMPUSES = 'SET_CAMPUSES';
const DELETE_CAMPUS = 'DELETE_CAMPUS';

//ACTION GENERATORS
const setCampuses = campusList => ({
    type: SET_CAMPUSES,
    campusList,
});

const resetCampuses = deletedCampus => ({
    type: DELETE_CAMPUS,
    deletedCampus,
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

export const deleteCampus = id => {
    return async dispatch => {
        try {
            const { data } = await axios.delete(`/api/campuses/${id}`);
            dispatch(resetCampuses(data));
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
        case DELETE_CAMPUS:
            return state.filter(campus => {
                return campus.id !== action.deletedCampus.id;
            });
        default:
            return state;
    }
};
