import React, { Component, useCallback, useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ChatContent.css";
import Avatar from "../LeftSidebar/Avatar";
import ChatItem from "./ChatItem";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
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

  // Used for css/stlying
  const messagesEndRef = useRef(null); // This is the reference to the bottom of the chat window
  const inputRef = useRef(); // This is the reference to the input field

  async function fetchCurrentUser() {
    try {
        const response = await fetch('http://localhost:4000/api/user/getCurrentUser', {
            headers: {
                'Authorization': `Bearer ${user.token}`,
            },
            
        });
        if (!response.ok) {
            throw new Error('Failed to fetch user');
        }

        const userData = await response.json();
        console.log("User data:", userData);
        console.log("user name:", userData.username)
        return userData;
    } catch (error) {
        console.error('Error:', error);
    }
}

  // Send Message Function
  const sendMessage = async () => {
      if (msg !== "" && props.currentConvoMessages) { // If the message is not empty and currentConvoMessages is initialized
          const now = new Date(); // Get the current time
          const currentTime = now.getHours() + ":" + now.getMinutes();
          const currentUser = await fetchCurrentUser(); // Get the current user
          const username = currentUser.user.username;
          console.log("current user in sendmessage:", username);
          const newMessage = { // Create a new message object
              messageId: props.currentConvoMessages.length + 1,
              sender: username, // Change this to current user later once the function to fetch user data is up
              receiver: props.selectedConversation.name,
              msg: msg, // actual message the user is typing
              timeSent: currentTime,
          };
          console.log("sender:", newMessage.sender);
          /*
          try {
            const response = await fetch('http://localhost:4000/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newMessage),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const message = await response.json();

            console.log("Message sent successfully:", message);
        } catch (error) {
            console.error("There was an error sending the message:", error);
        }
*/
          props.onNewChatSubmit(newMessage); // passes the new message to onNewChatSubmit, which updates currentConvoMessages
          setMsg(""); //clears message
          console.log("Entire selected convo details:", props.currentConvoMessages); // used for debugging
      }
  };

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
                />
                <p>{props.selectedConversation.username ? props.selectedConversation.username : "No Conversation Selected"}</p>
              </div>
              </div>
              <div className="blocks">
                  <div className="settings">
                      <button className="btn-nobg">
                          <i className="fa fa-cog"></i>
                      </button>
                  </div>
              </div>
          </div>
          <div className="content__body">
            <div className="chat__items">
              {props.currentConvoMessages.map((message, index) => (
                <ChatItem // for each message in currentConvoMessages, create a ChatItem; it's rendered here
                            isOnline={message.sender === "User Logged In" ? true : (props.selectedConversation ? props.selectedConversation.isOnline : false)}
                            timeSent={message.timeSent}
                            animationDelay={index + 2}
                            key={message.messageId}
                            user={message.sender === "User Logged In" ? "" : "other"}
                            msg={message.msg}
                            image={message.sender === "User Logged In" ? "https://s3.amazonaws.com/cms.ipressroom.com/173/files/20198/5d72b4772cfac209ff04c634_Royce+Quad/Royce+Quad_hero.jpg" : (props.selectedConversation.image ? props.selectedConversation.image : "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg")}
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
      <>
      <div >
        <p> Welcome to DisruptChat! For optimal viewing, please ensure your browser window is maximized and zoom is set to 100%. </p>
      </div>
    </>
    )}
    </div>)
};
export default ChatContent
/*
export default class ChatContent extends Component {
  eggertPhoto = "https://upload.wikimedia.org/wikipedia/commons/6/60/TZDB_and_some_challenges_of_long_data_-_Paul_Eggert_-_LibrePlanet_2022.png"
  penguinPhoto = "https://s3.amazonaws.com/cms.ipressroom.com/173/files/20198/5d72b4772cfac209ff04c634_Royce+Quad/Royce+Quad_hero.jpg"
  messagesEndRef = createRef(null);
  chatItms = [
    {
      key: 1,
      image:
        "https://s3.amazonaws.com/cms.ipressroom.com/173/files/20198/5d72b4772cfac209ff04c634_Royce+Quad/Royce+Quad_hero.jpg",
      type: "",
      msg: "Eggert why do you do this to us",
    },
    {
      key: 2,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/6/60/TZDB_and_some_challenges_of_long_data_-_Paul_Eggert_-_LibrePlanet_2022.png",
      type: "other",
      msg: "LOL",
    },
    {
      key: 3,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/6/60/TZDB_and_some_challenges_of_long_data_-_Paul_Eggert_-_LibrePlanet_2022.png",
      type: "other",
      msg: "It'd be too easy otherwise",
    },
    {
      key: 4,
      image:
        "https://s3.amazonaws.com/cms.ipressroom.com/173/files/20198/5d72b4772cfac209ff04c634_Royce+Quad/Royce+Quad_hero.jpg",
      type: "",
      msg: "All of us are stressing over this project",
    },
    {
      key: 5,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/6/60/TZDB_and_some_challenges_of_long_data_-_Paul_Eggert_-_LibrePlanet_2022.png",
      type: "other",
      msg: "That's the point.",
    },
    {
      key: 6,
      image:
        "https://s3.amazonaws.com/cms.ipressroom.com/173/files/20198/5d72b4772cfac209ff04c634_Royce+Quad/Royce+Quad_hero.jpg",
      type: "",
      msg: "You can't be serious",
    },
    {
      key: 7,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/6/60/TZDB_and_some_challenges_of_long_data_-_Paul_Eggert_-_LibrePlanet_2022.png",
      type: "other",
      msg: "You'll get egged again on the final too.",
    },
  ];

  testConvo = [
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
  ];

  constructor(props) {
    super(props);
    this.state = {
      chat: this.testConvo, //this.chatItms,
      msg: "",
    };
  }

  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  sendMessage = () => {
    if (this.state.msg !== "" && this.props.selectedConversation) {
      const now = new Date();
      const currentTime = now.getHours() + ":" + now.getMinutes();

      this.testConvo.push({
        messageId: this.testConvo.length + 1,
        sender: "User Logged In",
        receiver: this.props.selectedConversation.name,
        msg: this.state.msg,
        timeSent: currentTime,
      });
      /*
      this.chatItms.push({
        key: 1,
        type: "",
        msg: this.state.msg,
        image:
          "https://s3.amazonaws.com/cms.ipressroom.com/173/files/20198/5d72b4772cfac209ff04c634_Royce+Quad/Royce+Quad_hero.jpg",
      });
      this.setState({ chat: [...this.chatItms] });
      *//*
      this.setState({ chat: [...this.testConvo] });
      this.scrollToBottom();
      this.setState({ msg: "" });
    }
  };
  
  keydownHandler = (e) => {
    if (e.key === "Enter") {
      this.sendMessage();
    }
  };
  
  componentDidMount() {
    window.addEventListener("keydown", this.keydownHandler);
    this.scrollToBottom();
  }
  
  componentWillUnmount() {
    window.removeEventListener("keydown", this.keydownHandler);
  }
  onStateChange = (e) => {
    this.setState({ msg: e.target.value });
  };

  componentDidUpdate(prevProps) {
    if (this.props.selectedConversation !== prevProps.selectedConversation) {
      console.log(this.props.selectedConversation);
    }
  }
  
  render() {
    return (
      <div className="main__chatcontent">
        <div className="content__header">
          <div className="blocks">
            <div className="current-chatting-user">
              <Avatar
                isOnline={this.props.selectedConversation ? this.props.selectedConversation.isOnline : false}
                image={this.props.selectedConversation ? this.props.selectedConversation.image : "http://placehold.it/80x80"}
              />
              <p>{this.props.selectedConversation ? this.props.selectedConversation.name : "No conversation selected"}</p>
            </div>
          </div>

          <div className="blocks">
            <div className="settings">
              <button className="btn-nobg">
                <i className="fa fa-cog"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="content__body">
          <div className="chat__items">
          {this.state.chat.map((message, index) => {
            return (
              <ChatItem
                isOnline={message.sender === "User Logged In" ? true : (this.props.selectedConversation ? this.props.selectedConversation.isOnline : false)}
                timeSent={message.timeSent}
                animationDelay={index + 2}
                key={message.messageId}
                user={message.sender === "User Logged In" ? "" : "other"}
                msg={message.msg}
                image={message.sender === "User Logged In" ? "https://s3.amazonaws.com/cms.ipressroom.com/173/files/20198/5d72b4772cfac209ff04c634_Royce+Quad/Royce+Quad_hero.jpg" : (this.props.selectedConversation ? this.props.selectedConversation.image : "http://placehold.it/80x80")}              />
            );
          })}
            <div ref={this.messagesEndRef} /> 
          </div>
        </div>
        <div className="content__footer">
          <div className="sendNewMessage">
            <input
              type="text"
              placeholder="Type a message here..."
              onChange={this.onStateChange}
              value={this.state.msg}
            />
            <button className="btnSendMsg" id="sendMsgBtn" onClick={this.sendMessage}>
              <FontAwesomeIcon icon={faPaperPlane}/>
            </button>
          </div>
        </div>
      </div>
    );
  }
}*/