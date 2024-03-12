import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from "../hooks/useLogin";



function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault()
        /*try {
            await login(email, password);
            navigate('/messaging');
        } catch (err) {
            console.error("Login failed: ", err);
            console.log(error)
        }*/
        await login(email, password);
    }

    return (
        <div className="centered-chunk">
            <h1>DisruptChat</h1>
            <form className="register-form" onSubmit={handleSubmit}>
                <div className="inputs-container">
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
                <button className="login-button" disabled={isLoading}>Login</button>
                {error && <div>{error}</div>}
            </form>
            <p>
                Don't have an account? <Link to="/Register" className="text-link">Register</Link>
            </p>
            
            
        </div>
    );
};
export default Login;

