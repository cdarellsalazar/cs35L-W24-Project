import React, { useState } from "react";
import NewConvo from "../components/NewConvo"
import logoImg from '../disrupt_logo.png'; 
import { useLogout } from "../hooks/useLogout";
import { useNavigate } from 'react-router-dom';

function Messaging() {

    const [message, setMessage] = useState('');
    const [showNewConversationBox, setShowNewConversationBox] = useState(false);
    const {logout} = useLogout()
    const navigate = useNavigate();
    const handleInputChange = (event) => {
        setMessage(event.target.value);
    };
    const handleLogout = async () => {
        try {
            await logout();
            navigate('/'); // Redirect to login page after logout
        } catch (err) {
            console.error('Logout failed:', err);
            // Optionally handle logout error here
        }
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
                <div className="logo-container">
                    <img src={logoImg} alt="Logo" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                </div>
                <div className="logout-container">
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                </div>
  </div>
</div>
    );
};
export default Messaging;