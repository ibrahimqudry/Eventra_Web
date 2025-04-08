import { useState } from 'react';
import { IoNotificationsOutline } from 'react-icons/io5';

function NotificationIcon() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: 'New booking request for Wedding Hall',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      message: 'Customer review received',
      time: '5 hours ago',
      read: true
    }
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? {...notification, read: true} : notification
    ));
  };

  return (
    <div className="notification-icon-container">
      <button 
        className="notification-icon-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <IoNotificationsOutline size={24} />
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount}</span>
        )}
      </button>

      {isOpen && (
        <div className="notification-dropdown">
          <h3>Notifications</h3>
          {notifications.length > 0 ? (
            notifications.map(notification => (
              <div
                key={notification.id}
                className={`notification-item ${notification.read ? 'read' : ''}`}
                onClick={() => markAsRead(notification.id)}
              >
                <p>{notification.message}</p>
                <small>{notification.time}</small>
              </div>
            ))
          ) : (
            <p className="no-notifications">No notifications</p>
          )}
        </div>
      )}
    </div>
  );
}

export default NotificationIcon;