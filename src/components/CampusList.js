import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCampuses } from '../store/reducers/campuses';

export default function CampusList() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCampuses());
    }, []);

    const campuses = useSelector(state => state);
    console.log(campuses);

    return (
        <div>
            <h1>CampusTitle1</h1>
            <img src="https://static.vecteezy.com/system/resources/previews/000/353/557/original/building-vector-icon.jpg" />
        </div>
    );
}
