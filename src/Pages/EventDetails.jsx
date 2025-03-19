import React, { useState, useEffect } from "react";
import Nav from '../componats/Nav';
// import Footer from '../componats/Footer';
import "../css/eventDetails.css";
// import { Link } from 'react-router-dom';

const images = [
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
];
function EventDetails() {

  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {
      console.log((prevIndex + 1) % images.length);
      setSlideIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };


  return (
    <>
      <Nav />

      <div className="container">
        {/* Event Gallery */}
        <div className="event-gallery">
          <div className="slideshow-container">
            <button className="nav-btn prev" onClick={prevSlide}>
              <i className="fas fa-chevron-left" />
            </button>
            <div className="slides-wrapper">
              <img className="slide" src={images[slideIndex]} alt="Event Slide" />
            </div>
            <button className="nav-btn next" onClick={nextSlide}>
              <i className="fas fa-chevron-right" />
            </button>
          </div>
        </div>
        {/* Event Details */}
        <div className="event-details-page">
          <div className="event-header">
            <h1>Tech Summit 2024</h1>
            <div className="event-meta">
              <span className="category">Technology</span>
              <span className="status">Early Bird</span>
            </div>
          </div>
          <div className="event-info-page">
            <div className="info-item">
              <i className="fas fa-map-marker-alt" />
              <div>
                <h4>Location</h4>
                <p>Cairo International Convention Center</p>
              </div>
            </div>
            <div className="info-item">
              <i className="fas fa-calendar-alt" />
              <div>
                <h4>Date</h4>
                <p>April 15, 2025</p>
              </div>
            </div>
            <div className="info-item">
              <i className="fas fa-clock" />
              <div>
                <h4>Time</h4>
                <p>9:00 AM - 5:00 PM</p>
              </div>
            </div>
            <div className="info-item">
              <i className="fas fa-users" />
              <div>
                <h4>Capacity</h4>
                <p>500 Attendees</p>
              </div>
            </div>
            <div className="info-item">
              <i className="fa-solid fa-hourglass-half" />
              <div>
                <h4>Purchase Deadline</h4>
                <p>Till 1 April, 2025</p>
              </div>
            </div>
          </div>
          <div className="event-description-page">
            <h2>About The Event</h2>
            <p>
              Join us for the biggest tech conference of the year! Tech Summit 2024
              brings together industry leaders, innovators, and tech enthusiasts for
              an unforgettable day of learning, networking, and inspiration.
            </p>
            <p>
              Experience keynote speeches from renowned speakers, interactive
              workshops, and cutting-edge product demonstrations. Whether you're a
              developer, entrepreneur, or tech enthusiast, this event is designed to
              help you stay ahead in the rapidly evolving tech landscape.
            </p>
          </div>
          {/* Sponsors Section */}
          <div className="sponsors-section">
            <h2>Event Sponsors</h2>
            <div className="sponsors-grid">
              <div className="sponsor">
                <img src="./assets/logo-removebg-preview.png" alt="Sponsor 1" />
              </div>
              <div className="sponsor">
                <img src="./assets/logo1-removebg-preview.png" alt="Sponsor 2" />
              </div>
              <div className="sponsor">
                <img src="./assets/logo3-removebg-preview.png" alt="Sponsor 3" />
              </div>
              <div className="sponsor">
                <img src="./assets/logo4-removebg-preview.png" alt="Sponsor 4" />
              </div>
              <div className="sponsor">
                <img src="./assets/logo5-removebg-preview.png" alt="Sponsor 1" />
              </div>
            </div>
          </div>
          {/* Previous Events */}
          <div className="previous-events">
            <h2>Previous Events</h2>
            <div className="events-grid">
              <div className="event-card">
                <img
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                  alt="Tech Summit 2023"
                />
                <div className="overlay">
                  <h3>Tech Summit 2023</h3>
                  <p>A look back at last year's success</p>
                </div>
              </div>
              <div className="event-card">
                <img
                  src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80"
                  alt="Tech Summit 2022"
                />
                <div className="overlay">
                  <h3>Tech Summit 2022</h3>
                  <p>Innovation meets technology</p>
                </div>
              </div>
              <div className="event-card">
                <img
                  src="https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                  alt="Tech Summit 2021"
                />
                <div className="overlay">
                  <h3>Tech Summit 2021</h3>
                  <p>Where ideas come to life</p>
                </div>
              </div>
            </div>
          </div>
          {/* Tickets Section */}
          <div className="tickets-section">
            <h2>Choose Your Ticket</h2>
            <div className="tickets-grid">
              {/* Standard Ticket */}
              <div className="ticket">
                <div className="ticket-header">
                  <div className="ticket-type">Standard</div>
                  <div className="ticket-price">
                    <span className="currency">$</span>
                    <span className="amount">100</span>
                  </div>
                </div>
                <div className="ticket-body">
                  <div className="ticket-details">

                    <div className="detail-item">
                      <i className="fas fa-chair" />
                      <h3>Standard Seating</h3>
                    </div>
                  </div>
                  <ul className="ticket-features">
                    <li>
                      <i className="fas fa-check" /> Full Conference Access
                    </li>
                    <li>
                      <i className="fas fa-check" /> Workshop Materials
                    </li>
                    <li>
                      <i className="fas fa-check" /> Lunch &amp; Refreshments
                    </li>
                  </ul>
                  <button className="ticket-button">
                    <span>Buy Now</span>
                    <i className="fas fa-arrow-right" />
                  </button>
                </div>

              </div>
              {/* Early Bird Ticket */}
              <div className="ticket">
                <div className="ticket-header">
                  <div className="ticket-type">Early Bird</div>
                  <div className="ticket-price">
                    <span className="currency">$</span>
                    <span className="amount">200</span>
                  </div>
                </div>
                <div className="ticket-body">
                  <div className="ticket-details">

                    <div className="detail-item">
                      <i className="fas fa-chair" />
                      <h3>Premium Seating</h3>
                    </div>
                  </div>
                  <ul className="ticket-features">
                    <li>
                      <i className="fas fa-check" /> Full Conference Access
                    </li>
                    <li>
                      <i className="fas fa-check" /> Workshop Materials
                    </li>
                    <li>
                      <i className="fas fa-check" /> Lunch &amp; Refreshments
                    </li>
                    <li>
                      <i className="fas fa-check" /> Networking Session
                    </li>
                  </ul>
                  <button className="ticket-button">
                    <span>Buy Now</span>
                    <i className="fas fa-arrow-right" />
                  </button>
                </div>

              </div>
              {/* VIP Ticket */}
              <div className="ticket">
                <div className="ticket-header">
                  <div className="ticket-type">VIP</div>
                  <div className="ticket-price">
                    <span className="currency">$</span>
                    <span className="amount">300</span>
                  </div>
                </div>
                <div className="ticket-body">
                  <div className="ticket-details">
                    <div className="detail-item">
                      <i className="fas fa-crown" />
                      <h3>VIP Seating</h3>
                    </div>
                  </div>
                  <ul className="ticket-features">
                    <li>
                      <i className="fas fa-check" /> Full Conference Access
                    </li>
                    <li>
                      <i className="fas fa-check" /> Workshop Materials
                    </li>
                    <li>
                      <i className="fas fa-check" /> Lunch &amp; Refreshments
                    </li>
                    <li>
                      <i className="fas fa-check" /> Networking Session
                    </li>
                    <li>
                      <i className="fas fa-check" /> VIP Lounge Access
                    </li>
                    <li>
                      <i className="fas fa-check" /> Private Meeting Room
                    </li>
                  </ul>
                  <button className="ticket-button">
                    <span>Buy Now</span>
                    <i className="fas fa-arrow-right" />
                  </button>
                </div>
                {/* <div class="ticket-footer">
                      <div class="barcode">
                          <div class="barcode-lines"></div>
                          <span class="ticket-number">VIP24-0001</span>
                      </div>
                  </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default EventDetails