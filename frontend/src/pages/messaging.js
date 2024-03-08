import React, { useState } from "react";
import logoImg from '../disrupt_logo.png'; 
import { useLogout } from "../hooks/useLogout";
import { useNavigate } from 'react-router-dom';
import ChatList from "./LeftSidebar/ChatList";
import ChatContent from "./MiddleColumn/ChatContent";

function Messaging() {
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
                <div className="logout-container">
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    );
};
export default Messaging;