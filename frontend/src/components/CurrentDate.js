import React from 'react';

export function getCurrentDate() {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const day = String(today.getDate()).padStart(2, '0');
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthMap = monthNames.reduce((acc, month, index) => {
        const monthIndex = (index + 1).toString().padStart(2, '0'); 
        acc[monthIndex] = month; 
        return acc;
      }, {});
    return `${monthMap[month]} ${day}`;
}
export function dayOnly(){
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    return day
}
function CurrentDate() {
    const todayDate = getCurrentDate();

    return (
            <h4>{todayDate}</h4>
    );
}

export default CurrentDate;
