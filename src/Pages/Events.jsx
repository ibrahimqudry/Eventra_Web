import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { toggleSaveEvent } from "../redux/savedEventsSlice";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import "../css/events.css";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

const Event = () => {
  const dispatch = useDispatch();
  const savedEvents = useSelector((state) => state.savedEvents.savedEvents);

  const [filters, setFilters] = useState({
    category: "",
    location: "",
    date: "",
    searchQuery: "",
  });

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsRef = collection(db, 'events');
        const querySnapshot = await getDocs(eventsRef);
        
        const eventsData = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title,
            location: data.location.city,
            time: data.time,
            attendees: `${data.capacity} Attendees`,
            description: data.description,
            image: data.sliderImages?.[0] || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
            date: {
              day: new Date(data.date).getDate(),
              month: new Date(data.date).toLocaleString('en-US', { month: 'short' }).toUpperCase()
            },
            category: data.category,
            price: data.price || 'Free'
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

  // Remove the static events array and keep the filtering logic
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
            onChange={(e) =>
              setFilters({ ...filters, searchQuery: e.target.value })
            }
          />
        </div>
        <div className="filters">
          <select
            value={filters.category}
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
          >
            <option value="">All Categories</option>
            <option value="music">Music & Concerts</option>
            <option value="business">Business & Networking</option>
            <option value="tech">Tech & Innovation</option>
            <option value="arts">Arts & Culture</option>
            <option value="food">Food & Drink</option>
            <option value="health">Health & Wellness</option>
            <option value="sports">Sports & Fitness</option>
            <option value="education">Education & Workshops</option>
            <option value="charity">Charity & Causes</option>
            <option value="festivals">Festivals & Fairs</option>
            <option value="parties">Parties & Nightlife</option>
            <option value="travel">Travel & Outdoor</option>
            <option value="family">Family & Kids</option>
            <option value="fashion">Fashion & Beauty</option>
            <option value="spirituality">Spirituality & Religion</option>
            <option value="film">Film & Media</option>
            <option value="theater">Theater & Performing Arts</option>
            <option value="gaming">Gaming & Esports</option>
            <option value="literature">Literature & Books</option>
            <option value="finance">Finance & Investment</option>
          </select>
          <select
            value={filters.location}
            onChange={(e) =>
              setFilters({ ...filters, location: e.target.value })
            }
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
        {loading ? (
          <div className="loading">Loading events...</div>
        ) : filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div className="event-card-events" key={event.id}>
              <div className="event-image">
                <img src={event.image} alt={event.title} />
                <div className="event-date">
                  <span className="day">{event.date.day}</span>
                  <span className="month">{event.date.month}</span>
                </div>
                <div className="event-category">
                  {{
                    music: "Music & Concerts",
                    business: "Business & Networking",
                    tech: "Tech & Innovation",
                    arts: "Arts & Culture",
                    food: "Food & Drink",
                    health: "Health & Wellness",
                    sports: "Sports & Fitness",
                    education: "Education & Workshops",
                    charity: "Charity & Causes",
                    festivals: "Festivals & Fairs",
                    parties: "Parties & Nightlife",
                    travel: "Travel & Outdoor",
                    family: "Family & Kids",
                    fashion: "Fashion & Beauty",
                    spirituality: "Spirituality & Religion",
                    film: "Film & Media",
                    theater: "Theater & Performing Arts",
                    gaming: "Gaming & Esports",
                    literature: "Literature & Books",
                    finance: "Finance & Investment",
                  }[event.category] || event.category}
                </div>
              </div>
              <div className="event-details-events">
                <h3>{event.title}</h3>
                <div className="event-info-events">
                  <p className="event-info-eventsp">
                    <i className="fas fa-map-marker-alt"></i> {event.location}
                  </p>
                  <p className="event-info-eventsp">
                    <i className="fas fa-clock"></i> {event.time}
                  </p>
                  <p className="event-info-eventsp">
                    <i className="fas fa-users"></i> {event.attendees}
                  </p>
                </div>
                <p className="event-description">{event.description}</p>
                <div className="event-footer">
                  <Link to={`/event-details/${event.id}`}>
                    <button className="register-btn">Learn More</button>
                  </Link>
                  {/* <button
                    className={`bookmark-btn-events ${
                      savedEvents.some((e) => e.id === event.id) ? "saved" : ""
                    }`}
                    onClick={() => handleBookmark(event)}
                    aria-label={
                      savedEvents.some((e) => e.id === event.id)
                        ? "Remove from saved"
                        : "Save event"
                    }
                  >
                    <i className="fa-regular fa-bookmark"></i>
                  </button> */}
                  <button
                    className={`bookmark-btn-events ${
                      savedEvents.some((e) => e.id === event.id) ? "saved" : ""
                    }`}
                    onClick={() => handleBookmark(event)}
                    aria-label={
                      savedEvents.some((e) => e.id === event.id)
                        ? "Remove from saved"
                        : "Save event"
                    }
                  >
                    <i
                      className={`fa-bookmark ${
                        savedEvents.some((e) => e.id === event.id)
                          ? "fa-solid"
                          : "fa-regular"
                      }`}
                    ></i>
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