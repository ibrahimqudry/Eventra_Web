import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { 
  Settings as SettingsIcon, 
  LogOut, 
  Calendar, 
  Bookmark,
  Bell,
  User,
  Edit,
  Upload,
  Save
} from "lucide-react";
import "../css/userDashboard.css";
import { updateProfile } from "../redux/authSlice";

const UserDashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isEditing, setIsEditing] = useState(false);
  
  const profileImage = user?.profileImage || "./assets/avatar.jpg";
  const [userInfo, setUserInfo] = useState({
    name: user ? `${user.firstName} ${user.lastName}` : "John Doe",
    email: user?.email || "john@example.com",
  });
  
  const fileInputRef = useRef(null);

  const handleEditClick = () => setIsEditing(!isEditing);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(updateProfile({ profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field, value) => {
    setUserInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    dispatch(updateProfile({
      firstName: userInfo.name.split(" ")[0],
      lastName: userInfo.name.split(" ")[1] || "",
      email: userInfo.email
    }));
  };

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <section className="user-settings-section">
            <h2>Profile Settings</h2>
            <div className="settings-container">
              <div className="profile-image-upload">
                <div className="user-avatar-large">
                  <img src={profileImage} alt="User avatar" />
                </div>
                {isEditing && (
                  <div className="profile-actions">
                    <button 
                      className="upload-btn" 
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload size={16} /> Upload New Photo
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      style={{ display: "none" }}
                    />
                  </div>
                )}
              </div>
              <div className="user-details">
                <div className="detail-group">
                  <span>Name:</span>
                  {isEditing ? (
                    <input
                      type="text"
                      value={userInfo.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                    />
                  ) : (
                    <span>{userInfo.name}</span>
                  )}
                </div>
                <div className="detail-group">
                  <span>Email:</span>
                  {isEditing ? (
                    <input
                      type="email"
                      value={userInfo.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                  ) : (
                    <span>{userInfo.email}</span>
                  )}
                </div>
                <button 
                  className="edit-btn"
                  onClick={isEditing ? handleSave : handleEditClick}
                >
                  {isEditing ? <Save size={20} /> : <Edit size={20} />}
                  {isEditing ? "Save" : "Edit"}
                </button>
              </div>
            </div>
          </section>
        );
      // Add other cases as needed from the second version
      default:
        return null;
    }
  };

  return (
    <div className="user-dashboard-container">
      <aside className="user-dashboard-sidebar">
        <div className="user-profile-info">
          <div className="user-avatar">
            <img src={profileImage} alt="User avatar" />
          </div>
          <p>{userInfo.name}</p>
        </div>
        <nav className="user-dashboard-menu">
          <div 
            className={`menu-item ${activeSection === "dashboard" ? "menu-item-active" : ""}`}
            onClick={() => setActiveSection("dashboard")}
          >
            <SettingsIcon size={20} /> Settings
          </div>
          <Link to="/Notifications">
            <div className="menu-item">
              <Bell size={20} /> Notifications
            </div>
          </Link>
          <Link to="/SavedEvents">
            <div className="menu-item">
              <Bookmark size={20} /> Saved Events
            </div>
          </Link>
          <div className="menu-item">
            <Calendar size={20} /> Scheduled Events
          </div>
          <div className="menu-item">
            <LogOut size={20} /> Logout
          </div>
        </nav>
      </aside>
      
      <main className="user-dashboard-content">
        {renderContent()}
      </main>
    </div>
  );
};

export default UserDashboard;