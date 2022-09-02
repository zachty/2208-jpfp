import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NotFound() {
    return (
        <div>
            <h2>Page Not Found!</h2>
            <p>
                Please use the links above to move between students and campuses
                or go back home below
            </p>
            <NavLink to="/">Back Home</NavLink>
        </div>
    );
}
