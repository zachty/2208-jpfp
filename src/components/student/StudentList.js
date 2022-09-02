import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import StudentForm from './StudentForm';
import { fetchData, gotData } from '../../store/reducers';
import {
    fetchStudents,
    deleteStudent,
    orderStudents,
    filterStudents,
} from '../../store/reducers/student/students';

export default function StudentList() {
    const dispatch = useDispatch();
    const params = useParams();
    const isFetching = useSelector(state => state.isFetching);
    const { students, filter, order } = useSelector(state => state.students);
    //would like to be able to do this in the reducer but not sure how
    //FILTER 'EM
    const filteredStudents = students.filter(student => {
        switch (filter) {
            case 'all':
                return student;
            case 'unregistered':
                return !student.campusId;
            case 'registered':
                return student.campusId;
            default:
                throw new Error('Incorrect filter');
        }
    });
    //ORDER 'EM
    //TODO: fix bug, sorts numbers highest to lowest, names from z to a when asc is true
    //sorts numbers incorrectly? when ascending = true, highest number is on top
    const orderedStudents = filteredStudents.sort((a, b) => {
        //1 sort a after b
        //-1 sort a before b
        //0 sort in previous order
        const valA = a[order.by].toUpperCase();
        const valB = b[order.by].toUpperCase();
        return order.ascending
            ? valA < valB //ascending order - smallest to largest
                ? -1
                : valB < valA
                ? 1
                : 0
            : //descending order - largest to smallest
            valB < valA
            ? -1
            : valA < valB
            ? 1
            : 0;
    });
    //STICK 'EM IN A STEW

    //get data when page loads
    useEffect(() => {
        dispatch(fetchData());
        dispatch(fetchStudents());
    }, []);

    //set isFetching to false every time students list changes
    useEffect(() => {
        dispatch(gotData);
    }, [students]);

    function handleClick(e) {
        const newOrder =
            e.target.value === order.by
                ? { by: order.by, ascending: !order.ascending }
                : { by: e.target.value, ascending: true };

        dispatch(orderStudents(newOrder));
    }

    return (
        <div>
            <div>
                <div>
                    Order:
                    <button onClick={handleClick} value="lastName">
                        Last name
                    </button>
                    <button onClick={handleClick} value="gpa">
                        GPA
                    </button>
                </div>
                <div>
                    Filter:{' '}
                    <select
                        onChange={e => dispatch(filterStudents(e.target.value))}
                    >
                        <option value="all">ALL</option>
                        <option value="registered">REGISTERED</option>
                        <option value="unregistered">UNREGISTERED</option>
                    </select>
                </div>
            </div>
            <div>
                {isFetching && !orderedStudents.length ? (
                    <p>Loading...</p>
                ) : (
                    (orderedStudents.length &&
                        orderedStudents.map(student => (
                            <div key={student.id}>
                                <h2>
                                    <NavLink to={`/students/${student.id}`}>
                                        {student.firstName} {student.lastName}
                                    </NavLink>
                                    <button
                                        onClick={() =>
                                            dispatch(deleteStudent(student.id))
                                        }
                                    >
                                        X
                                    </button>
                                </h2>
                                {Number(params.id) === student.id && <Outlet />}
                            </div>
                        ))) || <p>No students to display.</p>
                )}
            </div>
            <div>
                <StudentForm />
            </div>
        </div>
    );
}
