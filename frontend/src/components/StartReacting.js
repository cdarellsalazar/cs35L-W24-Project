import React, { useState, useEffect } from 'react';
import clickReact from '../click_react.png';
import Popup from 'reactjs-popup';
import ReactPanel from './ReactPanel';
import { useAuthContext } from '../hooks/useAuthContext';
import heart from '../heart.png';
import shock from '../shock.png';
import like from '../thumbup.png';
import dislike from '../thumbdown.png';

function StartReacting(props) {
    const { user } = useAuthContext();
    const [hasReactions, setHasReactions] = useState(false);
    const getImageSrc = (reaction) => {
      switch (reaction) {
        case 1:
          return like;
        case 2:
          return dislike;
        case 3:
          return heart;
        case 4:
          return shock;
        default:
          return null; 
      }
    };
    useEffect(() => {
      if (props.reactions !== undefined && props.reactions >= 1 && props.reactions <= 4) {
        setHasReactions(true);
    } else {
        setHasReactions(false);
    }
}, [props.reactions]);

    const handleClick = () => {
        console.log('Button clicked');
        console.log('PLEASEGOD', JSON.stringify(props.messageID));
    };

    const reactStyle = {
        maxWidth: '13px',
        maxHeight: '13px',
        width: 'auto',
        height: 'auto'
    };

    return (
        <Popup
            trigger={
                hasReactions ? (
                  <div>
                    <img src={getImageSrc(props.reactions)} style={{ width: '20px' }} alt={`Reaction ${props.reactions}`} />
                  </div>
                ) : (
                    <button onClick={handleClick} style={{ border: 'none', background: 'none', padding: 0 }}>
                        <img src={clickReact} alt="Click me" style={reactStyle} />
                    </button>
                )
            }
            position="right center"
        >
            <ReactPanel messageID={props.messageID} />
        </Popup>
    );
}

export default StartReacting;
