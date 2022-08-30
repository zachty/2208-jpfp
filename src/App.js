import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { CampusList, StudentList } from './components';

function App() {
    return (
        <>
            <div>
                <nav>
                    <Link to="/students">Students</Link>
                    <Link to="/campuses">Campuses</Link>
                </nav>
                <CampusList />
                <StudentList />
            </div>
        </>
    );
}

export default App;
