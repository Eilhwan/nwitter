import Nweet from 'components/Nweet';
import { authService, dbService } from 'fbase';
import React, { useEffect, useState } from 'react';
import { Route, useHistory } from 'react-router-dom';

function Home({userObj}) {

    const history = useHistory();
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] =useState([]);

    // const getNweets = async() =>{
    //     const dbNweets = await dbService.collection("nweets").get();
    //     dbNweets.forEach(document => {
    //         const nweetObject = {
    //             ... document.data(),
    //             id: document.id,

    //         };
    //         setNweets(prev => [nweetObject, ...prev]);
    //     })
    // }
    
    useEffect(()=>{
        dbService.collection("nweets").onSnapshot(snapshot => {
            const nweetArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setNweets(nweetArray)
        });
    }, [])

    const logOut = (event) => {
        authService.signOut();
        history.push("/")
    }

    const onChange = (event) => {
        const {target: {value}
        } = event;
        setNweet(value)
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("nweets").add({
            text: nweet,
            createdDate: Date.now(),
            creatorId: userObj.uid,
        });
        setNweet("");
    }
    
    return (
        <>
            <div>
                <form onSubmit={onSubmit}>
                    <input type="text" value={nweet} onChange={onChange} placeholder="What's on your mind?" maxLength={120} />
                    <input type="submit" value="Nweet"/>
                </form>
            </div>
            <div>
                {nweets.map((nweet) => (
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner = {nweet.creatorId === userObj.uid}/>
                ))}
            </div>
        </>
    )
}



export default Home;