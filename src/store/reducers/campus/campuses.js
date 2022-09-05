import axios from 'axios';

//ACTION CONSTS
const SET_CAMPUSES = 'SET_CAMPUSES';
const DELETE_CAMPUS = 'DELETE_CAMPUS';
const ORDER_CAMPUSES = 'ORDER_CAMPUSES';
const FILTER_CAMPUSES = 'FILTER_CAMPUSES';

//ACTION GENERATORS
const setCampuses = campusList => ({
    type: SET_CAMPUSES,
    campusList,
});

const resetCampuses = deletedCampus => ({
    type: DELETE_CAMPUS,
    deletedCampus,
});

export const orderCampuses = order => ({
    type: ORDER_CAMPUSES,
    order,
});

export const filterCampuses = filter => ({
    type: FILTER_CAMPUSES,
    filter,
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

//INITIAL STATE
const init = {
    campuses: [],
    filter: 'all',
    order: { by: 'name', ascending: true },
};

//REDUCER
export default (state = init, action) => {
    switch (action.type) {
        case SET_CAMPUSES:
            return { ...state, campuses: action.campusList };
        case DELETE_CAMPUS:
            return {
                ...state,
                campuses: state.campuses.filter(campus => {
                    return campus.id !== action.deletedCampus.id;
                }),
            };
        case ORDER_CAMPUSES:
            return {
                ...state,
                order: action.order,
            };
        case FILTER_CAMPUSES:
            return { ...state, filter: action.filter };
        default:
            return state;
    }
};
