
import React, { Component, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import fetchUserByUsername from "../../hooks/getUser";
import  useFetchUserById  from "../../hooks/getUser";
//import fetchUserByUsername from "../../hooks/getUser";
import "./ChatList.css";
import ChatListItems from "./ChatListItems";
import {faPlus, faEllipsis, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import { useConvosContext } from "../../hooks/useConvosContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import NewConvo from "../../components/NewConvo";
//import { getUserByIdFromReq } from "../../../../backend/controllers/userController";
//import { getUserByIdFromReq } from "../../../../backend/controllers/userController";

const ChatList = (props) => {

  const [searchTerm, setSearchTerm] = useState("");
  const [newChat, setNewChat] = useState(null);
  const [allChatUsers, setAllChatUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { convos, dispatch } = useConvosContext()
  const { user } = useAuthContext()
  const [convoStarted, startConvo] = useState(false);

  useEffect(() => {
    const fetchConvos = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/convos/', {
          headers: {'Authorization': `Bearer ${user.token}`},
        });
        if (!response.ok) {
          console.log("response:", response);
          throw new Error('Failed to fetch convos');
        }
        const json = await response.json();
        dispatch({type: 'SET_CONVOS', payload: json});
        setLoading(false); // Set loading to false after successful fetch
      } catch (error) {
        console.log('Error:', error);
      }
    };

    if (user) {
      fetchConvos();
    }
  }, [dispatch, user]);

  useEffect(() => {

      const fetchConversationData = async (convo) => {
        const convoID = convo._id
        //console.log('convoID: ', convoID)
        try {
          console.log('sending request')
          const response = await fetch(`http://localhost:4000/api/convos/render`, {
            method: 'POST',
            body: JSON.stringify({conversationID: convoID}),
            headers: {'Authorization': `Bearer ${user.token}`, 'Content-Type': 'application/json'}
          });
          const json = await response.json()
          console.log('response: ', response)
          if (!response.ok) {
           console.error('Error: ', json.error);
          }
          console.log('json: ', json)
          return json; // Return fetched data
        } catch (error) {
          console.error('Error fetching conversation data:', error);
          return null; // Return null if an error occurs
        }
      };

      // Fetch data for each conversation ID
      if(convos){
      Promise.all(convos.map(convo => fetchConversationData(convo)))
        .then(results => {
          console.log('results', results)
          // Filter out any null results (errors)
          const filteredResults = results.filter(result => result !== null);
          // Update state with fetched data
          setAllChatUsers(filteredResults);
        })
        .catch(error => {
          console.error('Error fetching conversation data:', error);
        });
       } }
  , [convos, user]);

  

     

  const handleNewChat = () => {
    startConvo(true);
    setNewChat("");
  };

  const handleSearchChange = (e) => { 
    setSearchTerm(e.target.value);
};

  const handleNewChatSubmit = (e) => {
      e.preventDefault();
      setAllChatUsers(prevChats => [...prevChats, newChat]);
      setNewChat(null);
      console.log('New chat added:', newChat);
      try {
          // const user = fetchUserByUsername(newChat);
          console.log(props.user);
      } catch (error) {
          console.error('Error fetching user:', error);
      }
      console.log("User Info:") // useFetchUserById(newChat.name));
    };

  const renderChatListItems = (chatUsers, onConversationClick) => {
    //console.log('renderChatListItems called with:', chatUsers);
    return chatUsers.map((user, index) => (
        <ChatListItems
            key={user}
            id={user.id}
            image={user.image || "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"}
            name={user.username}
            selected={user.selected}
            isOnline={user.isOnline}
            //activeTime={user.activeTime}
            animationDelay={index + 1}
            onClick={() => props.onConversationClick(user)} //instead of user.id
        />
    ));
  };

  //console.log('allChatUsers: ', allChatUsers)

  /**const filteredChats = [
    {
      image:
        "https://upload.wikimedia.org/wikipedia/commons/6/60/TZDB_and_some_challenges_of_long_data_-_Paul_Eggert_-_LibrePlanet_2022.png",
      id: 1,
      name: "Paul Eggert",
      selected: false,
      isOnline: true,
      activeTime: "Online",
    }
  ]; **/
  const filteredChats = allChatUsers.filter(chat =>
    chat && chat.username && chat.username.toLowerCase().includes(searchTerm.toLowerCase())
);


  //console.log('filteredChats: ', filteredChats)

if (newChat) {
    return (
        <form onSubmit={handleNewChatSubmit}>
            <input type="text" placeholder="Enter user name" required 
            onChange={e => {
                setNewChat(e.target.value);
                console.log(e.target.value);
            }}/>
            <button type="submit">Start Chat</button>
        </form>
    );
}

return (
  <div className="main__chatlist">
      {!convoStarted ? (
        <button className="btn" onClick={handleNewChat}>
        <FontAwesomeIcon id="plus-sign" icon={faPlus}/>
        <span>Start New Chat</span>
    </button>
      ) : (
        <NewConvo />
      )}
      
      
      <div className="chatlist__heading">
          <h2 className="centered-heading">Chats</h2>
          <button className="btn-nobg">
              <FontAwesomeIcon icon={faEllipsis}/>
          </button>
      </div>
      <div className="chatList__search">
          <div className="search_wrap">
              <input type="text" placeholder="Search Here" required onChange={handleSearchChange}/>
              <button className="search-btn">
                  <FontAwesomeIcon icon={faMagnifyingGlass}/>
              </button>
          </div>
      </div>
      <div className="chatlist__items">
          {renderChatListItems(filteredChats)}
      </div>
  </div>
);
};
export default ChatList;