import React, { useState, useEffect } from "react";
import logoImg from '../disrupt_logo.png'; 
import { useLogout } from "../hooks/useLogout";
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from "../hooks/useAuthContext";
import { useConvosContext } from "../hooks/useConvosContext";
import { useMessageContext } from "../hooks/useMessageContext"
import ChatList from "./LeftSidebar/ChatList";
import ChatContent from "./MiddleColumn/ChatContent";
import Answered from '../components/Answered';
import Question from '../components/Question';
import getUserByUserName from "../hooks/fetchUserByUsername";
import NewConvo from "../components/NewConvo";
import ProfileCard from "../components/ProfileCard";

function Messaging() {
    const now = new Date();
    const day = now.getDate();
    const [answered, answer] = useState(true);
    const [message, setMessage] = useState('');
    const [showNewConversationBox, setShowNewConversationBox] = useState(false);
    const { logout } = useLogout()
    const { dispatch: ConvoDispatch } = useConvosContext()
    const { dispatch: MessageDispatch } = useMessageContext()
    const { user } = useAuthContext()
    const navigate = useNavigate();
    const [convoStarted, startConvo] = useState(false);
    const handleInputChange = (event) => {
        setMessage(event.target.value);
    };


    useEffect(() => {
        //console.log('user: ', user)
        const fetchConvos = async () => {
          const response = await fetch('http://localhost:4000/api/convos/', {
            headers: {'Authorization': `Bearer ${user.token}`},
          })
          const json = await response.json()
    
          if (response.ok) {
            ConvoDispatch({type: 'SET_CONVOS', payload: json})
          }
        }
        if (user) {
          fetchConvos()
        }
      }, [ConvoDispatch, MessageDispatch, user])

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

    const [currentConvoMessages, setCurrentConvoMessages] = useState([])
    const newMessage = "";
    const [selectedConversation, setSelectedConversation] = useState();
    const [previousConversation, setPreviousConversation] = useState(null);

    useEffect(() => {
      const fetchMessages = async (selectedConvoID) => {
        try {
          const response = await fetch(`http://localhost:4000/api/convos/getMessages`, {
            method: 'POST',
            body: JSON.stringify({conversationID: selectedConvoID}),
            headers: {'Authorization': `Bearer ${user.token}`, 'Content-Type': 'application/json'}
          });
          const json = await response.json()
          if (!response.ok) {
           console.error('Error: ', json.error);
          }
          return json; // Return fetched data
        } catch (error) {
          console.error('Error fetching conversation data:', error);
          return null; // Return null if an error occurs
        }
      };

      const fetchAndSetMessages = async() => {
      if(selectedConversation){
        const renderInfo = await fetchMessages(selectedConversation.conversationID)
        console.log('MESSAGES: ', renderInfo)
        setCurrentConvoMessages(renderInfo)
        console.log('Current convo messages: ', currentConvoMessages)
      }
    }

    fetchAndSetMessages()

    }, [selectedConversation,currentConvoMessages])

    /**const [currentConvoMessages, setCurrentConvoMessages] = useState( [
        {
          messageId: 8,
          sender: "Paul Eggert",
          receiver: "User Logged In",
          msg: "How's your Latin?",
          timeSent: "12:53",
        },
        {
          messageId: 9,
          sender: "User Logged In",
          receiver: "Paul Eggert",
          msg: "LOL",
          timeSent: "12:54",
        },
        {
          messageId: 10,
          sender: "Paul Eggert",
          receiver: "User Logged In",
          msg: "I can't wait for everyone to fail the final!",
          timeSent: "12:55",
        },
      ])**/
      
      //const [newMessage, setNewMessage] = useState('');
      /*
      useEffect(() => {
        if (newMessage !== "") {
          setCurrentConvoMessages(prevCurrentConvoMessages => [...prevCurrentConvoMessages, newMessage]);
        }
      }, [newMessage]);*/ // This effect runs whenever newMessage changes

      //setCurrentConvoMessages(prevCurrentConvoMessages => [...prevCurrentConvoMessages, newMessage]);
/*
    useEffect(() => {
        if (previousConversation) {
            console.log("printing from useEffect");
            console.log("Prev Selected Convo:", previousConversation.name);
        }
    }, [previousConversation]);*/

    const handleConversationClick = (newConversation) => {
        newConversation.selected = true;
        if(previousConversation) {
            console.log("Prev Selected Convo:", previousConversation.name);
            previousConversation.selected = false;
        }
        setPreviousConversation(newConversation);
        setSelectedConversation({ ...newConversation, selected: true });
        console.log("Selected Conversation:", newConversation.name);
        console.log("Messages of Selected Convo:", newConversation.messages);
    };
    /*
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

      };*/

    const [username, setUsername] = useState(null);

    const onNewChatSubmit = (newMessage) => {
        // Update the state with the new message
        setCurrentConvoMessages(prevCurrentConvoMessages => [...prevCurrentConvoMessages, newMessage]);
      };

    return (
        <div className="container">
            <div className="left-column">
                <ChatList onConversationClick={handleConversationClick} />
            </div>
            <div className="center-column">
                <ChatContent selectedConversation={selectedConversation} currentConvoMessages={currentConvoMessages} onNewChatSubmit={onNewChatSubmit}/> {/*convoMessages={testConvo}*/}
            </div>
            <div className="right-column">
                <div className="logo-container">
                    <img src={logoImg} alt="Logo" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                </div>

                <div className="disrupt-container">
                {answered ? <Question toggleBoolYes={toggleBoolYes} toggleBoolNo={toggleBoolNo} /> : <Answered />}
                </div>
                <ProfileCard></ProfileCard>
                <div className="logout-container">
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                </div>
                
            </div>
        </div>
    );
};
export default Messaging;