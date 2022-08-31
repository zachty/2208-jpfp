import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import CampusForm from './CampusForm';
import {
    fetchCampuses,
    deleteCampus,
} from '../../store/reducers/campus/campuses';

export default function CampusList() {
    const dispatch = useDispatch();
    const campuses = useSelector(state => state.campuses);

    useEffect(() => {
        dispatch(fetchCampuses());
    }, []);

    const handleDelete = e => {
        dispatch(deleteCampus(e.target.value));
    };

    return (
        <div>
            <div>
                {campuses.map(campus => (
                    <div key={campus.id}>
                        <h1>
                            <NavLink to={`/campuses/${campus.id}`}>
                                {campus.name}
                            </NavLink>
                            <button value={campus.id} onClick={handleDelete}>
                                X
                            </button>
                        </h1>
                        <img src={campus.imageUrl} width="150px" />
                    </div>
                ))}
            </div>
            <div>
                <CampusForm />
            </div>
        </div>
    );
}
