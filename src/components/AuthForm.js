import { authService } from 'fbase';
import React, { useState } from 'react';

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("")

    const onSubmit = async(event) =>{
        event.preventDefault();
        try {
            let data;
            if(newAccount){
                data = authService.createUserWithEmailAndPassword(
                    email, password
                )
            }else{
                data = authService.signInWithEmailAndPassword(
                    email, password
                )
            }
        } catch (e) {
            setError(e.message);
            console.log("error", e)
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
    
    return (
        <>
            <form onSubmit={onSubmit}>
                <input  name="email" 
                        type="text" 
                        placeholder="Email" 
                        required="required" 
                        value={email}
                        onChange={onChange} />
                <input  name="password"
                        type="password" 
                        placeholder="Password" 
                        required="required" 
                        value={password}
                        onChange={onChange} />
                <input  type="submit"
                        value={newAccount ? "Create Account" : "Log-In"}/>
                <span>{error}</span>
            </form>
            <span onClick={toggleAccount}>
                {newAccount ? "Log-In" : "Create Account"}
            </span>
        </>
    )
}

export default AuthForm;