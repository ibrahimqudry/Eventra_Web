import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';
import SideNav from '../components/SideNav';
import TopNav from '../components/TopNav';
import "../css/EventM.css";

import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function EventM() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const userData = JSON.parse(localStorage.getItem('userData'));
                if (!userData?.uid) {
                    toast.error('User not found');
                    return;
                }

                const eventsRef = collection(db, 'events');
                const q = query(eventsRef, where('eventManagerId', '==', userData.uid));
                const querySnapshot = await getDocs(q);

                const eventsData = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        ...data,
                        mainImage: data.sliderImages?.[0] || '/img/error.jpg',
                        category: data.category || 'uncategorized',
                        status: new Date(data.date) < new Date() ? 'Closed' : 'Open'
                    };
                });

                setEvents(eventsData);
            } catch (error) {
                console.error('Error fetching events:', error);
                toast.error('Failed to fetch events');
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const handleDelete = async (eventId) => {
        try {
            await deleteDoc(doc(db, 'events', eventId));
            setEvents(prev => prev.filter(event => event.id !== eventId));
            toast.success('Event deleted successfully');
        } catch (error) {
            console.error('Error deleting event:', error);
            toast.error('Failed to delete event');
        }
    };

    return (
        <div className="eventm-container">
            <SideNav />
            <main className="main-content-eventm">
                <TopNav />
                <div className="events-content">
                    <div className="page-header">
                        <h1>Events Management</h1>
                        <button className="btn-create-event">
                            <Link to="/Create" className="create-eventbtn">
                                <i className="fas fa-plus"></i> Create New Event
                            </Link>
                        </button>
                    </div>

                    {/* Filters and Table go here (unchanged) */}

                    <div className="table-container">
                        <table className="events-table">
                            <thead>
                                <tr>
                                    <th>Event</th>
                                    <th>Date</th>
                                    <th>Location</th>
                                    <th>Category</th>
                                    <th>Status</th>
                                    <th>Attendees</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan="7" style={{ textAlign: 'center' }}>Loading...</td></tr>
                                ) : events.length === 0 ? (
                                    <tr><td colSpan="7" style={{ textAlign: 'center' }}>No events found</td></tr>
                                ) : (
                                    events.map(event => (
                                        <tr key={event.id}>
                                            <td>
                                                <div className="event-info">
                                                    <img
                                                        src={event.mainImage}
                                                        alt={event.title}
                                                        onError={(e) => {
                                                            e.target.src = '/img/error.jpg';
                                                            e.target.onerror = null;
                                                        }}
                                                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                                    />
                                                    <div>
                                                        <h4>{event.title}</h4>
                                                        <span>ID: #{event.id.slice(0, 6)}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{new Date(event.date).toLocaleDateString()}</td>
                                            <td>{event.location.city}</td>
                                            <td>
                                                {event.category === 'tech' ? 'Technology' :
                                                    event.category === 'business' ? 'Business' :
                                                        event.category === 'arts' ? 'Arts & Culture' :
                                                            event.category === 'sports' ? 'Sports' :
                                                                'Other'}
                                            </td>
                                            <td>{event.status}</td>
                                            <td>{event.capacity}</td>
                                            <td>
                                                <div className="actions">
                                                    <button className="action-btn view" title="View">
                                                        <i className="fas fa-eye"></i>
                                                    </button>
                                                    <button
                                                        className="action-btn delete"
                                                        title="Delete"
                                                        type="button"
                                                        onClick={() => handleDelete(event.id)}
                                                    >
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default EventM;
