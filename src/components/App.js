import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import fbase, { authService } from "fbase";
import { Container } from '@material-ui/core';

function App(){
    const [init, setInit] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userObj, setUserObj] = useState(null);
    
    const refreshUser = () => {
        const user = authService.currentUser;
        setUserObj({
            displayName: user.displayName,
            uid: user.uid,
            updateProfile: (args) => user.updateProfile(args),
        });    }

    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user){
                setIsLoggedIn(true);
                setUserObj({
                    displayName: user.displayName,
                    uid: user.uid,
                    updateProfile: (args) => user.updateProfile(args),
                });
                
            }else{
                setIsLoggedIn(false);
            }
            setInit(true);
        });
    }, [])
    return (
    <>
    <Container>
        {init ? (
        <AppRouter 
        refreshUser = {refreshUser} 
        isLoggedIn={isLoggedIn} 
        userObj={userObj}/> 
        ) : (
            "Initializing ..."
        )}
        
        <footer>&copy;  Nwitter {new Date().getFullYear()}</footer>
    </Container>
    </>
    );
}

export default App;