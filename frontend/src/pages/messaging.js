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
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [previousConversation, setPreviousConversation] = useState(null);

    const handleConversationClick = (newConversation) => {
        // Set the clicked conversation's selected field to be true
        newConversation.selected = true;
        if(previousConversation === null) // if there isn't a previous conversation
        {
            setPreviousConversation(newConversation); // set it to the new conversation
            console.log("Prev Selected Convo:", previousConversation); 
        }
        else // if there is a previous conversation
        {
            previousConversation.selected = false; // set its selected field to false
            setPreviousConversation(newConversation); // set the previous conversation to the new conversation
            console.log("Prev Selected Convo:", previousConversation.name);
        }
        
        // Set the 'selected' field of the new conversation to true
        const updatedNewConversation = { ...newConversation, selected: true };
      
        // Update the selectedConversation state with the new conversation
        setSelectedConversation(updatedNewConversation);
      
        console.log("Selected Conversation:", updatedNewConversation.name);

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