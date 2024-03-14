import DefaultProfile from '../default-profile.png';

export default function ProfileCard() {
    const handleClick = () => {
        document.getElementById('profilePicInput').click();
      };
      const handleProfilePicChange = () => {

      };
    return (
        <div className="profile-card">
        <text>Username</text>
        <img src={DefaultProfile} alt="Profile Picture" className="profile-picture"/>
        <button className="set-profile-btn">+</button>
    </div>
    );
  }