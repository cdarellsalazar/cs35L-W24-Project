import React, { useState, useEffect } from 'react';
import fetchUserProfile from '../hooks/fetchUserProfile'; 

export default function ProfilePicture({ username }) {
    const [imageUrl, setImageUrl] = useState(''); // Initially no image

  useEffect(() => {
    // Fetch the user image when the component mounts or when the username changes
    fetchUserProfile(username)
      .then(url => {
        if (url) {
          setImageUrl(url); // Update state with the fetched image URL
        }
      });
  }, [username]); // Re-run effect if the username prop changes

  return (
    <div>
      {imageUrl ? (
        <img src={imageUrl} className="picture" alt="User profile" />
      ) : (
        <p>No profile picture available.</p> // Placeholder text or you could show a default image
      )}
    </div>
  );
}