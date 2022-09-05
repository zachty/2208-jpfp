import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import StudentForm from './StudentForm';
import { NavLink, Outlet, useParams, useSearchParams } from 'react-router-dom';
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
    // const [searchParams, setSearchParams] = useSearchParams();
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
            case 'gpa2':
                return student.gpa > 2;
            case 'noGPA':
                return !student.gpa;
            default:
                throw new Error('Incorrect filter');
        }
    });
    //ORDER 'EM
    const orderedStudents = filteredStudents.sort((a, b) => {
        const valA = a[order.by] && a[order.by].toUpperCase();
        const valB = b[order.by] && b[order.by].toUpperCase();
        return order.ascending
            ? valA < valB //ascending order - smallest to largest
                ? -1 //sort a before b
                : valB < valA
                ? 1 //sort a after b
                : 0 //sort in previous order
            : //descending order - largest to smallest (for me pls dont make fun about not remembering asc vs des)
            valB < valA
            ? -1
            : valA < valB
            ? 1
            : 0;
    });
    //STICK 'EM IN A STEW (10 at a time)
    // const index = (searchParams.get('page') - 1) * 10;
    // const pagedStudents = orderedStudents.slice(index, index + 10);

    //set isFetching to false every time students list changes
    useEffect(() => {
        dispatch(gotData());
    }, [students]);
    //get data when page loads
    useEffect(() => {
        dispatch(fetchData());
        dispatch(fetchStudents());
        // setSearchParams({ page: 1 });
    }, []);

    function handleClick(e) {
        const newOrder =
            e.target.value === order.by
                ? { by: order.by, ascending: !order.ascending }
                : { by: e.target.value, ascending: true };

        dispatch(orderStudents(newOrder));
    }

    // function handlePage(i) {
    //     const page = Number(searchParams.get('page')) + i;
    //     if (page > filteredStudents.length / 10 + 1 || page < 1) return;
    //     setSearchParams({ page });
    // }

    //TODO: break out filter/order into components
    return (
        <div>
            <div className="filter-order">
                <div>
                    Order:{' '}
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
                        <option value="gpa2">GPA {'>'} 2</option>
                        <option value="noGPA">NO GPA</option>
                    </select>
                </div>
            </div>
            <div className="main">
                <div className="column content">
                    {isFetching && !orderedStudents.length ? (
                        <p>Loading...</p>
                    ) : (
                        (orderedStudents.length &&
                            orderedStudents.map(student => (
                                <div key={student.id}>
                                    <div className="single">
                                        <NavLink
                                            to={
                                                '/students' +
                                                (Number(params.id) ===
                                                student.id
                                                    ? '/'
                                                    : `/${student.id}`)
                                            }
                                        >
                                            <h2>
                                                {student.firstName}{' '}
                                                {student.lastName}
                                            </h2>
                                        </NavLink>
                                        <button
                                            className="delete-btn"
                                            onClick={() =>
                                                dispatch(
                                                    deleteStudent(student.id)
                                                )
                                            }
                                        >
                                            X
                                        </button>
                                    </div>
                                    {Number(params.id) === student.id && (
                                        <Outlet />
                                    )}
                                </div>
                            ))) || <p>No students to display.</p>
                    )}
                </div>
                <div className="column form">
                    <StudentForm />
                </div>
            </div>
            {/* <div>
                <button onClick={() => handlePage(-1)}>{'<'}</button>
                Page {searchParams.get('page')} /{' '}
                {Math.ceil(filteredStudents.length / 10)}
                <button onClick={() => handlePage(1)}>{'>'}</button>
            </div> */}
        </div>
    );
}
