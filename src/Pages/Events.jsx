import React from "react";
import Nav from "../componats/Nav";
import Footer from "../componats/Footer";
import "../css/events.css";
import { Link } from "react-router-dom";

const Event = () => {
  return (
    <>
      <Nav />
      <section className="events-hero">
        <div className="events-hero-content">
          <h1>Discover Events</h1>
          <p>Find and join amazing events happening around you</p>
          <Link to="/Create">
            <div className="create-event-btn">
              <i className="fas fa-plus"></i> Create New Event
            </div>
          </Link>
        </div>
      </section>

      <section className="search-filter">
        <div className="search-bar">
          <i className="fas fa-search"></i>
          <input type="text" placeholder="Search events..." />
        </div>
        <div className="filters">
          <select>
            <option value="">All Categories</option>
            <option value="tech">Technology</option>
            <option value="business">Business</option>
            <option value="arts">Arts & Culture</option>
            <option value="sports">Sports</option>
          </select>
          <select>
            <option value="">All Locations</option>
            <option value="cairo">Cairo</option>
            <option value="alex">Alexandria</option>
            <option value="giza">Giza</option>
          </select>
          <select>
            <option value="">Date Range</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </section>

      <section className="events-grid">
        <div className="event-card">
          <div className="event-image">
            <img
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
              alt="Tech Summit"
            />
            <div className="event-date">
              <span className="day">15</span>
              <span className="month">APR</span>
            </div>
            <div className="event-category">Technology</div>
          </div>
          <div className="event-details">
            <h3>Tech Summit 2024</h3>
            <div className="event-info">
              <p>
                <i className="fas fa-map-marker-alt"></i> Cairo International
                Convention Center
              </p>
              <p>
                <i className="fas fa-clock"></i> 9:00 AM - 5:00 PM
              </p>
              <p>
                <i className="fas fa-users"></i> 500+ Attendees
              </p>
            </div>
            <p className="event-description">
              Join the biggest tech conference of the year featuring industry
              leaders and innovators.
            </p>
            <div className="event-footer">
              <span className="price">$299</span>
              <Link to="/event-details">
                <button className="register-btn">Register Now</button>
              </Link>
            </div>
          </div>
        </div>

        <div className="event-card">
          <div className="event-image">
            <img
              src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80"
              alt="Design Conference"
            />
            <div className="event-date">
              <span className="day">20</span>
              <span className="month">MAY</span>
            </div>
            <div className="event-category">Design</div>
          </div>
          <div className="event-details">
            <h3>Design Conference</h3>
            <div className="event-info">
              <p>
                <i className="fas fa-map-marker-alt"></i> Alexandria Arts Center
              </p>
              <p>
                <i className="fas fa-clock"></i> 10:00 AM - 4:00 PM
              </p>
              <p>
                <i className="fas fa-users"></i> 300+ Attendees
              </p>
            </div>
            <p className="event-description">
              Explore the latest trends in design with world-renowned designers
              and creative professionals.
            </p>
            <div className="event-footer">
              <span className="price">$199</span>
              <Link to="/event-details">
                <button className="register-btn">Register Now</button>
              </Link>
            </div>
          </div>
        </div>

        <div className="event-card">
          <div className="event-image">
            <img
              src="https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
              alt="Startup Weekend"
            />
            <div className="event-date">
              <span className="day">10</span>
              <span className="month">JUN</span>
            </div>
            <div className="event-category">Business</div>
          </div>
          <div className="event-details">
            <h3>Startup Weekend</h3>
            <div className="event-info">
              <p>
                <i className="fas fa-map-marker-alt"></i> Giza Innovation Hub
              </p>
              <p>
                <i className="fas fa-clock"></i> 9:00 AM - 6:00 PM
              </p>
              <p>
                <i className="fas fa-users"></i> 200+ Attendees
              </p>
            </div>
            <p className="event-description">
              Turn your idea into reality in 54 hours with mentors, investors,
              and fellow entrepreneurs.
            </p>
            <div className="event-footer">
              <span className="price">$149</span>
              <Link to="/event-details">
                <button className="register-btn">Register Now</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="load-more">
        <button>Load More Events</button>
      </div>

      <Footer />
    </>
  );
};

export default Event;
