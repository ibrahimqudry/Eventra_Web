import React, { useState, useRef, useEffect } from "react";
import {
  Bell,
  Calendar,
  CreditCard,
  Settings as SettingsIcon,
  HelpCircle,
  LogOut,
  User,
  Mail,
  Phone,
  MessageCircle,
  ChevronRight,
  Plus,
  X,
  Ticket,
  Banknote,
  Users,
  MessageSquare,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  Edit,
  Upload,
  Save,
  ArrowRight,
  Bookmark,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../css/UserDashboard.css";
import { updateProfile } from "../redux/authSlice";
import { uploadToCloudinary } from '../utils/cloudinary';
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../firebase/config';

const UserDashboard = () => {
  // Add isEditing state
  const [isEditing, setIsEditing] = useState(false);

  const [userData, setUserData] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "reminder",
      title: "Upcoming Event",
      message: "Your event starts in 2 hours",
      time: "2 hours ago"
    },
    {
      id: 2,
      type: "confirmation",
      title: "Booking Confirmed",
      message: "Your ticket has been confirmed",
      time: "1 day ago"
    }
  ]);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  // Update initial states with user data
  const [userInfo, setUserInfo] = useState({
    name: userData?.fullName || "Loading...",
    email: userData?.email || "Loading...",
    phone: userData?.phone || "Not set",
    address: userData?.address || "Not set",
    bio: userData?.bio || "No bio available",
    age: userData?.age || "",
  });

  const profileImage = userData?.profileImage || "https://via.placeholder.com/256";


  const handleSave = async () => {
    try {
      const updatedUserData = {
        ...userData,
        ...userInfo,
        fullName: userInfo.name,
      };

      // Update in Firebase
      const userRef = doc(db, "users", userData.uid);
      await updateDoc(userRef, {
        fullName: userInfo.name,
        phone: userInfo.phone,
        age: userInfo.age,
      });

      // Update in localStorage
      localStorage.setItem('userData', JSON.stringify(updatedUserData));
      setUserData(updatedUserData);
      setIsEditing(false);

      // Show success message or notification
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  // Update sidebar user info
  const [activeSection, setActiveSection] = useState("dashboard");

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const imageUrl = await uploadToCloudinary(file);

      const updatedUserData = {
        ...userData,
        profileImage: imageUrl
      };

      // Update in Firebase
      const userRef = doc(db, "users", userData.uid);
      await updateDoc(userRef, { profileImage: imageUrl });

      // Update in localStorage
      localStorage.setItem('userData', JSON.stringify(updatedUserData));
      setUserData(updatedUserData);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div className="eventra-dashboard-content">
            <div className="eventra-stats-grid">
              <div className="eventra-stat-card">
                <div className="stat-icon">
                  <Calendar size={24} />
                </div>
                <div className="stat-info">
                  <h3>My Events</h3>
                  {/* <p className="stat-value">0 Upcoming</p> */}
                </div>
              </div>
              <div className="eventra-stat-card">
                <div className="stat-icon">
                  <Ticket size={24} />
                </div>
                <div className="stat-info">
                  <h3>My Tickets</h3>
                  {/* <p className="stat-value">0 Active</p> */}
                </div>
              </div>
              <div className="eventra-stat-card">
                <Link to="/savedEvents" className="stat-link">
                  <div className="stat-icon">
                    <Bookmark size={24} />
                  </div>
                  <div className="stat-info">
                    <h3>Saved Events</h3>
                    {/* <p className="stat-value">0 Saved</p> */}
                  </div>
                </Link>
              </div>
            </div>

            <div className="eventra-recent-activity">
              <h2>Recent Activity</h2>
              <div className="activity-list">
                {/* Add your activity items here */}
              </div>
            </div>
          </div>
        );

      // Update the settings section in renderContent
      case "settings":
        return (
          <div className="eventra-settings">
            <h2>Account Settings</h2>
            <div className="eventra-settings-form">
              <div className="settings-section">
                <div className="profile-photo-section">
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="profile-photo"
                  />
                  <div className="photo-upload">
                    <input
                      type="file"
                      id="photo-upload"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="photo-upload" className="upload-button">
                      <Upload size={20} />
                      Change Photo
                    </label>
                  </div>
                </div>
                <h3>Personal Information</h3>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={userInfo.email}
                    className="disabled-input"
                    disabled
                    style={{
                      background: '#f5f5f5',
                      cursor: 'not-allowed',
                      opacity: 0.7
                    }}
                  />
                </div>
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={userInfo.name}
                    onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Age</label>
                  <input
                    type="number"
                    min="13"
                    max="120"
                    value={userInfo.age}
                    onChange={(e) => setUserInfo({ ...userInfo, age: e.target.value })}
                    placeholder="Enter your age"
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    value={userInfo.phone}
                    onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                  />
                </div>
                <button className="save-button" onClick={handleSave}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="eventra-dashboard">
      <aside className="eventra-sidebar">
        <div className="eventra-user-profile">
          <img src={profileImage} alt="User" className="eventra-user-avatar" />
          <div className="eventra-user-info">
            <h3>{userData?.fullName || "Loading..."}</h3>
            <p>{userData?.email || "Loading..."}</p>
          </div>
        </div>
        <nav className="eventra-nav">
          <div className="eventra-nav-links">
            <button
              className={`nav-link ${activeSection === "dashboard" ? "active" : ""}`}
              onClick={() => setActiveSection("dashboard")}
            >
              <Calendar size={20} />
              <span>Dashboard</span>
            </button>
            <button
              className={`nav-link ${activeSection === "settings" ? "active" : ""}`}
              onClick={() => setActiveSection("settings")}
            >
              <SettingsIcon size={20} />
              <span>Settings</span>
            </button>
            <button 
              className="nav-link"
              onClick={() => {
                localStorage.removeItem('userData');
                window.location.href = '/login';
              }}
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </aside>

      <main className="eventra-main-content">
        <div className="eventra-header">
          <h1>Welcome back, {userData?.fullName?.split(' ')[0] || "User"}!</h1>
          <div className="eventra-notifications-dropdown">
            <button
              className="eventra-notifications-btn"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell size={24} />
              <span className="eventra-notification-badge">
                {notifications.length}
              </span>
            </button>

            {showNotifications && (
              <div className="eventra-notifications-panel">
                <div className="eventra-notifications-header">
                  <h3>Notifications</h3>
                  <button onClick={() => setShowNotifications(false)}>
                    <X size={20} />
                  </button>
                </div>
                <div className="eventra-notifications-list">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="eventra-notification-item"
                    >
                      <div
                        className="eventra-notification-icon"
                        style={{
                          background:
                            notification.type === "reminder"
                              ? "var(--primary-color)"
                              : notification.type === "confirmation"
                                ? "var(--success-color)"
                                : "var(--warning-color)",
                        }}
                      >
                        {notification.type === "reminder" ? (
                          <Bell size={20} />
                        ) : notification.type === "confirmation" ? (
                          <Check size={20} />
                        ) : (
                          <AlertCircle size={20} />
                        )}
                      </div>
                      <div className="eventra-notification-content">
                        <h4>{notification.title}</h4>
                        <p>{notification.message}</p>
                        <small>{notification.time}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {renderContent()}
      </main>
    </div>
  );
};

export default UserDashboard;

