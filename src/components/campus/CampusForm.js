import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCampuses } from '../../store/reducers/campus/campuses';
import {
    createCampus,
    changeCampusForm,
} from '../../store/reducers/campus/campusForm';

export default function CampusForm() {
    const dispatch = useDispatch();
    const { name, address } = useSelector(state => state.campusForm);

    const handleChange = event => {
        dispatch(changeCampusForm(event.target.name, event.target.value));
    };

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(createCampus({ name, address }));
        dispatch(fetchCampuses());
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input name="name" value={name} onChange={handleChange} />
                </label>
                <label>
                    Address:
                    <input
                        name="address"
                        value={address}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
