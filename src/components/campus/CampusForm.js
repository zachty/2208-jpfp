import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCampuses } from '../../store/reducers/campus/campuses';
import { fetchCampus } from '../../store/reducers/campus/singleCampus';
import {
    createCampus,
    changeCampusForm,
    updateCampus,
} from '../../store/reducers/campus/campusForm';

export default function CampusForm() {
    const dispatch = useDispatch();
    const params = useParams();
    //for changing form values
    const form = useSelector(state => state.campusForm);
    const { name, address, error } = form;

    //sets initial input, whether updating or creating
    const campus = useSelector(state => state.campus);
    useEffect(() => {
        if (params.id && campus.id) {
            dispatch(changeCampusForm(campus));
        } else dispatch(changeCampusForm({}));
    }, [campus]);

    const handleChange = event => {
        //this name is from the form > input "name" attribute
        const { name, value } = event.target;
        dispatch(changeCampusForm({ ...form, [name]: value }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        (async () => {
            //make this async. Same issue with students, works the first few times then it runs SET, CHANGE, UPDATE for some reason
            if (params.id) {
                //if updating
                await dispatch(updateCampus(params.id, form));
                await dispatch(fetchCampus(params.id));
            } else {
                //if making a new campus
                await dispatch(createCampus(form));
                await dispatch(fetchCampuses());
            }
        })();
    };

    return (
        <div>
            {error && error.response.data === 'Validation error' ? (
                <p>Campus already exists! Try something else.</p>
            ) : (
                <></>
            )}
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        placeholder="Name"
                        name="name"
                        value={name}
                        onChange={handleChange}
                    />
                    {error && !name && <p>Field cannot be blank!</p>}
                </div>
                <div>
                    <input
                        placeholder="Address"
                        name="address"
                        value={address}
                        onChange={handleChange}
                    />
                    {error && !address && <p>Field cannot be blank!</p>}
                </div>
                <button type="submit">{params.id ? 'Update' : 'Create'}</button>
            </form>
        </div>
    );
}
