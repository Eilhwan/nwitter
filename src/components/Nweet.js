import { dbService, storageService } from 'fbase';
import React, { useState } from 'react';
import {Button} from '@material-ui/core';

const Nweet = ({nweetObj, isOwner}) =>{
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm("Are you Sure to Delete This Nweet");
        if (ok) {
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
            await storageService.refFromURL(nweetObj.attachmentUrl).delete();
            alert("Selected Nweet is deleted");
        }
    }
    const submitEdit = async (event) => {
        event.preventDefault();
        const ok = window.confirm("Are you really want to change a nweet?");
        if (ok) {
            await dbService.doc(`nweets/${nweetObj.id}`).update({
                text: newNweet,
                updatedDate: Date.now(),
            });
        toggleEditing()
        }
    }
    const toggleEditing = () =>{
        setEditing (prev => !prev);
    }
    const onChangeValue = (event) => {
        const {target: {value}}
        = event
        setNewNweet(value);
    }
    return (
        <div>
            {
            editing ? <>
                <form onSubmit={submitEdit}>
                    <input 
                        placeholder="Edit your Nweet" 
                        value={newNweet} 
                        onChange={onChangeValue} 
                        required 
                    />
                    <input type="submit" value="Edit" />
                </form>
                <button onClick={toggleEditing}>Cancel</button>
            </>  :   <>
                {nweetObj.attachmentUrl && 
                <img src = {nweetObj.attachmentUrl} width="50px" height="50px"/>}
                <h4>{nweetObj.text}</h4>
                <h5>{new Date(nweetObj.createdDate).toString()}</h5>
                <h5>{nweetObj.updatedDate ? new Date(nweetObj.updatedDate).toString() + "(수정됨)" : ""} </h5>
                {isOwner && (
                <>  
                    <Button variant="contained" color="primary" onClick={toggleEditing}>Edit</Button>
                    <Button variant="contained" color="primary" onClick={onDeleteClick}>Delete</Button>
                
                </>
                )}</>
            }
        </div>
    )
}

export default Nweet;