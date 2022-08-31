import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStudents } from '../../store/reducers/student/students';
import {
    createStudent,
    changeStudentForm,
} from '../../store/reducers/student/studentForm';

export default function AddStudent() {
    const dispatch = useDispatch();

    const { firstName, lastName, email } = useSelector(
        state => state.studentForm
    );

    const handleChange = e => {
        const { name, value } = e.target;
        dispatch(changeStudentForm(name, value));
    };

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(createStudent({ firstName, lastName, email }));
        dispatch(fetchStudents());
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
