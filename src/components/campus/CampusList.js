import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCampuses } from '../../store/reducers/campus/campuses';
import { NavLink } from 'react-router-dom';
import AddCampus from './AddCampus';

export default function CampusList() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCampuses());
    }, []);

    const campuses = useSelector(state => state.campuses);

    return (
        <div>
            <div>
                {campuses.map(campus => (
                    <div key={campus.id}>
                        <NavLink to={`/campuses/${campus.id}`}>
                            <h1>{campus.name}</h1>
                        </NavLink>
                        <img src={campus.imageUrl} width="150px" />
                    </div>
                ))}
            </div>
            <div>
                <AddCampus />
            </div>
        </div>
    );
}
