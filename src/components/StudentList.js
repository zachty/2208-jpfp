import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStudents } from '../store/reducers/students';

export default function StudentList() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchStudents());
    }, []);

    const students = useSelector(state => state);
    console.log(students);

    return (
        <div>
            <h1>StudentName</h1>
            <img src="https://riverlegacy.org/wp-content/uploads/2021/07/blank-profile-photo.jpeg" />
        </div>
    );
}
