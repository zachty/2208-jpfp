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
    const { firstName, lastName, email, error } = form;
    const message = (error && error.response.data) || '';
    //short circuit ^^ so we can always use string methods

    //if editing an entry
    const student = useSelector(state => state.student);
    useEffect(() => {
        if (student.id && params.id) {
            if (error) student.error = error; //persist error
            dispatch(changeStudentForm(student));
        } else dispatch(changeStudentForm({}));
    }, [student, params]);

    const handleChange = event => {
        const { name, value } = event.target;
        dispatch(changeStudentForm({ ...form, [name]: value }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        (async () => {
            //making this async await is a hotfix for things running out of order
            if (params.id) {
                //edit single student
                await dispatch(updateStudent(params.id, form));
                await dispatch(fetchStudent(params.id));
            } else {
                //create new student
                await dispatch(createStudent(form));
                await dispatch(fetchStudents());
            }
        })();
    };

    return (
        <div>
            {message === 'Validation error' ? (
                <p>Student already exists! Try a different email.</p>
            ) : (
                <></>
            )}
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        name="firstName"
                        placeholder="First Name"
                        value={firstName}
                        onChange={handleChange}
                    />
                    {message.includes('firstName') &&
                        (!firstName || params.id) && (
                            <p>Field cannot be blank!</p>
                        )}
                </div>
                <div>
                    <input
                        name="lastName"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={handleChange}
                    />
                    {message.includes('lastName') &&
                        (!lastName || params.id) && (
                            <p>Field cannot be blank!</p>
                        )}
                </div>
                <div>
                    <input
                        name="email"
                        placeholder="email"
                        value={email}
                        onChange={handleChange}
                    />
                    {message.includes('notEmpty on email')
                        ? (!email || params.id) && <p>Field cannot be blank!</p>
                        : message.includes('isEmail') && <p>Invalid e-mail!</p>}
                </div>
                <button type="submit">{params.id ? 'Update' : 'Create'}</button>
            </form>
        </div>
    );
}
