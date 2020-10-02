import Nweet from 'components/Nweet';
import { authService, dbService, storageService } from 'fbase';
import React, { useEffect, useState } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function Home({userObj}) {

    const history = useHistory();
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState();

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

    const onChange = (event) => {
        const {target: {value}
        } = event;
        setNweet(value)
    }

    const onFileChange = (event) =>{
        const {
            target: {files},
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) =>{
            const {
                currentTarget: {result},
            } = finishedEvent
            setAttachment(result)
        };  
        reader.readAsDataURL(theFile);
        
    };

    const onClearAttachment = () => setAttachment("")

    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentUrl = "";
        if(attachment != "" && attachment != undefined){
            const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const response = await fileRef.putString(attachment, "data_url");
            attachmentUrl = await response.ref.getDownloadURL();
        }
        const nweetObj = {
            text: nweet,
            createdDate: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
        }
        await dbService.collection("nweets").add(nweetObj);
        setNweet("");
        setAttachment("");
    }
    
    return (
        <>
            <div>
                <form onSubmit={onSubmit}>
                    <input type="text" value={nweet} onChange={onChange} placeholder="What's on your mind?" maxLength={120} />
                    <input type="file" accept="image/*" onChange={onFileChange}/>
                    {attachment && (
                        <div>
                            <img src={attachment} width="50px" height="50px" />
                            <button onClick={onClearAttachment}>Clear</button>
                        </div>
                    )}
                    
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