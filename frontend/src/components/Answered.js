import React, { useEffect } from 'react';
import CurrentDate from './CurrentDate';

export default function Answered(props) {
    const addShakeAnimation = () => {
        const button = document.getElementById('debateButton');
        button.classList.add('shake-animation');
        setTimeout(() => {
            button.classList.remove('shake-animation');
        }, 500); 
    };
    useEffect(() => {
        const button = document.getElementById('debateButton');
        button.addEventListener('click', addShakeAnimation);
        return () => {
            button.removeEventListener('click', addShakeAnimation);
        };
    }, []); 

    return (
        <div>
            <h3 className="daily-disrupt"> Daily !Disrupt! </h3>
            <CurrentDate />
            <button id="debateButton">Debate a Dissenter</button>
            {/* Add a onclick event to make debate a dissenter button actually create a new chat! */}
        </div>
    );
}
