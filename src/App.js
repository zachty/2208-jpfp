import React from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import { CampusList, StudentList } from './components';

function App() {
    return (
        <>
            <div>
                <nav>
                    <NavLink to="/students">Students</NavLink>
                    <NavLink to="/campuses">Campuses</NavLink>
                </nav>
                <Routes>
                    <Route index element={<></>} />
                    <Route path="/campuses" element={<CampusList />} />
                    <Route path="/students" element={<StudentList />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
