import { useState } from 'react';
import { FaUserCircle, FaEdit, FaCamera } from 'react-icons/fa';
import Sidebar from './Sidebar';
import NotificationIcon from './NotificationIcon';
import ProfileIcon from './ProfileIcon';
import '../css/SODashboard.css';
function SOProfile() {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    company: 'Event Masters',
    address: '123 Event Street',
    avatar: null
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  return (
    <>
      <div className="container2">
        <Sidebar />
        <main className="main-content">
          <header className="header">
            <div className="header-icons">
              <NotificationIcon />
              <ProfileIcon />
            </div>
          </header>
          <div className="content">
            <div className="profile-section">
              <div className="profile-header-section">
                <div className="profile-avatar-container">
                  {profile.avatar ? (
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      className="profile-page-avatar"
                    />
                  ) : (
                    <FaUserCircle className="profile-page-avatar-icon" />
                  )}
                  <button className="avatar-upload-button">
                    <FaCamera />
                  </button>
                </div>
                <div className="profile-title">
                  <h1>{profile.name}</h1>
                  <p>{profile.email}</p>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h2>Profile Information</h2>
                  <button
                    className="edit-button"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <FaEdit /> {isEditing ? 'Cancel' : 'Edit'}
                  </button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="form-group">
                    <label>Company</label>
                    <input
                      type="text"
                      value={profile.company}
                      onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="form-group">
                    <label>Address</label>
                    <textarea
                      value={profile.address}
                      onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  {isEditing && (
                    <button type="submit" className="btn btn-primary">
                      Save Changes
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default SOProfile;