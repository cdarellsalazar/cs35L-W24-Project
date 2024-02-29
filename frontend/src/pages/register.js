import React from "react";
import { Link } from 'react-router-dom';

function Register() {
    const URL = 'http://localhost:5000/'

    async function LoadScript() {
        const getUserInfo = document.getElementById('username')
        const getPass = document.getElementById('password')
        getUserInfo.addEventListener('click', postInfo)
        async function postInfo() {
            if (input.value == '') { return }
            const res = await fetch(URL, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({
                    parcel: input.value
                })
            })
        }
    }
    return (
        <div className="centered-chunk">
            <h1>DisruptChat</h1>
            <form className="register-form">
                <div className="inputs-container">
                    <input type="text" id="username" />
                    <input type="text" id="password" />
                </div>
                <Link to="/Messaging" className="login-button" onClick={LoadScript}> Register</Link>
            </form>
            <p>
                Already have an account? <Link to="/" className="text-link">Login</Link>
            </p>
        </div>
    );
};
export default Register;