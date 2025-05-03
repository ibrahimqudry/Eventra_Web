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
  Home,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { uploadToCloudinary } from "../utils/cloudinary";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { removeEvent } from "../redux/savedEventsSlice";
import "../css/UserDashboard.css";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "reminder",
      title: "Upcoming Event",
      message: "Your event starts in 2 hours",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "confirmation",
      title: "Booking Confirmed",
      message: "Your ticket has been confirmed",
      time: "1 day ago",
    },
  ]);

  const [reviews, setReviews] = useState(() => {
    const savedReviews = localStorage.getItem("eventReviews");
    return savedReviews ? JSON.parse(savedReviews) : [];
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    comment: "",
    rating: 0,
  });
  const [editId, setEditId] = useState(null);
  const [lovedComments, setLovedComments] = useState(() => {
    const savedLoves = localStorage.getItem("lovedComments");
    return savedLoves ? JSON.parse(savedLoves) : {};
  });

  useEffect(() => {
    localStorage.setItem("eventReviews", JSON.stringify(reviews));
    localStorage.setItem("lovedComments", JSON.stringify(lovedComments));
  }, [reviews, lovedComments]);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const [userInfo, setUserInfo] = useState({
    name: userData?.fullName || "Loading...",
    email: userData?.email || "Loading...",
    phone: userData?.phone || "Not set",
    address: userData?.address || "Not set",
    bio: userData?.bio || "No bio available",
    age: userData?.age || "",
  });

  const profileImage =
    userData?.profileImage || "https://via.placeholder.com/256";

  const handleSave = async () => {
    try {
      const updatedUserData = {
        ...userData,
        ...userInfo,
        fullName: userInfo.name,
      };

      const userRef = doc(db, "users", userData.uid);
      await updateDoc(userRef, {
        fullName: userInfo.name,
        phone: userInfo.phone,
        age: userInfo.age,
      });

      localStorage.setItem("userData", JSON.stringify(updatedUserData));
      setUserData(updatedUserData);
      setIsEditing(false);

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const imageUrl = await uploadToCloudinary(file);

      const updatedUserData = {
        ...userData,
        profileImage: imageUrl,
      };

      const userRef = doc(db, "users", userData.uid);
      await updateDoc(userRef, { profileImage: imageUrl });

      localStorage.setItem("userData", JSON.stringify(updatedUserData));
      setUserData(updatedUserData);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSubmit = () => {
    if (!form.name || !form.comment) return;

    if (editId !== null) {
      setReviews(
        reviews.map((r) =>
          r.id === editId ? { ...form, id: editId, date: r.date } : r
        )
      );
      setEditId(null);
    } else {
      setReviews([
        {
          ...form,
          id: Date.now(),
          date: new Date().toLocaleDateString(),
          loves: 0,
          replies: 0,
        },
        ...reviews,
      ]);
    }

    setForm({ name: "", email: "", comment: "", rating: 0 });
  };

  const handleEdit = (id) => {
    const review = reviews.find((r) => r.id === id);
    setForm(review);
    setEditId(id);
  };

  const handleDelete = (id) => {
    setReviews(reviews.filter((r) => r.id !== id));
  };

  const handleLove = (id) => {
    const userId =
      localStorage.getItem("userId") ||
      Math.random().toString(36).substring(2, 15);
    localStorage.setItem("userId", userId);

    setLovedComments((prev) => {
      const newLoves = { ...prev };
      if (!newLoves[id]) {
        newLoves[id] = [];
      }

      if (newLoves[id].includes(userId)) {
        newLoves[id] = newLoves[id].filter((u) => u !== userId);
      } else {
        newLoves[id] = [...newLoves[id], userId];
      }

      return newLoves;
    });

    setReviews(
      reviews.map((review) => {
        if (review.id === id) {
          return {
            ...review,
            loves: lovedComments[id] ? lovedComments[id].length : 0,
          };
        }
        return review;
      })
    );
  };

  const handleBookmark = (event) => {
    dispatch(removeEvent({ id: event.id }));
  };

  const savedEvents = useSelector((state) => state.savedEvents.savedEvents);

  const [activeSection, setActiveSection] = useState("dashboard");

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
                </div>
              </div>
              <div className="eventra-stat-card">
                <div className="stat-icon">
                  <Ticket size={24} />
                </div>
                <div className="stat-info">
                  <h3>My Tickets</h3>
                </div>
              </div>
              <div className="eventra-stat-card">
                <div className="stat-icon">
                  <Bookmark size={24} />
                </div>
                <div className="stat-info">
                  <h3>Saved Events</h3>
                </div>
              </div>
            </div>

            <div className="eventra-recent-activity">
              <h2>Recent Activity</h2>
              <div className="activity-list"></div>
            </div>
          </div>
        );

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
                      style={{ display: "none" }}
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
                      background: "#f5f5f5",
                      cursor: "not-allowed",
                      opacity: 0.7,
                    }}
                  />
                </div>
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={userInfo.name}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, name: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Age</label>
                  <input
                    type="number"
                    min="13"
                    max="120"
                    value={userInfo.age}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, age: e.target.value })
                    }
                    placeholder="Enter your age"
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    value={userInfo.phone}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, phone: e.target.value })
                    }
                  />
                </div>
                <button className="save-button" onClick={handleSave}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        );

      case "reviews":
        return (
          <div className="eventra-reviews-section">
            <h2 className="eventra-reviews-title">Customer Reviews</h2>
            {reviews.map((review) => (
              <div className="eventra-review-card" key={review.id}>
                <div className="eventra-review-header">
                  <div>
                    <h3>{review.name}</h3>
                    <p className="eventra-review-date">{review.date}</p>
                    <div className="eventra-stars">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>{i < review.rating ? "★" : "☆"}</span>
                      ))}
                    </div>
                  </div>
                  <div className="eventra-review-actions">
                    <span
                      className="eventra-love-icon"
                      onClick={() => handleLove(review.id)}
                      style={{
                        color: lovedComments[review.id]?.includes(
                          localStorage.getItem("userId")
                        )
                          ? "red"
                          : "gray",
                      }}
                    >
                      ❤ {lovedComments[review.id]?.length || 0}
                    </span>
                    <button
                      className="eventra-review-edit"
                      onClick={() => handleEdit(review.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="eventra-review-delete"
                      onClick={() => handleDelete(review.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p>{review.comment}</p>
              </div>
            ))}

            <div className="eventra-form-card">
              <h3>Submit Your Review</h3>
              <div className="eventra-stars">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="eventra-star-select"
                    onClick={() => setForm({ ...form, rating: i + 1 })}
                  >
                    {i < form.rating ? "★" : "☆"}
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <textarea
                placeholder="Write your review..."
                value={form.comment}
                onChange={(e) => setForm({ ...form, comment: e.target.value })}
              />
              <button onClick={handleSubmit}>
                {editId !== null ? "Update Review" : "Submit Review"}
              </button>
            </div>
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
                    <div className="empty-state">
                        <img 
                            src="https://cdn-icons-png.flaticon.com/512/4076/4076478.png" 
                            // src="img/empty.jpg" 
                            alt="No events"
                            className="empty-icon"
                        />
                        <h3>No Saved Events Yet</h3>
                        <p className="empty-message">
                            You haven't saved any events. Start exploring and save your favorites!
                        </p>
                        <Link to="/events" className="empty-action-btn">
                            <Plus size={16} />
                            Browse Events
                        </Link>
                    </div>
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
              className={`nav-link ${
                activeSection === "dashboard" ? "active" : ""
              }`}
              onClick={() => setActiveSection("dashboard")}
            >
              <Calendar size={20} />
              <span>Dashboard</span>
            </button>
            <button
              className={`nav-link ${
                activeSection === "settings" ? "active" : ""
              }`}
              onClick={() => setActiveSection("settings")}
            >
              <SettingsIcon size={20} />
              <span>Settings</span>
            </button>
            <button
              className={`nav-link ${
                activeSection === "reviews" ? "active" : ""
              }`}
              onClick={() => setActiveSection("reviews")}
            >
              <MessageSquare size={20} />
              <span>Reviews</span>
            </button>

            <button
              className={`nav-link ${
                activeSection === "saved-events" ? "active" : ""
              }`}
              onClick={() => setActiveSection("saved-events")}
            >
              <Bookmark size={20} />
              <span>Saved Events</span>
            </button>
            <Link
              to="/"
              className={`nav-link ${activeSection === "home" ? "active" : ""}`}
              onClick={() => setActiveSection("home")}
            >
              <Home size={20} />
              <span>Home</span>
            </Link>
            <Link to="/login" className="nav-link">
              <button className="nav-link">
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </Link>
          </div>
        </nav>
      </aside>

      <main className="eventra-main-content">
        <div className="eventra-header">
          <h1>Welcome back, {userData?.fullName?.split(" ")[0] || "User"}!</h1>
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