import React, { useContext, useRef } from "react";
import { loginCall } from "../apiCalls";
import { AuthContext } from "../Context/authContext";
import {Link} from "react-router-dom"

export default function Login() {
    const email= useRef();
    const password = useRef();
    const {user, isFetching, error, dispatch} = useContext(AuthContext)

    const handleLogin = (e) => {
        e.preventDefault();
        loginCall({email: email.current.value, password: password.current.value}, dispatch);

    }
    console.log(user)

    return(
        <main>
            <div className="login-card">
                <div className="rooms"><h1>Rooms</h1></div>
                <div> 
                    <form className="login-form">
                        <input className="login-input" placeholder="Email Adress" ref={email}/>
                        <input className="login-input" placeholder="Password" ref={password} />
                        <input className="login-submit" value="Login" type="submit" onClick={handleLogin}/>
                    </form>
                    <h5 className="login-suggest">Don’t have an account? <span><Link to="../Register">Register</Link></span></h5>
                </div>
            </div>
        </main>
    )
}