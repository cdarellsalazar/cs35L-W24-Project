import React from "react";
import { Link } from 'react-router-dom';

function Login() {
    return (
        <div className="centered-chunk">
            <h1>DisruptChat</h1>
            <form className="login-form">
                <div className="inputs-container">
                    <input type="text" placeholder="username" />
                    <input type="text" placeholder="password" />
              </div>
                <Link to="/Messaging" className="login-button">Login</Link>
            </form>

            {/* Add additional logic for linking from Login to Messaging only when valid login */}
            <p>
            Don't have an account? <Link to="/Register" className="text-link">Register</Link>
            </p>
            
            
        </div>
    );
};

 
export default Login;