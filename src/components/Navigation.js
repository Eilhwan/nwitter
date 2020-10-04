import React from 'react';
import { Link } from 'react-router-dom';
import {Grid} from '@material-ui/core';
import { authService } from 'fbase';

const Navigation = ({userObj}) => {
    const onClickLogOut =  () => authService.signOut();
    return (
    <>
        <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        >
            <Link to="/Home">Home</Link>
            <Link to="/Profile">{userObj.displayName}</Link>
            <span onClick={onClickLogOut}>Log-out</span>
        </Grid>
    </>
    )
}

export default Navigation