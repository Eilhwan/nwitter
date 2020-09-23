import { authService } from 'fbase';
import React from 'react';


export default () => {
    const onClickLogOut =  () => authService.signOut();
    return (
        <>
            <button onClick={onClickLogOut}>
                Log-out
            </button>
        </>
    )
}

