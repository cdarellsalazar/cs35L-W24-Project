import { useState } from 'react';

async function fetchUserProfile(username) {
  try {
    const response = await fetch(`https://disruptchat-backend.onrender.com/api/user/userImage/${username}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const imageUrl = await response.text(); 
    return imageUrl;
  } catch (error) {
    console.error('Fetching user image failed:', error);
    return null; 
  }
}


export default fetchUserProfile;
