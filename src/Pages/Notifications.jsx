import React, { useState } from "react";
import "../css/Notifications.css";

const Notifications = () => {
  // Tested Notifications
  const [notifications, setNotifications] = useState([
    { id: "1", name: "Mariam", message: "We've got an exciting new event in Business, and we think you'll love it!", time: "8 mins ago", isNew: true },
    { id: "2", name: "Mariam", message: "Don't miss out! Register now or learn more about Tech Summit 2025", time: "10 mins ago", isNew: true },
    { id: "3", name: "Nathan Lucas", message: "Added New Event, Learn more !", time: "7 hrs ago", isNew: false },
  ]);

  // Function to Remove a Notification
  const removeNotification = (id) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  return (
    <div className="container">
      {/* If no notifications, show empty state */}
      {notifications.length === 0 ? (
        <div className="empty-container">
          <img src="../assets/empty.png" alt="Empty notifications" className="bell-image" />
          <div className="empty-text">Nothing here!!!</div>
          <div className="sub-text">Tap the notification settings button below and check again.</div>
          <button className="settings-button">
            <div className="button-text">Notification Settings</div>
          </button>
        </div>
      ) : (
        // Notifications List
        <div className="notifications-list">
          {notifications.map((item) => (
            <div key={item.id} className="notification-item">
              <div className="text-container">
                <div className="name">{item.name} <span className="message">{item.message}</span></div>
                <div className="time">{item.time}</div>
              </div>

              {/* Buttons */}
              <div className="buttons-container">
                <button className="ignore-button" onClick={() => removeNotification(item.id)}>
                  <span className="icon"><i class="fa-solid fa-xmark"></i></span>
                </button>
                <button className="accept-button" onClick={() => navigation.navigate("event-details")}>
                  <span className="icon-arrow">
                  <i class="fa-solid fa-arrow-right">
                  </i>
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;