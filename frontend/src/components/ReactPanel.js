import React, { useState } from 'react';
import heart from '../heart.png';
import shock from '../shock.png';
import thumbup from '../thumbup.png';
import thumbdown from '../thumbdown.png';
import { useAuthContext } from '../hooks/useAuthContext';
import { useMessageContext } from '../hooks/useMessageContext';
function ReactPanel({ messageID }){    const [selectedReaction, setSelectedReaction] = useState('');
    const { user } = useAuthContext()
    const { messages, dispatch} = useMessageContext()
    const reactions = [
      { id: 1, src: heart, alt: 'heart' },
      { id: 2, src: shock, alt: 'shock' },
      { id: 3, src: thumbup, alt: 'like' },
      { id: 4, src: thumbdown, alt: 'dislike' },
      ];
    console.log('messageID received:', messageID);
    console.log('auth token received:', user.token);
      const handleClick = async (alt) => {
        console.log('reactionType received', alt )
        console.log(JSON.stringify({ reactionType: alt }));
        setSelectedReaction(alt);
        const response = await fetch(`http://localhost:4000/api/message/reactions/${messageID}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ reactionType: alt })
      })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            console.log(data);
            setSelectedReaction(alt);
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
          });
        
      };
    return(
        <div style={{ background: '#fff', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {reactions.map((reaction) => (
                <div key={reaction.id} style={{ margin: '5px', cursor: 'pointer' }}>
                    <img src={reaction.src} alt={reaction.alt} onClick={() => handleClick(reaction.alt)} style={{ width: '20px' }} />
                </div>
                ))}
            </div>
        </div>
    );
}

export default ReactPanel;