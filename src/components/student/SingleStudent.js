import React, { useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import NotFound from '../NotFound';
import { fetchData, gotData } from '../../store/reducers';
import { fetchStudent } from '../../store/reducers/student/singleStudent';

export default function SingleStudent() {
    const dispatch = useDispatch();
    const isFetching = useSelector(state => state.isFetching);
    const params = useParams();

    //deconstruct student and campus from store
    const student = useSelector(state => state.student);
    const { imageUrl, email, gpa, campus } = student;
    //grab campus or switch to message if student doesnt have one
    const noCampus = 'This student does not have a campus!';

    useEffect(() => {
        console.log('🎉🎉🎉🎉inside got data🎉🎉🎉🎉');
        dispatch(gotData());
    }, [student]);

    useEffect(() => {
        dispatch(fetchData());
        dispatch(fetchStudent(params.id));
    }, []);

    return (
        <>
            {isFetching ? (
                <p>Loading...</p>
            ) : !student.id ? (
                <NotFound />
            ) : (
                <div>
                    <div>
                        {/* TODO: replace with css */}
                        <img src={imageUrl} width="200px" />
                        <p>{email}</p>
                        <p>{gpa || 'No GPA yet.'}</p>
                        {(campus && (
                            <NavLink to={`/campuses/${campus.id}`}>
                                {campus.name}
                            </NavLink>
                        )) ||
                            noCampus}
                    </div>
                </div>
            )}
        </>
    );
}
