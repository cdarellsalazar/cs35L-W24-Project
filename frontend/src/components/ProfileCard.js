import DefaultProfile from '../default-profile.png';
import { useState, useEffect } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";

export default function ProfileCard() {
    const handleClick = () => {
        document.getElementById('profilePicInput').click();
      };
      const handleProfilePicChange = () => {

      
      };
      const { user } = useAuthContext()
      const [currentUser, setCurrentUser] = useState(null);

      async function fetchCurrentUser() {
        try {
            const response = await fetch('http://localhost:4000/api/user/getCurrentUser', {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                },
                
            });
            if (!response.ok) {
                throw new Error('Failed to fetch user');
            }
    
            const userData = await response.json();
            console.log("User data:", userData);
            console.log("user name:", userData.username)
            return userData;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
      const getCurrentUserData = async () => {
        const user = await fetchCurrentUser();
        setCurrentUser(user);
      };

      getCurrentUserData();
    }, []);





    return (
        <div class="profile-card">
        {currentUser ? (
          <div>Current user; {currentUser.user.username}</div>
          ) : (<div> Loading... </div>)
        }
        <img src={DefaultProfile} alt="Profile Picture" class="profile-picture"/>
        <button class="set-profile-btn">+</button>
    </div>
    );
  }