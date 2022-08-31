import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import AddStudent from './AddStudent';
import { fetchStudents } from '../../store/reducers/student/students';

export default function StudentList() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchStudents());
    }, []);

    const students = useSelector(state => state.students);

    return (
        <div>
            <div>
                {students.map(student => (
                    <h1 key={student.id}>
                        <NavLink to={`/students/${student.id}`}>
                            {student.firstName} {student.lastName}
                        </NavLink>
                    </h1>
                ))}
            </div>
            <div>
                <AddStudent />
            </div>
        </div>
    );
}
