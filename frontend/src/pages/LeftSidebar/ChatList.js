import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ChatList.css";
import ChatListItems from "./ChatListItems";
import {faPlus, faEllipsis, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";

export default class ChatList extends Component {
  allChatUsers = [
    {
      image:
        "https://upload.wikimedia.org/wikipedia/commons/6/60/TZDB_and_some_challenges_of_long_data_-_Paul_Eggert_-_LibrePlanet_2022.png",
      id: 1,
      name: "Paul Eggert",
      active: true,
      isOnline: true,
    },
    {
      image:
        "https://pbs.twimg.com/profile_images/1405919529713082370/wx64vl-A_400x400.jpg",
      id: 2,
      name: "Gene Block",
      active: false,
      isOnline: false,
    },
    {
      image:
        "https://s.research.com/images/f37a9fe6106c9c314ce360593a9e42f23098d35d-135x135.jpeg",
      id: 3,
      name: "Majid Sarrafzadeh",
      active: false,
      isOnline: false,
    },
    {
      image:
        "https://mascothalloffame.com/wp-content/uploads/bb-plugin/cache/joe-e1678911953635-circle.jpg",
      id: 4,
      name: "Joe Bruin",
      active: false,
      isOnline: true,
    },
    {
      image:
        "https://mascothalloffame.com/wp-content/uploads/bb-plugin/cache/oski-e1678912051861-circle.jpg",
      id: 5,
      name: "Oski",
      active: false,
      isOnline: false,
    },
    {
      image:
        "https://www.spongebobshop.com/cdn/shop/products/SB-Standees-Spong-1_grande.jpg?v=1603744567",
      id: 6,
      name: "Spongebob Squarepants",
      active: false,
      isOnline: true,
    },
    {
      image:
        "https://i.scdn.co/image/ab6761610000e5eba07eb018071ca45120dceb4f",
      id: 7,
      name: "Freddy Fazbear",
      active: false,
      isOnline: true,
    },
    {
      image:
        "https://i.mydramalist.com/qLyY8_5c.jpg",
      id: 8,
      name: "Jin Young Park(JYP)",
      active: false,
      isOnline: false,
    },
    {
      image:
        "https://pbs.twimg.com/media/ClPJZyfVYAAeIPZ.jpg",
      id: 9,
      name: "Anakin Skywalker",
      active: false,
      isOnline: true,
    },
    {
      image: "https://2.bp.blogspot.com/_2oy76hdmatE/TMxTxgc18MI/AAAAAAAAAOk/c8ZW3SyVtVI/s1600/Community-Dean-Pelton_300.jpg",
      id: 10,
      name: "Craig Pelton",
      active: false,
      isOnline: true,
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
      <div className="main__chatlist">
        <button className="btn">
          <FontAwesomeIcon id="plus-sign" icon={faPlus}/>
          <span>Start New Chat</span>
        </button>
        <div className="chatlist__heading">
          <h2 className="centered-heading">Chats</h2>
          <button className="btn-nobg">
            <FontAwesomeIcon icon={faEllipsis}/>
          </button>
        </div>
        <div className="chatList__search">
          <div className="search_wrap">
            <input type="text" placeholder="Search Here" required />
            <button className="search-btn">
              <FontAwesomeIcon icon={faMagnifyingGlass}/>
            </button>
          </div>
        </div>
        <div className="chatlist__items">
          {this.state.allChats.map((item, index) => {
            return (
              <ChatListItems
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