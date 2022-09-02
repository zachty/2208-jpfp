import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import StudentForm from './StudentForm';
import {
    fetchStudents,
    deleteStudent,
} from '../../store/reducers/student/students';

export default function StudentList() {
    const dispatch = useDispatch();
    const students = useSelector(state => state.students);
    const params = useParams();

    useEffect(() => {
        dispatch(fetchStudents());
    }, []);

    const handleDelete = e => {
        dispatch(deleteStudent(e.target.value));
    };

    return (
        <div>
            <div>
                {(students.length &&
                    students.map(student => (
                        <div key={student.id}>
                            <h2>
                                <NavLink to={`/students/${student.id}`}>
                                    {student.firstName} {student.lastName}
                                </NavLink>
                                <button
                                    value={student.id}
                                    onClick={handleDelete}
                                >
                                    X
                                </button>
                            </h2>
                            {Number(params.id) === student.id && <Outlet />}
                        </div>
                    ))) || <p>No students to display.</p>}
            </div>
            <div>
                <StudentForm />
            </div>
        </div>
    );
}
