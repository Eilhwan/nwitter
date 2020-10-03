import React from 'react';
import link, { Link } from 'react-router-dom';

const Navigation = ({userObj}) => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/Home">Home</Link>
                </li>
                <li>
                    <Link to="/Profile">{userObj.displayName}</Link>
                </li>
                <li>
                    <Link to="/">Log-out</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation