import React, { useState } from "react";
import logoImg from '../disrupt_logo.png'; 
import { useLogout } from "../hooks/useLogout";
import { useNavigate } from 'react-router-dom';
import ChatList from "./LeftSidebar/ChatList";
import ChatContent from "./MiddleColumn/ChatContent";
import Answered from '../components/Answered';
import Question from '../components/Question';

function Messaging() {
    const now = new Date();
    const day = now.getDate();
    const [answered, answer] = useState(true);
    const [message, setMessage] = useState('');
    //const [showNewConversationBox, setShowNewConversationBox] = useState(false);
    const {logout} = useLogout()
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/'); // Redirect to login page after logout
        } catch (err) {
            console.error('Logout failed:', err);
            // Optionally handle logout error here
        }
    };
    function toggleBoolYes() {
        answer(!answered)
      }
    function toggleBoolNo() {
        answer(!answered)
      }
    function getCurrentDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); 
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
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
/*
    const handleNewConvo = () => {
        setShowNewConversationBox(true); // Show the new conversation box
    }
*/
    const [selectedConversation, setSelectedConversation] = useState(null);

    const handleConversationClick = (conversation) => {
      //console.log('handleConversationClick called with id:', id);
      //setSelectedConversation(id);
      //const selectedConversation = allChatUsers1.find(conversation => conversation.id === id);

     // Update the selectedConversation state with the found conversation
      setSelectedConversation(conversation);
      console.log(conversation);
    };
    return (
        <div className="container">
            <div className="left-column">
                <ChatList onConversationClick={handleConversationClick} />
            </div>
            <div className="center-column">
                <ChatContent selectedConversation={selectedConversation} />
            </div>
            <div className="right-column">
                <div className="logo-container">
                    <img src={logoImg} alt="Logo" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                </div>

                <div className="disrupt-container">
                {answered ? <Question toggleBoolYes={toggleBoolYes} toggleBoolNo={toggleBoolNo} /> : <Answered />}
                </div>
                <div className="logout-container">
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    );
};
export default Messaging;