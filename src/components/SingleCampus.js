import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCampus } from '../store/reducers/singleCampus';

export default function SingleCampus() {
    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        dispatch(fetchCampus(params.id));
    }, []);

    const campus = useSelector(state => state.campus);

    console.log(campus);

    return (
        <div>
            <h1>Campus_Name</h1>
            {/* <img src="" /> */}
            <p>Campus_address</p>
            <p>campus_description</p>
            <ul>
                <li>Student 1</li>
                <li>Student 2</li>
            </ul>
        </div>
    );
}
