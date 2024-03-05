import React, { useState, Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEllipsis, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./messaging.css";
import ConvoItems from "./conversationItems";

//import { fa-plus } from "@fortawesome/free-solid-svg-icons";
//import NewConvo from "../components/NewConvo"
//import { Link } from 'react-router-dom';
//uncomment this import when sign-out button is added


export class Conversation extends Component {
    allChatUsers = [
        {
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
          id: 1,
          name: "Tim Hover",
          active: true,
          isOnline: true,
        },
        {
          image:
            "https://pbs.twimg.com/profile_images/1055263632861343745/vIqzOHXj.jpg",
          id: 2,
          name: "Ayub Rossi",
          active: false,
          isOnline: false,
        },
        {
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&usqp=CAU",
          id: 3,
          name: "Hamaad Dejesus",
          active: false,
          isOnline: false,
        },
        {
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRZ6tM7Nj72bWjr_8IQ37Apr2lJup_pxX_uZA&usqp=CAU",
          id: 4,
          name: "Eleni Hobbs",
          active: false,
          isOnline: true,
        },
        {
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRJo1MiPQp3IIdp54vvRDXlhbqlhXW9v1v6kw&usqp=CAU",
          id: 5,
          name: "Elsa Black",
          active: false,
          isOnline: false,
        },
    ];

    constructor(props) {
        super(props);
        this.state = {
          allChats: this.allChatUsers,
        };
      }
      render() {
        return (
            <div className="left-column">
            <button className="btn">
                <FontAwesomeIcon id="plus-sign" icon={faPlus}/>
                <span>Start New Chat</span>
            </button>
            <div className="convo-sidebar-heading">
                <h2>Conversations</h2>
                <button className="btn-nobg">
                    <FontAwesomeIcon icon={faEllipsis}/>
                </button>
            </div>
            <div className="convo-search-bar">
                <div className="search-wrap">
                    <input type="text" placeholder="Search Conversations" required />
                    <button className="search-btn">
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                    </button>
                </div>
            </div>
            <div className="conversations">
              {this.state.allChats.map((item, index) => {
                return (
                  <ConvoItems
                    name={item.name}
                    key={item.id}
                    animationDelay={index + 1}
                    active={item.active ? "active" : ""}
                    isOnline={item.isOnline ? "active" : ""}
                    image={item.image}
                  />
                );
              })}
            </div>
          </div>
        );
      }
    }

function Messaging() {

    const [message, setMessage] = useState('');
    const [showNewConversationBox, setShowNewConversationBox] = useState(false);
    const[allChats, setAllChats] = useState([]);

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
    //start convo button = btn
    //ellipses = btn-nobg
    return (
        <div className="container">
            <div className="left-column">
                <button className="btn">
                    <FontAwesomeIcon id="plus-sign" icon={faPlus}/>
                    <span>Start New Chat</span>
                </button>
                <div className="convo-sidebar-heading">
                    <h2>Conversations</h2>
                    <button className="btn-nobg">
                        <FontAwesomeIcon icon={faEllipsis}/>
                    </button>
                </div>
                <div className="convo-search-bar">
                    <div className="search-wrap">
                        <input type="text" placeholder="Search Conversations" required />
                        <button className="search-btn">
                            <FontAwesomeIcon icon={faMagnifyingGlass}/>
                        </button>
                    </div>
                </div>
                <div className="conversations">
                    {allChats.map((item, index) => {
                        return (
                            <ConvoItems
                                name = {item.name}
                                key = {item.id}
                                animationDelay={index + 1}
                                active={item.active ? "active" : ""}
                                isOnline={item.isOnline ? "active" : ""}
                                image={item.image} />
                        );
                    })}
                

                </div>
                
                {/*<button className="start-convo-button" onClick={handleNewConvo}>Create New Convo</button>
                {showNewConversationBox && <NewConvo/>}*/}

                
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