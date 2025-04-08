import { useState } from 'react';
import { FaUserCircle, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function ProfileIcon() {
  const [isOpen, setIsOpen] = useState(false);
  const profile = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: null // You can add an avatar URL here
  };

  return (
    <div className="profile-icon-container">
      <button 
        className="profile-icon-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {profile.avatar ? (
          <img 
            src={profile.avatar} 
            alt={profile.name} 
            className="profile-avatar"
          />
        ) : (
          <FaUserCircle size={32} />
        )}
      </button>

      {isOpen && (
        <div className="profile-dropdown">
          <div className="profile-header">
            <div className="profile-info">
              <h3>{profile.name}</h3>
              <p>{profile.email}</p>
            </div>
          </div>
          <div className="profile-menu">
            <Link to="/profile" className="profile-menu-item">
              <FaEdit />
              <span>Edit Profile</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileIcon;