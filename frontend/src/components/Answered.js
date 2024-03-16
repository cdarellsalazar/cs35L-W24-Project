import React, { useState } from 'react';
import CurrentDate from './CurrentDate';

export default function Answered({ token }) {
    const [isLoading, setIsLoading] = useState(false);
    const [matchFound, setMatchFound] = useState(false);
    const [participants, setParticipants] = useState(null);

    const handleDebateButtonClick = async () => {
        console.log("Sending request to server...");
        setIsLoading(true);
        try {
            console.log("Request URL: http://localhost:4000/api/disrupt");
            console.log(`Bearer token being sent: ${token}`);
            const response = await fetch('http://localhost:4000/disrupt', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ buttonPressed: 'debate' }),
            });

            console.log("Response status:", response.status);

            if (response.ok) {
                const data = await response.json();
                console.log("Response data:", data);
                setMatchFound(data.matchFound);
                setParticipants(data.participants);
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

    return (
        <div>
            <h3 className="daily-disrupt"> Daily !Disrupt! </h3>
            <CurrentDate />
            <button id="debateButton" onClick={handleDebateButtonClick} disabled={isLoading}>
                Debate a Dissenter
            </button>
            {isLoading && <p>Loading...</p>}
            {!isLoading && matchFound && participants && (
                <p>Match found! Participants: {JSON.stringify(participants)}</p>
            )}
            {!isLoading && !matchFound && (
                <p>No match found. Please try again later.</p>
            )}
        </div>
    );
}
