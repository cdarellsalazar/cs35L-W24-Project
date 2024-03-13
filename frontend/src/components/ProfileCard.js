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
      const handleFileChange = event => {
        const file = event.target.files[0];
        if (file) {

            const formData = new FormData();
            formData.append('image', file);

            fetch('http://localhost:4000/upload', {
                method: 'POST',
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }}
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
        <div className="profile-card">
        {currentUser ? (
          <div>Logged in as:  {currentUser.user.username}</div>
          ) : (<div> Loading... </div>)
        }
         <img src={DefaultProfile} alt="Profile Picture" className="profile-picture"/>
        <form id="uploadForm" action="http://localhost:3000/upload" method="post" encType="multipart/form-data">
            <input type="file" name='image' id="imageInput" style={{display: 'none',}} onChange={handleFileChange}/>
            <label htmlFor="imageInput" className="set-profile-btn">+</label>
        </form>
    </div>
    );
    }