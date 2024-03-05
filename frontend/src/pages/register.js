import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useSignup } from "../hooks/useSignup";

function Register() {
    const [user, setUser] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, error, isLoading} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(email, password)
    }

    return (
        <div className="centered-chunk">
            <h1>DisruptChat</h1>
            <form className="register-form" onSubmit={handleSubmit}>
                <div className="inputs-container">
                    <input
                    type="username"
                    placeholder="username"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    />

                    <input 
                    type="email" 
                    placeholder="email" 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    />
                    <input 
                    type="password" 
                    placeholder="password" 
                    onChange={(e) => setPassword(e.target.value)}
                    />
              </div>
                <button className="login-button" disabled={isLoading}>Register</button>
                {error && <div>{error}</div>}
            </form>
            <p>
                Already have an account? <Link to="/" className="text-link">Login</Link>
            </p>
            
            
        </div>
    );
};
export default Register;