import React, { useState, useEffect } from 'react'
import SideNav from '../components/SideNav';
import TopNav from '../components/TopNav';
import "../css/Profile.css";

function Profile() {
    const [userData, setUserData] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        // ... other form fields
    });

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
            setFormData(JSON.parse(storedUserData));
        }
    }, []);

    if (!userData) {
        return <div>Loading...</div>;
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedUserData = {
            ...userData,
            ...formData
        };
        localStorage.setItem('userData', JSON.stringify(updatedUserData));
        setUserData(updatedUserData);
        alert('Profile updated successfully!');
    };

    return (
      <div className="profile-container">
        <SideNav />
        <main className="main-profile-content">
          <TopNav />
          <div className="profile-content-em">
            <div className="profile-header-em">
              <div className="profile-cover-em">
                <img
                  src={userData.coverPhoto || "img/ev1.avif"}
                  alt="Cover Photo"
                />
                <button className="edit-cover-em">
                  <i className="fas fa-camera"></i> Change Cover
                </button>
              </div>
              <div className="profile-info-em">
                <div className="profile-avatar-em">
                  <img
                    src={userData.profileImage || "img/john.avif"}
                    alt={userData.fullName}
                  />
                  <button className="edit-avatar-em">
                    <i className="fas fa-camera"></i>
                  </button>
                </div>
                <div className="profile-details-em">
                  <h1>{userData.fullName || "User"}</h1>
                  <p>{userData.role || "User"}</p>
                  <div className="profile-stats">
                    <div className="stat">
                      <span className="stat-value">
                        {userData.eventsCount || 0}
                      </span>
                      <span className="stat-label">Events</span>
                    </div>
                    <div className="stat">
                      <span className="stat-value">
                        {userData.attendeesCount || 0}
                      </span>
                      <span className="stat-label">Attendees</span>
                    </div>
                    <div className="stat">
                      <span className="stat-value">{userData.rating || 0}</span>
                      <span className="stat-label">Rating</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="profile-body">
              <div className="profile-section">
                <h2>Personal Information</h2>
                <form className="profile-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Email</label>
                      <input type="email" value="john.doe@example.com" />
                    </div>
                    <div className="form-group">
                      <label>Phone</label>
                      <input type="tel" value="+1 (555) 123-4567" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Bio</label>
                    <textarea rows="4">
                      Experienced event manager with a passion for creating
                      memorable experiences. Specialized in tech conferences and
                      corporate events.
                    </textarea>
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="btn-primary">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>

              <div className="profile-section">
                <h2>Password & Security</h2>
                <form className="profile-form">
                  <div className="form-group">
                    <label>Current Password</label>
                    <input type="password" />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>New Password</label>
                      <input type="password" />
                    </div>
                    <div className="form-group">
                      <label>Confirm Password</label>
                      <input type="password" />
                    </div>
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="btn-primary">
                      Update Password
                    </button>
                  </div>
                </form>
              </div>

              <div className="profile-section">
                <h2>Notifications</h2>
                <div className="notification-settings">
                  <div className="notification-option">
                    <div>
                      <h3>Email Notifications</h3>
                      <p>Receive email updates about your events</p>
                    </div>
                    <label className="switch">
                      <input type="checkbox" checked />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="notification-option">
                    <div>
                      <h3>Push Notifications</h3>
                      <p>Receive push notifications on your device</p>
                    </div>
                    <label className="switch">
                      <input type="checkbox" checked />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="notification-option">
                    <div>
                      <h3>SMS Notifications</h3>
                      <p>Receive text messages for important updates</p>
                    </div>
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="profile-section">
                <h2>Connected Accounts</h2>
                <div className="connected-accounts">
                  <div className="account-option">
                    <div className="account-info">
                      <i className="fab fa-google"></i>
                      <div>
                        <h3>Google</h3>
                        <p>Connected as john.doe@gmail.com</p>
                      </div>
                    </div>
                    <button className="btn-secondary">Disconnect</button>
                  </div>
                  <div className="account-option">
                    <div className="account-info">
                      <i className="fab fa-facebook"></i>
                      <div>
                        <h3>Facebook</h3>
                        <p>Not connected</p>
                      </div>
                    </div>
                    <button className="btn-secondary">Connect</button>
                  </div>
                  <div className="account-option">
                    <div className="account-info">
                      <i className="fab fa-twitter"></i>
                      <div>
                        <h3>Twitter</h3>
                        <p>Not connected</p>
                      </div>
                    </div>
                    <button className="btn-secondary">Connect</button>
                  </div>
                </div>
              </div>
            </div>{" "}
            {/* closes profile-body */}
          </div>{" "}
          {/* closes profile-content */}
          {/* closes profile-header */}
        </main>{" "}
        {/* closes main-profile-content */}
      </div>
    );
}

export default Profile;