import { expect } from 'chai';
import { createStore, applyMiddleware } from 'redux';
import enforceImmutableState from 'redux-immutable-state-invariant';
import { allReducers } from '../src/store';

xdescribe('Reducer', () => {
    it('returns the initial state by default', () => {
        // creates a store from combined reducers
        const store = createStore(
            allReducers,
            applyMiddleware(enforceImmutableState())
        );

        const state = store.getState();
        //check all initial values are correct object and make sure campuses and students are empty
        expect(state.campuses).to.be.an('array');
        expect(state.campuses).to.be.deep.equal([]);
        expect(state.students).to.be.an('array');
        expect(state.students).to.be.deep.equal([]);
        expect(state.campus).to.be.an('object');
        expect(state.student).to.be.an('object');
        expect(state.campusForm).to.be.an('object');
        expect(state.studentForm).to.be.an('object');
    });
});
