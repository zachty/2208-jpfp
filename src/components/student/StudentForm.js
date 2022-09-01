import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchStudents } from '../../store/reducers/student/students';
import { fetchStudent } from '../../store/reducers/student/singleStudent';
import {
    createStudent,
    changeStudentForm,
    updateStudent,
} from '../../store/reducers/student/studentForm';

export default function StudentForm() {
    const dispatch = useDispatch();
    //get params if they exist
    const params = useParams();

    //get the form data
    const form = useSelector(state => state.studentForm);
    const { firstName, lastName, email } = form;

    //if editing an entry
    const student = useSelector(state => state.student);
    useEffect(() => {
        if (student.id && params.id) {
            dispatch(changeStudentForm(student));
        } else dispatch(changeStudentForm({}));
    }, [student]);

    const handleChange = e => {
        const { name, value } = e.target;
        dispatch(changeStudentForm({ ...form, [name]: value }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (params.id) {
            //edit single student
            //making this async await is a hotfix for things running out of order
            //TODO: decide whether to switch the async parts into the thunk
            (async () => {
                await dispatch(updateStudent(params.id, form));
                await dispatch(fetchStudent(params.id));
            })();
        } else {
            //create new student
            dispatch(createStudent(form));
            dispatch(fetchStudents());
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    name="firstName"
                    placeholder="First Name"
                    value={firstName}
                    onChange={handleChange}
                />
                <input
                    name="lastName"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={handleChange}
                />
                <input
                    name="email"
                    placeholder="email"
                    value={email}
                    onChange={handleChange}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}