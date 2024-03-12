import React from 'react';
import clickReact from '../click_react.png';
import Popup from 'reactjs-popup';
import ReactPanel from './ReactPanel';
function StartReacting() {
    const handleClick = () => {
      console.log('Button clicked');
      
    };
    const reactStyle = {
        maxWidth: '13px',
        maxHeight: '13px', 
        width: 'auto', 
        height: 'auto' 
      };
    return (
        <Popup trigger= {<button onClick={handleClick} style={{ border: 'none', background: 'none', padding: 0 }}>
        <img src={clickReact} alt="Click me" style={reactStyle}/>
      </button>}
      position="right center">
        <ReactPanel></ReactPanel>
        </Popup>
      
    );
  }
  
  export default StartReacting;