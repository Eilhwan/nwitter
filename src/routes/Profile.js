import Nweet from 'components/Nweet';
import { authService, dbService } from 'fbase';
import React, { useEffect, useState } from 'react';


export default ({refreshUser, userObj}) => {
    const onClickLogOut =  () => authService.signOut();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    const getMyNweets = async () => {
        const nweets = await dbService
        .collection("nweets")
        .where("creatorId", "==", userObj.uid)
        .orderBy("createdDate")
        .get();
    };
    
    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewDisplayName(value)
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({
                displayName: newDisplayName,
            });
        }
        refreshUser();
        
    }

    useEffect(() => {
        getMyNweets();
    }, []);

    return (
        <>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Display name" onChange={onChange} value={newDisplayName}/>
                <input type="submit" value="Edit profile" />
            </form>
            <button onClick={onClickLogOut}>
                Log-out
            </button>
            {/* <Nweet/> */}
        </>

    )
}

