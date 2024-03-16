import React, { useState, useEffect } from 'react';
import CurrentDate from './CurrentDate';
import { useAuthContext } from "../hooks/useAuthContext";
import { useConvosContext } from "../hooks/useConvosContext";

const Answered = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [matchFound, setMatchFound] = useState(false);
    const [participants, setParticipants] = useState(null);
    const { user } = useAuthContext();
    const [currentUser, setCurrentUser] = useState(null);
    const [error, setError] = useState(null);
    const [recipient, setRecipient] = useState('')
    const { dispatch } = useConvosContext()
    const [participantsArray, setParticipantsArray] = useState([])

    async function fetchCurrentUser() {
        try {
            const response = await fetch('https://disruptchat-backend.onrender.com/api/user/getCurrentUser', {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch user');
            }

            const userData = await response.json();
            console.log("User data:", userData);
            console.log("user name:", userData.user.username)
            return userData;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
      const getCurrentUserData = async () => {
        const user = await fetchCurrentUser();
        setCurrentUser(user);
      };

      getCurrentUserData();
    }, []);


    const handleDebateButtonClick = async () => {
        console.log("Sending request to server...");
        setIsLoading(true);
        console.log("props.response:", props.response);
        try {
            console.log(`Bearer token being sent: ${user.token}`);
            const response = await fetch('https://disruptchat-backend.onrender.com/api/user/disruptResponse', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({dailyDisruptReaction: props.response}),
            });

            console.log("Response status:", response.status);

            if (response.ok) {
                const data = await response.json();
                console.log("Response data:", data);
                setMatchFound(data.matchFound);
                setParticipants(data.participantsUsername);
                console.log("disrupt participants:", data.participants);
        
            } else {
                throw new Error('Failed to process disrupt response:', response.statusText);
            }
        } catch (error) {
            console.error('An unexpected error occurred:', error);
        } finally {
            setIsLoading(false);
            console.log("Set isLoading to false");

        }
    };

    const createDisruptConvo = async () => {

        const conversation = {recipient}
        console.log('other person inside createdisruptconvo:', conversation)
        const response = await fetch('https://disruptchat-backend.onrender.com/api/convos/newConvo', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(conversation)
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }
        if(response.ok)
        {
            dispatch({type: 'CREATE_CONVO', payload: json});
            setRecipient('')
            setError(null)
            console.log('New conversation added', json)
        }
    }

    useEffect(() => {
        console.log("participants:", participants);
        console.log("currentUser:", currentUser);
      
        if (participants) {
          const participantsArray = [participants.yesUsername, participants.noUsername];
          console.log("participantsArray:", participantsArray);
          console.log("currentUser username:", currentUser.user.username);
          setRecipient(participantsArray.filter(username => username !== currentUser.user.username)[0]);
          console.log("recipient username:", recipient);
        }
      }, [participants, matchFound]);

      useEffect(() => {
        if (recipient) { 
            createDisruptConvo();
            console.log("recipient:", recipient);

        }
      }, [recipient]); // This effect runs whenever recipient changes



    return (
        <div>
            <h3 className="daily-disrupt"> Daily !Disrupt! </h3>
            <CurrentDate />
            <button id="debateButton" onClick={handleDebateButtonClick} disabled={isLoading}>
                Debate a Dissenter
            </button>
            {isLoading && <p>Loading...</p>}
            {!isLoading && matchFound && participants && (
                <p>Match found!</p>
            )}
            {!isLoading && !matchFound && (
                <p>No match found. Please try again later.</p>
            )}
        </div>
    );
}
export default Answered