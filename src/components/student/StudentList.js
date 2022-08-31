import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import StudentForm from './StudentForm';
import {
    fetchStudents,
    deleteStudent,
} from '../../store/reducers/student/students';

export default function StudentList() {
    const dispatch = useDispatch();
    const students = useSelector(state => state.students);

    useEffect(() => {
        dispatch(fetchStudents());
    }, []);

    const handleDelete = e => {
        dispatch(deleteStudent(e.target.value));
    };

    return (
        <div>
            <div>
                {students.map(student => (
                    <h1 key={student.id}>
                        <NavLink to={`/students/${student.id}`}>
                            {student.firstName} {student.lastName}
                        </NavLink>
                        <button value={student.id} onClick={handleDelete}>
                            X
                        </button>
                    </h1>
                ))}
            </div>
            <div>
                <StudentForm />
            </div>
        </div>
    );
}
