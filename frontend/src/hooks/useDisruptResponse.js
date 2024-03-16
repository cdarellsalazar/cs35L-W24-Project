import { useState, useEffect } from 'react';

export const useDisruptResponse = (token, disruptResponse) => {
  const [matchFound, setMatchFound] = useState(false);
  const [participants, setParticipants] = useState(null);
  const [error, setError] = useState(null);

  const postDisruptResponse = async () => {
    try {
      const response = await fetch('https://disruptchat-backend.onrender.com/api/disrupt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ response: disruptResponse }),
      });

      const data = await response.json();

      if (response.ok) {
        setMatchFound(data.matchFound);
        setParticipants(data.participants); // null if no match is found
      } else {
        setError(data.error || 'Failed to process disrupt response');
      }
    } catch (error) {
      setError(error.message || 'An unexpected error occurred');
    }
  };

  useEffect(() => {
    if (disruptResponse !== null) {
      postDisruptResponse();

      const intervalId = setInterval(() => {
        // Only continue to poll if no match has been found yet
        if (!matchFound) {
          postDisruptResponse();
        }
      }, 5000); // Poll every 5 seconds

      // Cleanup function
      return () => clearInterval(intervalId);
    }
  // We depend on `matchFound` to stop polling once a match is found
  }, [token, disruptResponse, matchFound]);

  return { matchFound, participants, error };
};

export default useDisruptResponse;
