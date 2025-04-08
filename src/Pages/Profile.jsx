import React from 'react'
import SideNav from '../components/SideNav';
import TopNav from '../components/TopNav';
import "../css/Profile.css";

function Profile() {
    return (
      <>
        <body>
          <SideNav />

        <main className="main-content">
          <TopNav />
          <div className="profile-content">
            <div className="profile-header">
              <div className="profile-cover">
                <img src="img/ev1.avif" alt="Cover Photo" />
                <button className="edit-cover"><i className="fas fa-camera"></i> Change Cover</button>
              </div>
              <div className="profile-info">
                <div className="profile-avatar">
                  <img src="img/john.avif" alt="John Doe" />
                  <button className="edit-avatar"><i className="fas fa-camera"></i></button>
                </div>
                <div className="profile-details">
                  <h1>John Doe</h1>
                  <p>Event Manager</p>
                  <div className="profile-stats">
                    <div className="stat">
                      <span className="stat-value">24</span>
                      <span className="stat-label">Events</span>
                    </div>
                    <div className="stat">
                      <span className="stat-value">1,234</span>
                      <span className="stat-label">Attendees</span>
                    </div>
                    <div className="stat">
                      <span className="stat-value">4.8</span>
                      <span className="stat-label">Rating</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-body">
              <div className="profile-section">
                <h2>Personal Information</h2>
                <form className="profile-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>First Name</label>
                      <input type="text" value="John" />
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <input type="text" value="Doe" />
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
                    <textarea rows="4">Experienced event manager with a passion for creating memorable experiences. Specialized in tech conferences and corporate events.</textarea>
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="btn-primary">Save Changes</button>
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
                    <button type="submit" className="btn-primary">Update Password</button>
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
            </div>
          </div>
        </main>
      </body>
    </>
  );
}
export default Profile;