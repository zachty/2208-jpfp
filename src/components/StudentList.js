import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStudents } from '../store/reducers/students';

export default function StudentList() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchStudents());
    }, []);

    const students = useSelector(state => state.students);

    return (
        <div>
            {students.map(student => (
                <h1 key={student.id}>
                    {student.firstName} {student.lastName}
                </h1>
            ))}
        </div>
    );
}
