import React, { useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import NotFound from '../NotFound';
import { fetchData, gotData } from '../../store/reducers';
import {
    fetchCampus,
    unregisterStudent,
} from '../../store/reducers/campus/singleCampus';

export default function SingleCampus() {
    const dispatch = useDispatch();
    const params = useParams();
    const isFetching = useSelector(state => state.isFetching);

    useEffect(() => {
        dispatch(fetchData());
        dispatch(fetchCampus(params.id));
    }, []);

    useEffect(() => {
        dispatch(gotData);
    }, [campus]);

    const campus = useSelector(state => state.campus);
    const { name, address, description, students } = campus;

    //if no students, use this string
    const studentsString = `${
        students && students.length
    } students assigned to this campus!`;

    const handleUnregister = id => {
        dispatch(unregisterStudent(params.id, id));
    };

    return (
        <div>
            {isFetching && !campus.id ? (
                <p>Loading...</p>
            ) : !campus.id ? (
                <NotFound />
            ) : (
                <div>
                    <p>{address}</p>
                    <p>{description}</p>
                    <ul>
                        <h3>Enrollees:</h3>
                        {(students &&
                            students.length &&
                            students.map(student => (
                                <li key={student.id}>
                                    <NavLink to={`/students/${student.id}`}>
                                        {student.firstName} {student.lastName}
                                    </NavLink>
                                    <button
                                        onClick={() =>
                                            handleUnregister(student.id)
                                        }
                                    >
                                        Unregister
                                    </button>
                                </li>
                            ))) ||
                            studentsString}
                    </ul>
                </div>
            )}
        </div>
    );
}
