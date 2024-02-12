import React from "react";
import { Link } from 'react-router-dom';

function Register() {
    return (
        <div className="centered-chunk">
            <h1>DisruptChat</h1>
            <form className="register-form">
                <div className="inputs-container">
                    <input type="text" placeholder="username" />
                    <input type="text" placeholder="password" />
              </div>
                <Link to="/Messaging" className="login-button">Register</Link>
            </form>
            <p>
                Already have an account? <Link to="/" className="text-link">Login</Link>
            </p>
            
            
        </div>
    );
};
export default Register;