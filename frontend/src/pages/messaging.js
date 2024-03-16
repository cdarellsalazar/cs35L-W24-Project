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
import '../components/NewConvo.css';
import ChatItem from "../pages/MiddleColumn/ChatItem"

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
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const navigate = useNavigate();
    const [convoStarted, startConvo] = useState(false);
    const handleInputChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSearch = async () => {
      try {
          const response = await fetch(`http://localhost:4000/api/message/searchMessages?search=${encodeURIComponent(searchQuery)}`, {
              method: 'GET',
              headers: { 'Authorization': `Bearer ${user.token}`, 'Content-Type': 'application/json' },
          });
          if (!response.ok) {
              throw new Error('Search failed');
          }
          const data = await response.json();
          setSearchResults(data);
          //setCurrentConvoMessages(data); *EDIT HERE*
      } catch (error) {
          console.error('Failed to fetch search results:', error);
          // Optionally, update the UI to show an error message
      } finally {
          setIsSearching(false); // Reset searching state
      }
  };

    useEffect(() => {
      if (!searchQuery.trim() || !isSearching) {
          setSearchResults([]);
          if (isSearching) setIsSearching(false); // Reset if no search query to prevent loop
          return;
      }

      const delayDebounceFn = setTimeout(() => {
          handleSearch().finally(() => {
              setIsSearching(false); // Ensure this is reset after search
          });
      }, 500);

      return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, isSearching]);

  const handleSearchInputChange = (event) => {
    setIsSearching(true); // User starts typing, enable searching
    setSearchQuery(event.target.value);
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
        setResponse("Yes");
        answer(!answered)
      }
    function toggleBoolNo() {
        setResponse("No");
        answer(!answered)
      }

    const [currentConvoMessages, setCurrentConvoMessages] = useState([])
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
        //console.log('MESSAGES: ', renderInfo)
        setCurrentConvoMessages(renderInfo)
        //console.log('Current convo messages: ', currentConvoMessages)
      }
    }

    fetchAndSetMessages()

    }, [selectedConversation,currentConvoMessages])


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

    const [response, setResponse] = useState(null);
  


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
                <div className="search-container">
                      <input
                          type="text"
                          value={searchQuery}
                          onChange={handleSearchInputChange}
                          placeholder="Search for messages..."
                          className="search-input"
                      />
                      <button onClick={handleSearch} className="search-button">Search</button>
                      </div>
                      <div className="search-results">
                        {searchResults.map((result, index) => (
                              <div key={index}>
                              <p>Sender: {result.sender}</p>
                              <p>Receiver: {result.receiver}</p>
                              <p>Message: {result.message}</p>
                              <p>Time Sent: {result.timeSent}</p>
                            </div>
                        ))}
                      </div>
                    <div className="logo-container">
                        <img src={logoImg} alt="Logo" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                    </div>
                <div className="disrupt-container">
                {answered ? <Question toggleBoolYes={toggleBoolYes} toggleBoolNo={toggleBoolNo} /> : <Answered response={response} />}
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