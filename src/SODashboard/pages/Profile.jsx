import React from "react";
import { Link } from "react-router-dom";
import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar";
import "../css/profile.css";

const Profile = () => {
  return (
    <div className="profile-container">
        <Sidebar />

      <main className="main-content">
        <TopBar />

        <div className="profile-content">
          <div className="profile-header">
            <div className="profile-cover">
              <img
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                alt="Cover Photo"
              />
              <button className="edit-cover">
                <i className="fas fa-camera"></i>
                Change Cover
              </button>
            </div>
            <div className="profile-info">
              <div className="profile-avatar">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Ahmed Hassan"
                />
                <button className="edit-avatar">
                  <i className="fas fa-camera"></i>
                </button>
              </div>
              <div className="profile-details">
                <h1>Ahmed Hassan</h1>
                <p>Wedding Hall & Event Venue Owner</p>
                <div className="profile-stats">
                  <div className="stat">
                    <span className="stat-value">12</span>
                    <span className="stat-label">Services</span>
                  </div>
                  <div className="stat">
                    <span className="stat-value">156</span>
                    <span className="stat-label">Bookings</span>
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
                    <input type="text" defaultValue="Ahmed" />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" defaultValue="Hassan" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      defaultValue="ahmed.hassan@example.com"
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input type="tel" defaultValue="+20 123 456 7890" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Bio</label>
                  <textarea
                    rows="4"
                    defaultValue="Experienced event venue owner with over 10 years in the industry. Specializing in weddings, corporate events, and special occasions."
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>

            <div className="profile-section">
              <h2>Business Information</h2>
              <form className="profile-form">
                <div className="form-group">
                  <label>Business Name</label>
                  <input type="text" defaultValue="Royal Events & Venues" />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Business Type</label>
                    <select defaultValue="venue">
                      <option value="venue">Event Venue</option>
                      <option value="catering">Catering Service</option>
                      <option value="photography">Photography</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Years in Business</label>
                    <input type="number" defaultValue="10" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Business Address</label>
                  <input
                    type="text"
                    defaultValue="123 Event Street, Cairo, Egypt"
                  />
                </div>
                <div className="form-group">
                  <label>Business Description</label>
                  <textarea
                    rows="4"
                    defaultValue="Premier event venue provider in Cairo, offering elegant spaces for weddings, corporate events, and special occasions. Known for exceptional service and attention to detail."
                  />
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
                    <p>Receive email updates about your bookings</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="notification-option">
                  <div>
                    <h3>SMS Notifications</h3>
                    <p>Receive text messages for urgent updates</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
