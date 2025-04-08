import { useState } from 'react';
import Sidebar from './Sidebar';
import NotificationIcon from './NotificationIcon';
import ProfileIcon from './ProfileIcon';
import '../css/SODashboard.css';

function SOBookings() {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      service: 'Wedding Hall',
      customer: 'Alice Johnson',
      date: '2024-04-15',
      status: 'pending'
    },
    {
      id: 2,
      service: 'Conference Room',
      customer: 'Bob Smith',
      date: '2024-04-20',
      status: 'confirmed'
    }
  ]);

  const updateBookingStatus = (id, status) => {
    setBookings(bookings.map(booking =>
      booking.id === id ? { ...booking, status } : booking
    ));
  };

  return (
    <>
      <div className="container2">
        <Sidebar />
        <main className="main-content">
          <header className="header">
            <div className="header-icons">
              <NotificationIcon />
              <ProfileIcon />
            </div>
          </header>
          <div className="content">
            <div>
              <h1>Bookings</h1>

              <div className="card">
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th>Service</th>
                      <th>Customer</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map(booking => (
                      <tr key={booking.id}>
                        <td>{booking.service}</td>
                        <td>{booking.customer}</td>
                        <td>{booking.date}</td>
                        <td>{booking.status}</td>
                        <td>
                          <select
                            value={booking.status}
                            onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>

  );
}

export default SOBookings;