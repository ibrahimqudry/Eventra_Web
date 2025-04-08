import React from 'react';
import '../css/UserDashboard.css';
import { Link } from 'react-router';

function UserDashboard() {
  return (
    <>
      <div className="user-dashboard-container">
        <aside className="user-dashboard-sidebar">
          <div className="user-profile-info">
            <div className="user-avatar">
              <img src="./assets/avatar.jpg" alt="User avatar" />
            </div>
            <p>John Doe</p>
          </div>
          <nav className="user-dashboard-menu">
            <ul>
              <li className="menu-item-active">
                <i className="fa-solid fa-gears" /> Settings
              </li>
              <li className="menu-item">
                {/* <Link to="``>"> */}
                <i className="fa-solid fa-bell" /> Notifications
                {/* </Link> */}
              </li>
              <li className="menu-item">
                <i className="fa-solid fa-clipboard-list" /> Scheduled Events
              </li>
              <li className="menu-item">
                <i className="fa-solid fa-ticket-simple" /> Your Tickets
              </li>
              <li className="menu-item">
                <i className="fa-solid fa-money-check-dollar" /> Bank Accounts
              </li>
              <li className="menu-item">
                <i className="fa-solid fa-comments" /> Community room
              </li>
              <li className="menu-item">
                <i className="fa-solid fa-phone" /> Help/Support
              </li>
              <li className="menu-item">
                <i className="fa-solid fa-arrow-right-from-bracket" /> Logout
              </li>
            </ul>
          </nav>
        </aside>
        <main className="user-dashboard-content">
          <section className="user-settings-section">
            <h2>Settings</h2>
            <p>Manage your account preferences</p>
            <div className="settings-container">
              <div className="settings-content-wrapper">
                <div className="profile-image-upload">
                  <div className="user-avatar-large">
                    <img src="./assets/avatar.jpg" alt="User avatar" />
                  </div>
                  <div className="profile-actions">
                    <h3>John Doe</h3>
                    <button className="upload-btn">Upload New Photo</button>
                    <button className="delete-btn">Delete</button>
                  </div>
                </div>
                <form className="profile-form">
                  <label className="form-label">
                    Name <input type="text" className="form-input" />
                  </label>
                  <label className="form-label">
                    Email Address <input type="email" className="form-input" />
                  </label>
                  <label className="form-label">
                    Phone Number <input type="text" className="form-input" />
                  </label>
                  <label className="form-label">
                    Country <input type="text" className="form-input" />
                  </label>
                  <label className="form-label">
                    City <input type="text" className="form-input" />
                  </label>
                  <label className="form-label">
                    State <input type="text" className="form-input" />
                  </label>
                </form>
                <div className="interests-section">
                  <h3 className="section-title">
                    <span className="icon-wrapper">
                      <i className="fa-solid fa-plus" />
                    </span>
                    Add Interests
                  </h3>
                  <div className="interest-tags">
                    <button className="interest-tag">Books</button>
                    <button className="interest-tag">Finance</button>
                    <button className="interest-tag">Fashion</button>
                    <button className="interest-tag">Medical</button>
                    <button className="interest-tag">Technology</button>
                    <button className="interest-tag">Business</button>
                  </div>
                </div>
                <div className="form-actions">
                  <button className="cancel-btn">Cancel</button>
                  <button className="save-btn">Save Changes</button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default UserDashboard