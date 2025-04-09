import React from "react";
import Nav from "../componats/Nav";
import Footer from "../componats/Footer";
import "../css/SavedEvents.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { toggleSaveEvent } from '../redux/savedEventsSlice';

const SavedEvents = () => {
  const dispatch = useDispatch();
  const savedEvents = useSelector((state) => state.savedEvents.savedEvents);

  const handleRemove = (event) => {
    dispatch(toggleSaveEvent(event));
    toast.info('Event Removed Succefully', {
      icon: '❌',
      ltr: true
    });
  };
  return (
    <>
      <Nav />
      <section className="events-hero-saved">
        <div className="events-hero-content">
          <h1>Your Saved Events</h1>
          <p>Events you've bookmarked for later</p>
        </div>
      </section>

      <section className="saved-events-container">
        {savedEvents.length > 0 ? (
          <div className="events-grid">
            {savedEvents.map((event) => (
              <div className="event-card" key={event.id}>
                <div className="event-image">
                  <img src={event.image} alt={event.title} />
                  <div className="event-date">
                    <span className="day">{event.date.day}</span>
                    <span className="month">{event.date.month}</span>
                  </div>
                  <div className="event-category">{event.category}</div>
                </div>
                <div className="event-details">
                  <h3>{event.title}</h3>
                  <div className="event-info">
                    <p>
                      <i className="fas fa-map-marker-alt"></i> {event.location}
                    </p>
                    <p>
                      <i className="fas fa-clock"></i> {event.time}
                    </p>
                  </div>
                  <p className="event-description">{event.description}</p>
                  <div className="event-footer">
                    <span className="price">{event.price}</span>
                    <Link to={`/event-details/${event.id}`}>
                      <button className="register-btn">Learn More</button>
                    </Link>
                    <button
                      className="bookmark-btn saved"
                      onClick={() => handleRemove(event)}
                    >
                      <i className="fas fa-bookmark"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-events">
            <p>You haven't saved any events yet.</p>
            <Link to="/events">
              <button className="browse-btn">Browse Events</button>
            </Link>
          </div>
        )}
      </section>

      <Footer />
    </>
  );
};

export default SavedEvents;