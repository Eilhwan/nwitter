import { authService } from 'fbase';
import React from 'react';
import { Route, useHistory } from 'react-router-dom';

function Home() {
    const history = useHistory()
    const logOut = (event) => {
        authService.signOut();
        history.push("/")
    }
    return (
        <div>
                <span>Home</span>
                <button onClick={logOut}>log-out</button>
        </div>
    )
}



export default Home;