import Nweet from 'components/Nweet';
import NweetFactory from 'components/NweetFactory';
import { dbService, storageService } from 'fbase';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';


function Home({userObj}) {

    const history = useHistory();
    const [nweets, setNweets] = useState([]);
    

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

    // const logOut = (event) => {
    //     authService.signOut();
    //     history.push("/")
    // }    
    return (
        <>
            <div>
                <NweetFactory userObj={userObj}/>
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