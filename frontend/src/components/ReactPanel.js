import React, { useState } from 'react';
import heart from '../heart.png';
import shock from '../shock.png';
import thumbup from '../thumbup.png';
import thumbdown from '../thumbdown.png';
function ReactPanel(){
    const [selectedReaction, setSelectedReaction] = useState('');
    const reactions = [
        { id: 1, src: heart, alt: 'Heart' },
        { id: 2, src: shock, alt: 'Shock' },
        { id: 3, src: thumbup, alt: 'Thumb Up' },
        { id: 4, src: thumbdown, alt: 'Thumb Down' },
      ];
      const handleClick = (alt) => {
        setSelectedReaction(alt);
      };
    return(
        <div>
      <div>
        {reactions.map((reaction) => (
          <img key={reaction.id} src={reaction.src} alt={reaction.alt} onClick={() => handleClick(reaction.alt)} style={{ width: '20px', margin: '5px', cursor: 'pointer' }} />
        ))}
      </div>

    </div>
    );
}

export default ReactPanel;