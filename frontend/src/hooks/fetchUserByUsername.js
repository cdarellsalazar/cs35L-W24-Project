
import { useState } from 'react';
const fetchUserByUsername = async (userName) => {
  const response = await fetch(`https://disruptchat-backend.onrender.com/api/user?username=${userName}`);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error);
  }

  if (response.ok && json.length > 0) {
    return json[0]; // return the entire user object
  }

  return null;
};
export { fetchUserByUsername as default};