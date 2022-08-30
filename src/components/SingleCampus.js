import React, { useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCampus } from '../store/reducers/singleCampus';

export default function SingleCampus() {
    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        dispatch(fetchCampus(params.id));
    }, []);

    const { campus, students } = useSelector(state => state.campus);
    const { name, imageUrl, address, description } = campus;

    //if no students, use this string
    const studentsString = `${students.length} students assigned to this campus!`;

    return (
        <div>
            <h1>{name}</h1>
            <img src={imageUrl} />
            <p>{address}</p>
            <p>{description}</p>
            <ul>
                <h3>Enrollees:</h3>
                {(students.length &&
                    students.map(student => (
                        <li key={student.id}>
                            <NavLink to={`/students/${student.id}`}>
                                {student.firstName} {student.lastName}
                            </NavLink>
                        </li>
                    ))) ||
                    studentsString}
            </ul>
        </div>
    );
}
