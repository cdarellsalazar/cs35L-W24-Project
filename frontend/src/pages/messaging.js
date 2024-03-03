import React, { useState } from "react";
import NewConvo from "../components/NewConvo"
//import { Link } from 'react-router-dom';
//uncomment this import when sign-out button is added


function Messaging() {

    const [message, setMessage] = useState('');
    const [showNewConversationBox, setShowNewConversationBox] = useState(false);

    const handleInputChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSendMessage = () => {
        fetch('/api/messages/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                senderId: 'senderId',
                receiverId: 'receiverId',
                content:message
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Message sent:', data);
            setMessage('');
        })
        .catch((error) => {
            console.error('Error sending message:', error);
        });
    };

    const handleNewConvo = () => {
        setShowNewConversationBox(true); // Show the new conversation box
    }

    const handleStartConversation = () => {

    }

    /*
                       
                        {showNewConversationBox && (
                            <div className="new-conversation-box">
                                <p>This is the new conversation box.</p>
                                <button onClick={handleStartConversation}>Start Conversation</button>
                            </div>
    */
    
    return (
        <div className="container">
            <div className="left-column">
                Friends List Selection and Online Statuses Displayed
                
                <button className="start-convo-button" onClick={handleNewConvo}>Create New Convo</button>
                {showNewConversationBox && <NewConvo/>}

                
            </div>
            
        <div className="center-column">
            Message History of currently selected friend
            <div className="sending-box">
                <input type="text" className="message-input" value={message} onChange={handleInputChange}/>
                <button className="send-button" onClick={handleSendMessage}>Send</button>
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