import { useState } from 'react';

function Notifications() {
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

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? {...notification, read: true} : notification
    ));
  };

  return (
    <div>
      <h1>Notifications</h1>
      
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={`notification ${notification.read ? 'read' : ''}`}
          onClick={() => markAsRead(notification.id)}
        >
          <p>{notification.message}</p>
          <small>{notification.time}</small>
        </div>
      ))}
    </div>
  );
}

export default Notifications;