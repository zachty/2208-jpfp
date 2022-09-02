import React from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import {
    CampusList,
    StudentList,
    SingleCampus,
    SingleStudent,
    NotFound,
} from './components';

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
                    <Route path="/campuses/:id" element={<SingleCampus />} />
                    <Route path="/students" element={<StudentList />} />
                    <Route path="/students/:id" element={<SingleStudent />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
