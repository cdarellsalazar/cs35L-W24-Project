import React, { Component, useCallback, useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ChatContent.css";
import Avatar from "../LeftSidebar/Avatar";
import ChatItem from "./ChatItem";
import { faPaperPlane, faBars } from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "../../hooks/useAuthContext";
//import { get } from "mongoose";


const ChatContent = (props) => {

  // PLEASE NOTE: there are three props (external variables) that are being passed to ChatContent.js:
  // 1. selectedConversation: this is the conversation that the user has clicked on
  // 2. currentConvoMessages: this is the list of messages in the selected conversation
  // 3. onNewChatSubmit: when a user tries to send a message, this external function updates currentConvoMessages
  // These are stored in messaging.js, the parent component. 

  // This function scrolls to the bottom of the chat window
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
 

/*
  // This function scrolls to the bottom when currentConvoMessages changes
  useEffect(() => {
    scrollToBottom();
  }, [props.currentConvoMessages]);
  */
  const { user } = useAuthContext()
  const [msg, setMsg] = useState(""); // This is the message that the user is typing
  const [userID, setUserID] = useState(null); // Initialize userID state

  // Used for css/stlying
  const messagesEndRef = useRef(null); // This is the reference to the bottom of the chat window
  const inputRef = useRef(); // This is the reference to the input field

  const [isOpen, setIsOpen] = useState(false);

  // Send Message Function
  const sendMessage = async () => {
    if (msg !== "" && props.selectedConversation) { // If the message is not empty and currentConvoMessages is initialized
        const now = new Date(); // Get the current time
        //const currentTime = now.getHours() + ":" + now.getMinutes();
        const conversationID = props.selectedConversation.conversationID
        const newMessage = { // Create a new message object
            conversationID,
            receiver: props.selectedConversation._id,
            msg
        };
        console.log(newMessage);
          
        try {
          //console.log('Helloooooo')
          const response = await fetch('http://localhost:4000/api/message/send', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json'},
              body: JSON.stringify(newMessage)
          });
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }

          const message = await response.json();

          //console.log("Message sent successfully:", message); 
        } catch (error) {
          //console.log("---------------------")
          console.error("There was an error sending the message:", error);
      }

          props.onNewChatSubmit(newMessage); // passes the new message to onNewChatSubmit, which updates currentConvoMessages
          setMsg(""); //clears message
          console.log("Entire selected convo details:", props.currentConvoMessages); // used for debugging
      }
  };

  useEffect(() => {
    const getUserID = async () => {
      try {
        console.log('GETUSERID IS RUNNING');
        const response = await fetch('http://localhost:4000/api/user/getUserID', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${user.token}` }
        });
        if(!response.ok){
          return
        }
        const responseJSON = await response.json()
        console.log('RESPONEJSON: ', responseJSON)
        setUserID(responseJSON)
        console.log('USERID: ', userID)
      } catch (error) {
        console.error('Error while fetching user ID:', error);
      }
    };

    if (user) {
      getUserID();
    }
  }, [user]);

    // Calls the scroll to bottom function when currentConvoMessages changes
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); 
    }, [props.currentConvoMessages]);

    // When the enter key is pressed, call the sendMessage function
    const keydownHandler = useCallback((e) => {
      if (e.key === "Enter") {
          sendMessage();
      }
    }, []);

    // When the component mounts, add an event listener for the enter key
    useEffect(() => {
      const inputElement = inputRef.current;
      if (inputElement) {
        inputElement.addEventListener("keydown", keydownHandler);
        scrollToBottom();
  
        return () => {
          inputElement.removeEventListener("keydown", keydownHandler);
        };
      }
    }, [keydownHandler]);



    // When the state changes, update the Msg variable to whatever the user is typing
    const onStateChange = (e) => {
        setMsg(e.target.value);
    };

    // Used for debugging: when the selectedConversation changes, print the selectedConversation
    useEffect(() => {
      console.log(props.selectedConversation);
    }, [props.selectedConversation]);

    return (
      <div className="main__chatcontent">
        {props.selectedConversation ? ( // if there's a selected conversation, do all of this
        <>
          <div className="content__header">
            <div className="blocks">
              <div className="current-chatting-user">
                <Avatar
                  isOnline={props.selectedConversation.isOnline ? props.selectedConversation.isOnline : false}
                  image={props.selectedConversation.image ? props.selectedConversation.image : "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"}
                  name={props.selectedConversation.username}
                />
                <p>{props.selectedConversation.username ? props.selectedConversation.username : "No Conversation Selected"}</p>
              </div>
              </div>
              <div className="blocks">
                  <div className="settings">
                  <button className="btn-nobg" onClick={() => setIsOpen(!isOpen)}>
                    <FontAwesomeIcon icon={faBars}/>
                  </button>
                  {isOpen && (
                      <div className="menu">
                          <button onClick={() => console.log('Block User')}>Block User</button>
                          <button onClick={() => console.log('Search for Message')}>Search for Message</button>
                      </div>
                  )}
                  </div>
              </div>
          </div>
          <div className="content__body">
            <div className="chat__items">
              {props.currentConvoMessages.map((message, index) => (
                <ChatItem // for each message in currentConvoMessages, create a ChatItem; it's rendered here
                            isOnline={message.sender === user._id ? true : (props.selectedConversation ? props.selectedConversation.isOnline : false)}
                            timeSent={message.sentAt}
                            animationDelay={index + 2}
                            key={message.messageId}
                           // user={message.sender === currentUser.user.username ? "" : "other"}
                            msg={message.content}
                            image={message.sender === user._id ? "https://s3.amazonaws.com/cms.ipressroom.com/173/files/20198/5d72b4772cfac209ff04c634_Royce+Quad/Royce+Quad_hero.jpg" : (props.selectedConversation.image ? props.selectedConversation.image : "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg")}
                            onClick={() => props.onConversationClick(props.conversation)}
                        />
              ))}
                <div ref={messagesEndRef} /> 
            </div>
        </div>
        <div className="content__footer">
            <div className="sendNewMessage">
                <input
                    type="text"
                    placeholder="Type a message here..."
                    onChange={onStateChange}
                    value={msg}
                    onKeyDown={event => {
                      if (event.key === 'Enter') {
                        sendMessage();
                        event.preventDefault(); // Prevent form submission
                      }
                    }}
                />
                <button className="btnSendMsg" id="sendMsgBtn" onClick={sendMessage}>
                    <FontAwesomeIcon icon={faPaperPlane}/>
                </button>
            </div>
        </div>
      </>) : ( // else just display this
                <div className="current-chatting-user">
                <p>Welcome to DisruptChat! For optimal viewing, please ensure your browser window is maximized and zoom is set to 100%.</p>
              </div>
    )}
    </div>)
};
export default ChatContent