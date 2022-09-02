import React, { useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import NotFound from '../NotFound';
import {
    fetchCampus,
    unregisterStudent,
} from '../../store/reducers/campus/singleCampus';
import CampusForm from './CampusForm';

export default function SingleCampus() {
    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        dispatch(fetchCampus(params.id));
    }, []);

    const campus = useSelector(state => state.campus);
    const { name, imageUrl, address, description, students } = campus;

    //if no students, use this string
    const studentsString = `${
        students && students.length
    } students assigned to this campus!`;

    const handleUnregister = id => {
        dispatch(unregisterStudent(params.id, id));
    };

    return (
        <div>
            {!campus.id ? (
                <NotFound />
            ) : (
                <div>
                    <h1>{name}</h1>
                    <img src={imageUrl} />
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
                    <div>
                        <CampusForm />
                    </div>
                </div>
            )}
        </div>
    );
}
