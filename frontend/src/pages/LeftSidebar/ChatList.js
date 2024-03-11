import React, { Component, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  useFetchUserById  from "../../hooks/getUser";
//import fetchUserByUsername from "../../hooks/getUser";
import "./ChatList.css";
import ChatListItems from "./ChatListItems";
import {faPlus, faEllipsis, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import { useConvosContext } from "../../hooks/useConvosContext";
import { useAuthContext } from "../../hooks/useAuthContext";
//import { getUserByIdFromReq } from "../../../../backend/controllers/userController";
//import { getUserByIdFromReq } from "../../../../backend/controllers/userController";

const ChatList = (props) => {

  const [searchTerm, setSearchTerm] = useState("");
  const [newChat, setNewChat] = useState(null);
  const [allChatUsers, setAllChatUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { convos, dispatch } = useConvosContext()
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchConvos = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/convos/', {
          headers: {'Authorization': `Bearer ${user.token}`},
        });
        if (!response.ok) {
          throw new Error('Failed to fetch convos');
        }
        const json = await response.json();
        dispatch({type: 'SET_CONVOS', payload: json});
        setLoading(false); // Set loading to false after successful fetch
      } catch (error) {
        console.error('Error fetching convos:', error);
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

  if (loading) {
    return <div>Loading...</div>;
  }

     

  const handleNewChat = () => {
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

  const renderChatListItems = (chatUsers) => {
    console.log('renderChatListItems called with:', chatUsers);
    return chatUsers.map((user, index) => (
        <ChatListItems
            id={user.id}
            image={user.image}
            name={user.name}
            selected={user.selected}
            isOnline={user.isOnline}
            activeTime={user.activeTime}
            animationDelay={index + 1}
            onClick={() => props.onConversationClick(user)} //instead of user.id
        />
    ));
  };

  console.log('allChatUsers: ', allChatUsers)

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
    //console.log('chat: ', chat)
    chat.username.toLowerCase().includes(searchTerm.toLowerCase())
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
      <button className="btn" onClick={handleNewChat}>
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

/*
export default class ChatList extends Component {
  allChatUsers1 = [
    {
      image:
        "https://upload.wikimedia.org/wikipedia/commons/6/60/TZDB_and_some_challenges_of_long_data_-_Paul_Eggert_-_LibrePlanet_2022.png",
      id: 1,
      name: "Paul Eggert",
      selected: false,
      isOnline: true,
      activeTime: "Online",
    },
    {
      image:
        "https://pbs.twimg.com/profile_images/1405919529713082370/wx64vl-A_400x400.jpg",
      id: 2,
      name: "Gene Block",
      selected: false,
      isOnline: false,
      activeTime: "Active 32 mins ago"
    },
    {
      image:
        "https://s.research.com/images/f37a9fe6106c9c314ce360593a9e42f23098d35d-135x135.jpeg",
      id: 3,
      name: "Majid Sarrafzadeh",
      selected: false,
      isOnline: false,
      activeTime: "Active 55 mins ago"
    },
    {
      image:
        "https://mascothalloffame.com/wp-content/uploads/bb-plugin/cache/joe-e1678911953635-circle.jpg",
      id: 4,
      name: "Joe Bruin",
      selected: false,
      isOnline: true,
      activeTime: "Online"
    },
    {
      image:
        "https://mascothalloffame.com/wp-content/uploads/bb-plugin/cache/oski-e1678912051861-circle.jpg",
      id: 5,
      name: "Oski",
      selected: false,
      isOnline: false,
      activeTime: "Active 2 hours ago"
    },
  ]
  allChatUsers = [
    {
      image:
        "https://www.spongebobshop.com/cdn/shop/products/SB-Standees-Spong-1_grande.jpg?v=1603744567",
      id: 6,
      name: "Spongebob Squarepants",
      selected: false,
      isOnline: true,
      activeTime: "Online"
    },
    {
      image:
        "https://i.scdn.co/image/ab6761610000e5eba07eb018071ca45120dceb4f",
      id: 7,
      name: "Freddy Fazbear",
      selected: false,
      isOnline: true,
      activeTime: "Online"
    },
    {
      image:
        "https://i.mydramalist.com/qLyY8_5c.jpg",
      id: 8,
      name: "Jin Young Park (JYP)",
      selected: false,
      isOnline: false,
      activeTime: "Active 1 hour ago"
    },
    {
      image:
        "https://pbs.twimg.com/media/ClPJZyfVYAAeIPZ.jpg",
      id: 9,
      name: "Anakin Skywalker",
      selected: false,
      isOnline: true,
      activeTime: "Online"
    },
    {
      image: "https://2.bp.blogspot.com/_2oy76hdmatE/TMxTxgc18MI/AAAAAAAAAOk/c8ZW3SyVtVI/s1600/Community-Dean-Pelton_300.jpg",
      id: 10,
      name: "Craig Pelton",
      selected: false,
      isOnline: true,
      activeTime: "Online"
    },
  ];
  constructor(props) {
    super(props);
    this.state = {
      allChats: this.allChatUsers1,
      searchTerm: "",
      newChat: null,
    };
  }

  handleNewChatSubmit = (e) => {
    e.preventDefault();
    this.setState(prevState => ({
      allChatUsers1: [...(prevState.allChatUsers1 || []), prevState.newChat],
      newChat: null
    }));
    //const user = this.props.onNewChatSubmit(this.state.newChat);
    //console.log(this.props.onNewChatSubmit(this.state.newChat));
    console.log('New chat added:', this.state.newChat);
    try {
      {/*const user =  fetchUserByUsername(this.state.newChat);}*//*
      console.log(this.props.user);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
    console.log("User Info:")//useFetchUserById(this.state.newChat.name));
  };

  renderChatListItems(chatUsers) {
    console.log('renderChatListItems called with:', chatUsers);
    return chatUsers.map((user, index) => (
      <ChatListItems
        id={user.id}
        image={user.image}
        name={user.name}
        selected={user.selected}
        isOnline={user.isOnline}
        activeTime={user.activeTime}
        animationDelay={index + 1}
        onClick={() => this.props.onConversationClick(user)} //instead of user.id
      />
    ));
  }
  render() {
    const filteredChats = this.allChatUsers1.filter(chat =>
      chat.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    );
    if (this.state.newChat) {
      return (
        <form onSubmit={this.handleNewChatSubmit}>
                <input type="text" placeholder="Enter user name" required 
                onChange={e => {
                  this.setState({ newChat: e.target.value });
                  console.log(e.target.value);
                }}/>
                <button type="submit">Start Chat</button>
              </form>
            );
            
          }
        
          return (
            <div className="main__chatlist">
        <button className="btn" onClick={() => this.setState({newChat: {}})}>
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
            <input type="text" placeholder="Search Here" required onChange={e => this.setState({ searchTerm: e.target.value })}/>
            <button className="search-btn">
              <FontAwesomeIcon icon={faMagnifyingGlass}/>
            </button>
          </div>
        </div>
        <div className="chatlist__items" >
          {this.renderChatListItems(filteredChats)}
          {/*{this.renderChatListItems(this.allChatUsers1)}*//*}
        </div>
      </div>
    );
  }
}*/