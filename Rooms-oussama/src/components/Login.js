import React, { useContext, useDebugValue, useRef, useState } from "react";
import { loginCall } from "../apiCalls";
import { AuthContext } from "../Context/authContext";
import {Link} from "react-router-dom"
import axios from "axios"
export default function Login() {
    const [wrongEmail, setWrongEmail] = useState(false)
    const [wrongPassword, setWrongPassword] = useState(false)
    const email= useRef();
    const password = useRef();
    const {user, isFetching, error, dispatch} = useContext(AuthContext)

    const handleLogin = async (e) => {
        e.preventDefault();
        const allUsers = await axios.get("http://localhost:5000/api/user/allusers")
        const email1 = allUsers.data.filter(user=>user.email===email.current.value)
        if(email1.length === 0) {
        setWrongEmail(true)
        } else {
            const valid = await axios.post("http://localhost:5000/api/user/check", {pw1:password.current.value, pw2:email1[0].password})

            if(!valid.data.status){
                setWrongPassword(true)
            } else{
                loginCall({email: email.current.value, password: password.current.value}, dispatch);
            }
        }
        
    }

    return(
        <main>
            <div className="login-card">
                <div className="rooms"><h1>Rooms</h1></div>
                <div> 
                    <form className="login-form">
                        <input className="login-input" placeholder="Email Adress" ref={email}/>
                        {wrongEmail && <div style={{color: "red"}}>Email not found</div>}
                        <input className="login-input" type="password" placeholder="Password" ref={password} />
                        {!wrongEmail && wrongPassword && <div style={{color: "red"}}>Wrong password</div>}
                        <input className="login-submit" value="Login" type="submit" onClick={handleLogin}/>
                    </form>
                    <h5 className="login-suggest">Don't have an account? <span><Link to="../Register">Register</Link></span></h5>
                </div>
            </div>
        </main>
    )
}