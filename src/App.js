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
                <header>
                    <h1>Acme Schools</h1>
                    <nav>
                        <NavLink to="/students">Students</NavLink>
                        <NavLink to="/campuses">Campuses</NavLink>
                    </nav>
                </header>
                <Routes>
                    <Route index element={<></>} />
                    <Route path="/campuses" element={<CampusList />}>
                        <Route path=":id" element={<SingleCampus />} />
                    </Route>
                    <Route path="/students" element={<StudentList />}>
                        <Route path=":id" element={<SingleStudent />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
