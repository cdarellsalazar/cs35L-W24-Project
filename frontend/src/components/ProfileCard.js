import DefaultProfile from '../default-profile.png';

export default function ProfileCard() {
    const handleClick = () => {
        document.getElementById('profilePicInput').click();
      };
      const handleProfilePicChange = () => {

      };
    return (
        <div class="profile-card">
        <text>Username</text>
        <img src={DefaultProfile} alt="Profile Picture" class="profile-picture"/>
        <button class="set-profile-btn">+</button>
    </div>
    );
  }