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
    //for changing form info
    const form = useSelector(state => state.campusForm);
    //for filling in/updating form info
    const campus = useSelector(state => state.campus);

    //sets initial input
    useEffect(() => {
        if (params.id && campus.id) {
            dispatch(changeCampusForm(campus));
        } else dispatch(changeCampusForm({}));
    }, [campus]);

    const handleChange = event => {
        //this name is from the form>input name
        const { name, value } = event.target;
        dispatch(changeCampusForm({ ...form, [name]: value }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (params.id) {
            //if updating
            //make this async. Same issue with students, works the first few times then it runs SET, CHANGE, UPDATE for some reason
            (async () => {
                await dispatch(updateCampus(params.id, form));
                await dispatch(fetchCampus(params.id));
            })();
        } else {
            //if making a new campus
            dispatch(createCampus(form));
            dispatch(fetchCampuses());
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                />
                <input
                    placeholder="Address"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
