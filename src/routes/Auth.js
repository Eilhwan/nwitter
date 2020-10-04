import AuthForm from 'components/AuthForm';
import { authService, firebaseInstance } from 'fbase';
import React, { useState } from 'react';



const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("")
     
    const onSubmit = async(event) =>{
        event.preventDefault();
        try {
            let data;
            if(newAccount){
                //create
                data = authService.createUserWithEmailAndPassword(
                    email, password
                )
            }else{
                data = authService.signInWithEmailAndPassword(
                    email, password
                )
            }
            console.log(data);
        } catch (error) {
            setError(error.message)
        }
    } ;

    const toggleAccount = () => {
        setNewAccount(prev => !prev)
    }
    const onChange = (event) =>{
        const {target: {name, value},
        } = event;
        if (name === "email") {
            setEmail(value)
        }else if (name === "password") {
            setPassword(value)
        }
    }
    const onSocialClick = async (event) => {
        const {target: {name}} = event;
        let provider;
        if (name === "github"){
            provider = new firebaseInstance.auth.GithubAuthProvider();

        }else if (name === 'google') {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
    
    };
    
    return (
    <div>
        <AuthForm />
    <div>
        <button name="google" onClick={onSocialClick}>Coninue with Google</button>
        <button name="github" onClick={onSocialClick}>Coninue with Github</button>
    </div>
    
</div>)
}

export default Auth;