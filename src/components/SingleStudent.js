import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStudent } from '../store/reducers/singleStudent';

export default function SingleStudent() {
    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        dispatch(fetchStudent(params.id));
    }, []);

    const student = useSelector(state => state.student);

    console.log(student);

    return (
        <div>
            <h1>StudentName</h1>
            <img src="" />
            <p>studentEmail</p>
            <p>studetnGPA</p>
            <p>studetnCampus</p>
        </div>
    );
}
