import DefaultProfile from '../default-profile.png';
import { useState, useEffect } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";
import fetchUserProfile from "../hooks/fetchUserProfile.js";
import ProfilePicture from "./ProfilePicture.js"

export default function ProfileCard() {
    const handleClick = () => {
        document.getElementById('profilePicInput').click();
    };
    const [profilePicUrl, setProfilePicUrl] = useState('');

const { user } = useAuthContext()
      const [currentUser, setCurrentUser] = useState(null);
      const handleFileChange = event => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('image', file);
            fetch('https://disruptchat-backend.onrender.com/upload', {
                method: 'POST',
                body: formData,
                headers: {
                  'Authorization': `Bearer ${user.token}`
              },
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setProfilePicUrl(data.imageUrl);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
      }
      async function fetchCurrentUser() {
        try {
            const response = await fetch('https://disruptchat-backend.onrender.com/api/user/getCurrentUser', {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                },

            });
            if (!response.ok) {
                throw new Error('Failed to fetch user');
            }

            const userData = await response.json();
            console.log("User data:", userData);
            console.log("user name:", userData.user.username)
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
        <div className="profile-card">
          {currentUser ? (
    <div>Logged in as: {currentUser.user ? currentUser.user.username : 'Loading user...'}</div>
  ) : (
    <div> Loading... </div>
  )}
  {currentUser && currentUser.user && (
    <div className='corner-pic'>
      <ProfilePicture className='corner-pic' username={currentUser.user.username} imageUrl={profilePicUrl} />
    </div>
  )}
        <form id="uploadForm" action="http://localhost:3000/upload" method="post" encType="multipart/form-data">
            <input type="file" name='image' id="imageInput" style={{display: 'none',}} onChange={handleFileChange}/>
            <label htmlFor="imageInput" className="set-profile-btn">+</label>
        </form>
        </div>
        );
    }
  