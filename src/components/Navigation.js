import React from 'react';
import link, { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/Home">Home</Link>
                </li>
                <li>
                    <Link to="/Profile">Profile</Link>
                </li>
                <li>
                    <Link to="/">Log-out</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation