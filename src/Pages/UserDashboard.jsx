import React, { useState, useRef } from "react";
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
import { useSelector } from "react-redux";
import "../css/UserDashboard.css";

const UserDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [showNotifications, setShowNotifications] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  );
  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 890",
    address: "123 Main St, New York, NY",
    bio: "Event enthusiast and tech lover",
  });
  const fileInputRef = useRef(null);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    language: "en",
    timeZone: "UTC",
  });
  const [, setShowChatSupport] = useState(false);

  const tickets = [
    {
      id: 1,
      eventName: "Tech Summit 2024",
      ticketType: "VIP Pass",
      date: "Apr 15, 2024",
      qrCode:
        "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=VIP123456",
    },
    {
      id: 2,
      eventName: "Design Conference",
      ticketType: "Standard Pass",
      date: "May 20, 2024",
      qrCode:
        "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=STD789012",
    },
  ];
  const bankAccounts = [
    {
      id: 1,
      bank: "Universal Bank",
      number: "**** **** **** 1234",
      holder: "John Doe",
      expiry: "12/25",
    },
    {
      id: 2,
      bank: "Global Bank",
      number: "**** **** **** 5678",
      holder: "John Doe",
      expiry: "09/26",
    },
  ];
  const savedEvents = useSelector((state) => state.savedEvents.savedEvents);

  const notifications = [
    {
      id: 1,
      title: "New Event Reminder",
      message: "Tech Summit 2024 starts in 2 days",
      time: "2 hours ago",
      type: "reminder",
    },
    {
      id: 2,
      title: "Ticket Confirmation",
      message: "Your ticket for Design Conference has been confirmed",
      time: "1 day ago",
      type: "confirmation",
    },
    {
      id: 3,
      title: "Special Offer",
      message: "Early bird tickets available for Startup Weekend",
      time: "2 days ago",
      type: "offer",
    },
  ];

  const scheduledEvents = [
    {
      id: 1,
      name: "Tech Summit 2024",
      date: { day: "15", month: "APR" },
      location: "San Francisco",
      time: "9:00 AM",
    },
    {
      id: 2,
      name: "Design Conference",
      date: { day: "20", month: "MAY" },
      location: "New York",
      time: "10:00 AM",
    },
  ];

  const handleSettingsChange = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logging out...");
  };

  const handleAddEvent = () => {
    // Implement add event logic here
    console.log("Adding new event...");
  };

  const handleAddTicket = () => {
    // Implement add ticket logic here
    console.log("Adding new ticket...");
  };

  const handleAddBankAccount = () => {
    // Implement add bank account logic here
    console.log("Adding new bank account...");
  };

  const handleSupportOption = (option) => {
    // التعامل مع خيارات الدعم المختلفة
    switch (option) {
      case "email":
        window.location.href = "mailto:support@eventera.com";
        break;
      case "phone":
        window.location.href = "tel:+1234567890";
        break;
      case "chat":
        // فتح نافذة الدردشة
        setShowChatSupport(true);
        break;
      default:
        console.log("خيار دعم غير معروف");
    }

    // تسجيل طلب الدعم
    const supportRequest = {
      type: option,
      timestamp: new Date().toISOString(),
      userId: userInfo.id,
    };

    console.log(`تم بدء طلب الدعم عبر ${option}:`, supportRequest);
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field, value) => {
    setUserInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically make an API call to save the changes
    console.log("Saving changes:", userInfo);
  };

  const handleBookmark = (event) => {
    // Here you would typically dispatch an action to remove the event from saved events
    console.log("Removing event from saved events:", event);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <>
            <div className="eventra-account-section">
              <div className="eventra-account-header">
                <h2 className="eventra-account-title">Account Information</h2>
                <button
                  className="eventra-edit-btn"
                  onClick={isEditing ? handleSave : handleEditClick}
                >
                  {isEditing ? <Save size={20} /> : <Edit size={20} />}
                  {isEditing ? "Save Changes" : "Edit Profile"}
                </button>
              </div>
              <div className="eventra-account-content">
                <div className="eventra-profile-picture">
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="eventra-profile-image"
                    onClick={() => fileInputRef.current?.click()}
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    style={{ display: "none" }}
                  />
                  {isEditing && (
                    <button
                      className="eventra-upload-btn"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload size={16} />
                      Change Photo
                    </button>
                  )}
                </div>
                <div className="eventra-account-details">
                  <div className="eventra-detail-group">
                    <span className="eventra-detail-label">Full Name</span>
                    {isEditing ? (
                      <input
                        type="text"
                        className="eventra-detail-input"
                        value={userInfo.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                      />
                    ) : (
                      <span className="eventra-detail-value">
                        {userInfo.name}
                      </span>
                    )}
                  </div>
                  <div className="eventra-detail-group">
                    <span className="eventra-detail-label">Email</span>
                    {isEditing ? (
                      <input
                        type="email"
                        className="eventra-detail-input"
                        value={userInfo.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                      />
                    ) : (
                      <span className="eventra-detail-value">
                        {userInfo.email}
                      </span>
                    )}
                  </div>
                  <div className="eventra-detail-group">
                    <span className="eventra-detail-label">Phone</span>
                    {isEditing ? (
                      <input
                        type="tel"
                        className="eventra-detail-input"
                        value={userInfo.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                      />
                    ) : (
                      <span className="eventra-detail-value">
                        {userInfo.phone}
                      </span>
                    )}
                  </div>
                  <div className="eventra-detail-group">
                    <span className="eventra-detail-label">Address</span>
                    {isEditing ? (
                      <input
                        type="text"
                        className="eventra-detail-input"
                        value={userInfo.address}
                        onChange={(e) =>
                          handleInputChange("address", e.target.value)
                        }
                      />
                    ) : (
                      <span className="eventra-detail-value">
                        {userInfo.address}
                      </span>
                    )}
                  </div>
                  <div
                    className="eventra-detail-group"
                    style={{ gridColumn: "1 / -1" }}
                  >
                    <span className="eventra-detail-label">Bio</span>
                    {isEditing ? (
                      <textarea
                        className="eventra-detail-input"
                        value={userInfo.bio}
                        onChange={(e) =>
                          handleInputChange("bio", e.target.value)
                        }
                        rows={3}
                      />
                    ) : (
                      <span className="eventra-detail-value">
                        {userInfo.bio}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="eventra-dashboard-grid">
              {/* Scheduled Events */}
              <div className="eventra-dashboard-card">
                <div className="eventra-card-header">
                  <h3 className="eventra-card-title">Scheduled Events</h3>
                  <button className="eventra-btn-icon" onClick={handleAddEvent}>
                    <Plus size={20} />
                  </button>
                </div>
                <div className="eventra-event-list">
                  {scheduledEvents.map((event) => (
                    <div key={event.id} className="eventra-event-item">
                      <div className="eventra-event-date">
                        <div className="eventra-event-date-day">
                          {event.date.day}
                        </div>
                        <div className="eventra-event-date-month">
                          {event.date.month}
                        </div>
                      </div>
                      <div className="eventra-event-details">
                        <h4>{event.name}</h4>
                        <p>
                          {event.location} • {event.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Your Tickets */}
              <div className="eventra-dashboard-card">
                <div className="eventra-card-header">
                  <h3 className="eventra-card-title">Your Tickets</h3>
                  <button
                    className="eventra-btn-icon"
                    onClick={handleAddTicket}
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <div className="eventra-ticket-list">
                  {tickets.map((ticket) => (
                    <div key={ticket.id} className="eventra-ticket-item">
                      <div className="eventra-ticket-info">
                        <h4>{ticket.eventName}</h4>
                        <p>
                          {ticket.ticketType} • {ticket.date}
                        </p>
                      </div>
                      <div className="eventra-ticket-qr">
                        <img src={ticket.qrCode} alt="QR Code" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bank Accounts */}
              <div className="eventra-dashboard-card">
                <div className="eventra-card-header">
                  <h3 className="eventra-card-title">Bank Accounts</h3>
                  <button
                    className="eventra-btn-icon"
                    onClick={handleAddBankAccount}
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <div className="eventra-bank-accounts">
                  {bankAccounts.map((account) => (
                    <div key={account.id} className="eventra-bank-card">
                      <div className="eventra-bank-name">{account.bank}</div>
                      <div className="eventra-card-number">
                        {account.number}
                      </div>
                      <div className="eventra-card-holder">
                        {account.holder}
                      </div>
                      <div className="eventra-card-expiry">
                        Expires {account.expiry}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Support */}
              <div className="eventra-dashboard-card">
                <div className="eventra-card-header">
                  <h3 className="eventra-card-title">Help & Support</h3>
                </div>
                <div className="eventra-support-options">
                  <div
                    className="eventra-support-option"
                    onClick={() => handleSupportOption("email")}
                  >
                    <div className="eventra-support-icon">
                      <Mail size={24} />
                    </div>
                    <h4>Email</h4>
                  </div>
                  <div
                    className="eventra-support-option"
                    onClick={() => handleSupportOption("phone")}
                  >
                    <div className="eventra-support-icon">
                      <Phone size={24} />
                    </div>
                    <h4>Phone</h4>
                  </div>
                  <div
                    className="eventra-support-option"
                    onClick={() => handleSupportOption("chat")}
                  >
                    <div className="eventra-support-icon">
                      <MessageCircle size={24} />
                    </div>
                    <h4>Chat</h4>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="eventra-dashboard-card">
                <div className="eventra-card-header">
                  <h3 className="eventra-card-title">Quick Links</h3>
                </div>
                <div className="eventra-quick-links">
                  <Link to="/events" className="eventra-quick-link">
                    <div className="eventra-quick-link-content">
                      <Calendar size={24} />
                      <div>
                        <h4>Events</h4>
                        <p>Browse and book events</p>
                      </div>
                    </div>
                    <ArrowRight size={20} />
                  </Link>
                  <Link to="/Servses" className="eventra-quick-link">
                    <div className="eventra-quick-link-content">
                      <HelpCircle size={24} />
                      <div>
                        <h4>Services</h4>
                        <p>Explore our services</p>
                      </div>
                    </div>
                    <ArrowRight size={20} />
                  </Link>
                </div>
              </div>
            </div>
          </>
        );

      case "settings":
        return (
          <div className="eventra-dashboard-card">
            <div className="eventra-card-header">
              <h3 className="eventra-card-title">Settings</h3>
            </div>
            <form className="eventra-settings-form">
              <div className="eventra-form-group">
                <label>Email Notifications</label>
                <div className="eventra-toggle-switch">
                  <input
                    type="checkbox"
                    id="emailNotif"
                    checked={settings.emailNotifications}
                    onChange={(e) =>
                      handleSettingsChange(
                        "emailNotifications",
                        e.target.checked
                      )
                    }
                  />
                  <label className="toggle-label" htmlFor="emailNotif">
                    Receive email updates about your events
                  </label>
                </div>
              </div>
              <div className="eventra-form-group">
                <label>SMS Notifications</label>
                <div className="eventra-toggle-switch">
                  <input
                    type="checkbox"
                    id="smsNotif"
                    checked={settings.smsNotifications}
                    onChange={(e) =>
                      handleSettingsChange("smsNotifications", e.target.checked)
                    }
                  />
                  <label className="toggle-label" htmlFor="smsNotif">
                    Receive text messages for important updates
                  </label>
                </div>
              </div>
              <div className="eventra-form-group">
                <label>Language</label>
                <select
                  value={settings.language}
                  onChange={(e) =>
                    handleSettingsChange("language", e.target.value)
                  }
                >
                  <option value="en">English</option>
                  <option value="ar">Arabic</option>
                  <option value="fr">French</option>
                </select>
              </div>
              <div className="eventra-form-group">
                <label>Time Zone</label>
                <select
                  value={settings.timeZone}
                  onChange={(e) =>
                    handleSettingsChange("timeZone", e.target.value)
                  }
                >
                  <option value="utc">UTC</option>
                  <option value="est">EST</option>
                  <option value="pst">PST</option>
                </select>
              </div>
            </form>
          </div>
        );

      case "saved-events":
        return (
          <div className="eventra-dashboard-card">
            <div className="eventra-card-header">
              <h3 className="eventra-card-title">Saved Events</h3>
            </div>
            <div className="eventra-saved-events">
              {savedEvents && savedEvents.length > 0 ? (
                savedEvents.map((event) => (
                  <div key={event.id} className="eventra-saved-event">
                    <div className="eventra-saved-event-image">
                      <img src={event.image} alt={event.title} />
                      <div className="eventra-saved-event-date">
                        <span className="eventra-saved-event-day">
                          {event.date.day}
                        </span>
                        <span className="eventra-saved-event-month">
                          {event.date.month}
                        </span>
                      </div>
                    </div>
                    <div className="eventra-saved-event-details">
                      <h4>{event.title}</h4>
                      <p className="eventra-saved-event-location">
                        <i className="fas fa-map-marker-alt"></i>{" "}
                        {event.location}
                      </p>
                      <p className="eventra-saved-event-time">
                        <i className="fas fa-clock"></i> {event.time}
                      </p>
                      <div className="eventra-saved-event-actions">
                        <Link
                          to={`/event-details/${event.id}`}
                          className="eventra-view-btn"
                        >
                          View Details
                        </Link>
                        <button
                          className="eventra-remove-btn"
                          onClick={() => handleBookmark(event)}
                        >
                          <Bookmark size={16} />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="eventra-no-events">
                  <Bookmark size={48} />
                  <p>No saved events yet</p>
                  <Link to="/events" className="eventra-browse-btn">
                    Browse Events
                  </Link>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="eventra-dashboard">
      {/* Sidebar */}
      <aside className="eventra-sidebar">
        <div className="eventra-user-profile">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="User"
            className="eventra-user-avatar"
          />
          <div className="eventra-user-info">
            <h3>John Doe</h3>
            <p>john@example.com</p>
          </div>
        </div>

        <nav>
          <div className="eventra-nav-links">
            <div
              className={`eventra-nav-link ${
                activeSection === "dashboard" ? "active" : ""
              }`}
              onClick={() => setActiveSection("dashboard")}
            >
              <Calendar size={20} />
              <span>Dashboard</span>
            </div>
            <div
              className={`eventra-nav-link ${
                activeSection === "saved-events" ? "active" : ""
              }`}
              onClick={() => setActiveSection("saved-events")}
            >
              <Bookmark size={20} />
              <span>Saved Events</span>
            </div>
            <div
              className={`eventra-nav-link ${
                activeSection === "settings" ? "active" : ""
              }`}
              onClick={() => setActiveSection("settings")}
            >
              <SettingsIcon size={20} />
              <span>Settings</span>
            </div>
            <div className="eventra-nav-link" onClick={handleLogout}>
              <LogOut size={20} />
              <span>Logout</span>
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="eventra-main-content">
        <div className="eventra-header">
          <h1>Welcome back, John!</h1>
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
