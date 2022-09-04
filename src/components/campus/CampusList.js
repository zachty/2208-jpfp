import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Outlet, useParams, useSearchParams } from 'react-router-dom';
import CampusForm from './CampusForm';
import { fetchData, gotData } from '../../store/reducers';
import {
    fetchCampuses,
    deleteCampus,
    orderCampuses,
    filterCampuses,
} from '../../store/reducers/campus/campuses';

export default function CampusList() {
    const dispatch = useDispatch();
    const params = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const isFetching = useSelector(state => state.isFetching);
    const { campuses, filter, order } = useSelector(state => state.campuses);

    //FILTER 'EM
    const filteredCampuses = campuses.filter(campus => {
        switch (filter) {
            case 'all':
                return campus;
            case 'noStudents':
                return !campus.students.length;
            case 'students':
                return campus.students.length;
            default:
                throw new Error('Incorrect filter');
        }
    });
    //ORDER 'EM
    const orderedCampuses = filteredCampuses.sort((a, b) => {
        //check if sorting by # of students
        const valA = Array.isArray(a[order.by])
            ? a[order.by].length
            : a[order.by].toUpperCase();
        const valB = Array.isArray(b[order.by])
            ? b[order.by].length
            : b[order.by].toUpperCase();
        return order.ascending
            ? valA < valB //ascending order - smallest to largest
                ? -1 //sort a before b
                : valB < valA
                ? 1 //sort a after b
                : 0 //sort in previous order
            : //descending order - largest to smallest
            valB < valA
            ? -1
            : valA < valB
            ? 1
            : 0;
    });
    //STICK 'EM IN A STEW (10 at a time)
    const index = (searchParams.get('page') - 1) * 10;
    const pagedCampuses = orderedCampuses.slice(index, index + 10);

    useEffect(() => {
        dispatch(gotData());
    }, [campuses]);

    useEffect(() => {
        dispatch(fetchData());
        dispatch(fetchCampuses());
        setSearchParams({ page: 1 });
    }, []);

    function handleClick(e) {
        const newOrder =
            e.target.value === order.by
                ? { by: order.by, ascending: !order.ascending }
                : { by: e.target.value, ascending: true };

        dispatch(orderCampuses(newOrder));
    }

    function handlePage(i) {
        const page = Number(searchParams.get('page')) + i;
        if (page > filteredCampuses.length / 10 + 1 || page < 1) return;
        setSearchParams({ page });
    }

    return (
        <div>
            <div>
                <div>
                    Order:
                    <button onClick={handleClick} value="students">
                        # of Students
                    </button>
                    <button onClick={handleClick} value="name">
                        Name
                    </button>
                </div>
                <div>
                    Filter:{' '}
                    <select
                        onChange={e => dispatch(filterCampuses(e.target.value))}
                    >
                        <option value="all">ALL</option>
                        <option value="students">HAS STUDENTS</option>
                        <option value="noStudents">NO STUDENTS</option>
                    </select>
                </div>
            </div>
            <div>
                {isFetching && !pagedCampuses.length ? (
                    <p>Loading...</p>
                ) : (
                    (pagedCampuses.length &&
                        pagedCampuses.map(campus => (
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
                                {/* TODO: replace with css */}
                                <img src={campus.imageUrl} width="150px" />
                                {Number(params.id) === campus.id && <Outlet />}
                            </div>
                        ))) || <p>No Campuses to display.</p>
                )}
            </div>
            <div>
                <CampusForm />
            </div>
            <div>
                <button onClick={() => handlePage(-1)}>{'<'}</button>
                Page {searchParams.get('page')} /{' '}
                {Math.ceil(filteredCampuses.length / 10)}
                <button onClick={() => handlePage(1)}>{'>'}</button>
            </div>
        </div>
    );
}
