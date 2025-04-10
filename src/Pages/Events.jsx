import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { toggleSaveEvent } from "../redux/savedEventsSlice";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import "../css/events.css";

const Event = () => {
  const dispatch = useDispatch();
  const savedEvents = useSelector((state) => state.savedEvents.savedEvents);

  const [filters, setFilters] = useState({
    category: "",
    location: "",
    date: "",
    searchQuery: "",
  });

  const events = [
    {
      id: 1,
      title: "Tech Summit 2024",
      location: "Cairo International Convention Center",
      time: "9:00 AM - 5:00 PM",
      attendees: "500+ Attendees",
      description: "Join the biggest tech conference of the year featuring industry leaders and innovators.",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      date: { day: "15", month: "APR" },
      category: "Technology",
      price: "$299",
    },
    {
      id: 2,
      title: "Design Conference",
      location: "Alexandria Arts Center",
      time: "10:00 AM - 4:00 PM",
      attendees: "300+ Attendees",
      description: "Explore the latest trends in design with world-renowned designers and creative professionals.",
      image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      date: { day: "20", month: "MAY" },
      category: "Design",
      price: "$199",
    },
    {
      id: 3,
      title: "Startup Weekend",
      location: "Giza Innovation Hub",
      time: "9:00 AM - 6:00 PM",
      attendees: "200+ Attendees",
      description: "Turn your idea into reality in 54 hours with mentors, investors, and fellow entrepreneurs.",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      date: { day: "10", month: "JUN" },
      category: "Business",
      price: "$149",
    },
  ];

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(filters.searchQuery.toLowerCase());
    const matchesCategory = !filters.category || event.category === filters.category;
    const matchesLocation = !filters.location || event.location.includes(filters.location);
    const matchesDate = !filters.date || 
      event.date.month.toLowerCase().includes(filters.date.toLowerCase()) ||
      event.date.day.includes(filters.date);

    return matchesSearch && matchesCategory && matchesLocation && matchesDate;
  });

  const handleBookmark = (event) => {
    const isSaved = savedEvents.some(e => e.id === event.id);
    dispatch(toggleSaveEvent(event));
    
    toast.success(isSaved ? 'Removed from Saved Events' : 'Added to Saved Events', {
      icon: isSaved ? '🗑' : '🔖',
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
    });
  };

  return (
    <>
      <Nav />
      <section className="events-hero">
        <div className="events-hero-content">
          <h1>Discover Events</h1>
          <p>Find and join amazing events happening around you</p>
          <Link to="/Create" className="create-event-btn">
            <i className="fas fa-plus"></i> Create New Event
          </Link>
        </div>
      </section>

      <section className="search-filter">
        <div className="search-bar">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search events..."
            value={filters.searchQuery}
            onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
          />
        </div>
        <div className="filters">
          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          >
            <option value="">All Categories</option>
            <option value="Technology">Technology</option>
            <option value="Design">Design</option>
            <option value="Business">Business</option>
          </select>
          <select
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          >
            <option value="">All Locations</option>
            <option value="Cairo">Cairo</option>
            <option value="Alexandria">Alexandria</option>
            <option value="Giza">Giza</option>
          </select>
          <select
            value={filters.date}
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
          >
            <option value="">All Dates</option>
            <option value="APR">April</option>
            <option value="MAY">May</option>
            <option value="JUN">June</option>
          </select>
        </div>
      </section>

      <section className="events-grid">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
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
                  <p><i className="fas fa-map-marker-alt"></i> {event.location}</p>
                  <p><i className="fas fa-clock"></i> {event.time}</p>
                  <p><i className="fas fa-users"></i> {event.attendees}</p>
                </div>
                <p className="event-description">{event.description}</p>
                <div className="event-footer">
                  <span className="price">{event.price}</span>
                  <Link to={`/event-details/${event.id}`}>
                    <button className="register-btn">Learn More</button>
                  </Link>
                  <button
                    className={`bookmark-btn ${savedEvents.some(e => e.id === event.id) ? 'saved' : ''}`}
                    onClick={() => handleBookmark(event)}
                    aria-label={savedEvents.some(e => e.id === event.id) ? 'Remove from saved' : 'Save event'}
                  >
                    <i className="fa-regular fa-bookmark"></i>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-events">
            <p>No events match your filters</p>
          </div>
        )}
      </section>

      <div className="load-more">
        <button>Load More Events</button>
      </div>
      <Footer />
    </>
  );
};

export default Event;