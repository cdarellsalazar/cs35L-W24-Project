import React, { useState, useEffect } from 'react';
import fetchUserProfile from '../hooks/fetchUserProfile'; 

export default function ProfilePicture({ username , imageUrl }) {
    const [localImage, setLocalImage] = useState(''); 
  useEffect(() => {
    // fetchUserProfile(username)
    if(imageUrl){
      setLocalImage(imageUrl);

    }else{
      fetchUserProfile(username)
      .then(url => {
        if (url) {
          setLocalImage(url); 
        }
      });
    }
      
  }, [username , imageUrl]); 
  return (
    <div>
      {localImage ? (
        <img src={localImage} className="picture" alt="User profile" />
      ) : (
        <p>No profile picture available.</p> 
      )}
    </div>
  );
}