import React, { useState, useEffect } from 'react';
import SideNav from '../components/SideNav';
import TopNav from '../components/TopNav';
import "../css/EventManagerDashboard.css";
import { Link } from 'react-router-dom';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { toast } from 'react-toastify';

function EventMDashbord() {
  const [events, setEvents] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState({});
  const [stats, setStats] = useState({ totalEvents: 0, totalAttendees: 0, totalRevenue: 0, avgRating: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (!userData?.uid) throw new Error('User not logged in');

        // Fetch events
        const eventsQuery = query(
          collection(db, 'events'),
          where('eventManagerId', '==', userData.uid)
        );
        const eventsSnap = await getDocs(eventsQuery);
        const eventsData = eventsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        setEvents(eventsData);

        // Fetch orders
        const ordersQuery = collection(db, 'orders');
        const ordersSnap = await getDocs(ordersQuery);
        const ordersRaw = ordersSnap.docs.map(d => ({ id: d.id, ...d.data() }));

        // Collect customer IDs
        const customerIds = ordersRaw.map(o => o.customer?.id).filter(Boolean);
        let customerDataMap = {};
        if (customerIds.length) {
          const usersQuery = query(
            collection(db, 'users'),
            where('uid', 'in', customerIds)
          );
          const usersSnap = await getDocs(usersQuery);
          usersSnap.docs.forEach(d => {
            customerDataMap[d.id] = d.data();
          });
        }

        // Build orders with customer info
        const ordersFull = ordersRaw.map(o => ({
          ...o,
          customer: {
            ...o.customer,
            photoURL: customerDataMap[o.customer?.id]?.profileImage || 'img/per2.avif',
            name: customerDataMap[o.customer?.id]?.name || 'Customer'
          }
        }));
        setOrders(ordersFull);
        setCustomers(customerDataMap);

        // Stats
        const totalEvents = eventsData.length;
        const totalAttendees = ordersFull.reduce((sum, o) => sum + (o.attendees || 0), 0);
        const totalRevenue = ordersFull.reduce((sum, o) => sum + (o.payment?.amount || 0), 0);
        const avgRating = totalEvents ? (eventsData.reduce((sum, e) => sum + (e.avgRating || 0), 0) / totalEvents).toFixed(1) : 0;
        setStats({ totalEvents, totalAttendees, totalRevenue, avgRating });
      } catch (err) {
        console.error(err);
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      await deleteDoc(doc(db, 'events', eventId));
      setEvents(prev => prev.filter(e => e.id !== eventId));
      toast.success('Event deleted successfully');
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete event');
    }
  };

  if (loading) return <div className="loading-spinner">Loading...</div>;

  return (
    <>
      <SideNav />
      <main className="main-content">
        <TopNav />
        <div className="dashboard-content">
          {/* Stats Cards */}
          <div className="stats-grid">
            {/* Replace with actual stat cards */}
            <div className="stat-card">
              <h3>Total Events</h3>
              <p>{stats.totalEvents}</p>
            </div>
            <div className="stat-card">
              <h3>Total Attendees</h3>
              <p>{stats.totalAttendees}</p>
            </div>
            <div className="stat-card">
              <h3>Total Revenue</h3>
              <p>${stats.totalRevenue}</p>
            </div>
            <div className="stat-card">
              <h3>Avg Rating</h3>
              <p>{stats.avgRating}</p>
            </div>
          </div>

          {/* Recent Events */}
          <div className="content-section">
            <div className="section-header">
              <h2>Recent Events</h2>
              <Link to="/Eventm" className="btn-link">View All</Link>
            </div>
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Event Name</th>
                    <th>Date</th>
                    <th>Location</th>
                    <th>Attendees</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.slice(0, 3).map(event => (
                    <tr key={event.id}>
                      <td>
                        <div className="event-name">
                          <img
                            src={event.image || 'img/ev1.avif'}
                            alt={event.title}
                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                          />
                          <span>{event.title}</span>
                        </div>
                      </td>
                      <td>{new Date(event.date).toLocaleDateString()}</td>
                      <td>
                        {event.location?.venue && `${event.location.venue}, `}
                        {event.location?.city && `${event.location.city}, `}
                        {event.location?.country || 'N/A'}
                      </td>
                      <td>{event.capacity || 0}</td>
                      <td>{getStatus(event)}</td>
                      <td>
                        <div className="action-buttons">
                          <button className="btn-icon" title="Edit">
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            className="btn-icon delete"
                            title="Delete"
                            onClick={() => handleDeleteEvent(event.id)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="content-section">
            <div className="section-header">
              <h2>Recent Orders</h2>
              <Link to="/orders" className="btn-link">View All</Link>
            </div>
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Event</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 3).map(order => (
                    <tr key={order.id}>
                      <td>#{order.id.substring(0, 8)}</td>
                      <td>
                        <div className="customer-info">
                          <img
                            src={order.customer?.photoURL}
                            alt={order.customer?.name}
                          />
                          <span>{order.customer?.name}</span>
                        </div>
                      </td>
                      <td>{order.event?.title || 'Event'}</td>
                      <td>{new Date(order.payment?.date).toLocaleDateString()}</td>
                      <td>${order.payment?.amount}</td>
                      <td><span>{order.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}

// Helper
function getStatus(event) {
  const now = new Date();
  const eventDate = new Date(event.date);
  if (eventDate < now) return 'completed';
  if (event.attendees >= event.capacity) return 'sold-out';
  return 'upcoming';
}

export default EventMDashbord;
