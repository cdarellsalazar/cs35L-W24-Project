import React, { Component, useState, createRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ChatContent.css";
import Avatar from "../LeftSidebar/Avatar";
import ChatItem from "./ChatItem";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

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
      */
      this.setState({ chat: [...this.testConvo] });
      this.scrollToBottom();
      this.setState({ msg: "" });
    }
    console.log("Printing testConvo:", this.testConvo);
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
            {/*}
            {this.state.chat.map((itm, index) => {
              return (
                <ChatItem
                  animationDelay={index + 2}
                  key={itm.key}
                  user={itm.type ? itm.type : "me"}
                  msg={itm.msg}
                  image={itm.image}
                />
              );
            })} */}
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
}