import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCampuses } from '../store/reducers/campuses';
import { NavLink } from 'react-router-dom';

export default function CampusList() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCampuses());
    }, []);

    const campuses = useSelector(state => state.campuses);

    return (
        <div>
            {campuses.map(campus => (
                <div key={campus.id}>
                    <NavLink to={`/campuses/${campus.id}`}>
                        <h1>{campus.name}</h1>
                    </NavLink>
                    <img src={campus.imageUrl} />
                </div>
            ))}
        </div>
    );
}
