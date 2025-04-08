import React from 'react'
import Nav from '../componats/Nav';
import Footer from '../componats/Footer';
import "../css/home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Nav />
      <header className="hero">
        <div className="hero-content">
          <h1>Discover Amazing Events</h1>
          <p>Find and join the most exciting events happening around you.</p>
          <div className="search-box">
            <input type="text" placeholder="Search events..." />
            <button>Search</button>
          </div>
        </div>
      </header>

      {/* Featured Events */}
      <section className="featured-events">
        <h2>Featured Events</h2>
        <div className="event-grid">
          <div className="event-card">
            <div className="event-image">
              <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" alt="Tech Summit" />
              <div className="event-date">
                <span className="day">15</span>
                <span className="month">APR</span>
              </div>
            </div>
            <div className="event-details">
              <h3>Tech Summit 2024</h3>
              <div className="event-info">
                <span className="location">San Francisco</span>
                <span className="attendees">500+ Attendees</span>
              </div>
              <p>Join the biggest tech conference of the year featuring industry leaders and innovators.</p>
              <button className="details-btn">View Details</button>
            </div>
          </div>

          <div className="event-card">
            <div className="event-image">
              <img src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80" alt="Design Conference" />
              <div className="event-date">
                <span className="day">20</span>
                <span className="month">MAY</span>
              </div>
            </div>
            <div className="event-details">
              <h3>Design Conference</h3>
              <div className="event-info">
                <span className="location">New York</span>
                <span className="attendees">300+ Attendees</span>
              </div>
              <p>Explore the latest trends in design with world-renowned designers and creative professionals.</p>
              <button className="details-btn">View Details</button>
            </div>
          </div>

          <div className="event-card">
            <div className="event-image">
              <img src="https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" alt="Startup Weekend" />
              <div className="event-date">
                <span className="day">10</span>
                <span className="month">JUN</span>
              </div>
            </div>
            <div className="event-details">
              <h3>Startup Weekend</h3>
              <div className="event-info">
                <span className="location">London</span>
                <span className="attendees">200+ Attendees</span>
              </div>
              <p>Turn your idea into reality in 54 hours with mentors, investors, and fellow entrepreneurs.</p>
              <Link to="/events-details">
  <button className="details-btn">View Details</button>
</Link>               
</div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2>What People Say</h2>
        <div className="testimonial-grid">
          <div className="testimonial-card">
            <div className="testimonial-image">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80" alt="Sarah Johnson" />
            </div>
            <div className="stars">★★★★★</div>
            <p>"The platform made organizing our tech conference a breeze. Highly recommended!"</p>
            <div className="testimonial-author">
              <strong>Sarah Johnson</strong>
              <span>Event Organizer</span>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-image">
              <img src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80" alt="Michael Chen" />
            </div>
            <div className="stars">★★★★★</div>
            <p>"Found amazing events that perfectly matched my interests. The experience was seamless."</p>
            <div className="testimonial-author">
              <strong>Michael Chen</strong>
              <span>Attendee</span>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-image">
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80" alt="Emily Davis" />
            </div>
            <div className="stars">★★★★★</div>
            <p>"As a speaker, I love how easy it is to connect with event organizers and audiences."</p>
            <div className="testimonial-author">
              <strong>Emily Davis</strong>
              <span>Speaker</span>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter">
        <div className="newsletter-content">
          <h2>Stay Updated</h2>
          <p>Subscribe to our newsletter for the latest events and updates</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  )
}


export default Home;

