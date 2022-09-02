import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import CampusForm from './CampusForm';
import { fetchData, gotData } from '../../store/reducers';
import {
    fetchCampuses,
    deleteCampus,
} from '../../store/reducers/campus/campuses';

export default function CampusList() {
    const dispatch = useDispatch();
    const campuses = useSelector(state => state.campuses);
    const isFetching = useSelector(state => state.isFetching);
    const params = useParams();

    useEffect(() => {
        dispatch(fetchData());
        dispatch(fetchCampuses());
    }, []);

    useEffect(() => {
        dispatch(gotData);
    }, [campuses]);

    return (
        <div>
            <div>
                {isFetching && !campuses.length ? (
                    <p>Loading...</p>
                ) : (
                    (campuses.length &&
                        campuses.map(campus => (
                            <div key={campus.id}>
                                <h2>
                                    <NavLink
                                        to={
                                            '/campuses' +
                                            (Number(params.id) === campus.id
                                                ? '/'
                                                : `/${campus.id}`)
                                        }
                                    >
                                        {campus.name}
                                    </NavLink>
                                    <button
                                        onClick={() =>
                                            dispatch(deleteCampus(campus.id))
                                        }
                                    >
                                        X
                                    </button>
                                </h2>
                                <img src={campus.imageUrl} width="150px" />
                                {Number(params.id) === campus.id && <Outlet />}
                            </div>
                        ))) || <p>No Campuses to display.</p>
                )}
            </div>
            <div>
                <CampusForm />
            </div>
        </div>
    );
}
