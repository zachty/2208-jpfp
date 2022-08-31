import React, { useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import StudentForm from './StudentForm';
import { fetchStudent } from '../../store/reducers/student/singleStudent';

export default function SingleStudent() {
    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        dispatch(fetchStudent(params.id));
    }, []);

    //deconstruct student and campus from store
    const { student, campus } = useSelector(state => state.student);
    //prevent typeError for race conditions
    const { firstName, lastName, imageUrl, email, gpa } = student;
    //grab campus or switch to message if student doesnt have one
    const noCampus = 'This student does not have a campus!';

    return (
        <div>
            <div>
                <h1>
                    {firstName} {lastName}
                </h1>
                <img src={imageUrl} />
                <p>{email}</p>
                <p>{gpa}</p>
                {(campus && (
                    <NavLink to={`/campuses/${campus.id}`}>
                        {campus.name}
                    </NavLink>
                )) ||
                    noCampus}
            </div>
            <StudentForm />
        </div>
    );
}
