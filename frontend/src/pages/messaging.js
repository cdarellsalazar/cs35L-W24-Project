import React from "react";
//import { Link } from 'react-router-dom';
//uncomment this import when sign-out button is added
function Messaging() {
    return (
        <div className="container">
            <div className="left-column">
                Friends List Selection and Online Statuses Displayed
            </div>
        <div className="center-column">
            Message History of currently selected friend
            <div className="sending-box">
                <input type="text" className="message-input" />
                <button className="send-button">Send</button>
            </div>

        </div>
        <div className="right-column">
            <div className="top-right-chunk">
                
            </div>
        <div className="bottom-right-chunk">
            profile card, search function, sign out
        </div>
  </div>
</div>
    );
};
export default Messaging;