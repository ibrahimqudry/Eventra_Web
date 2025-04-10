import React, { useState, useEffect } from "react";
import Nav from '../componats/Nav';
import Footer from '../componats/Footer';
import "../css/eventDetails.css";
import { Link } from "react-router";

const EventDetails = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", alt: "Tech Summit" },
        { src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80", alt: "Conference" },
        { src: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", alt: "Networking" }
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 4000);
        return () => clearTimeout(timer);
    }, [currentSlide, slides.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    return (
        <>
            <Nav />

            <div className="ed-container">
                {/* Event Gallery */}
                <div className="ed-event-gallery">
                    <div className="ed-slideshow-container">
                        <button className="ed-nav-btn ed-prev" onClick={prevSlide}>
                            <i className="fas fa-chevron-left"></i>
                        </button>
                        <div className="ed-slides-wrapper">
                            {slides.map((slide, index) => (
                                <img
                                    key={index}
                                    className="ed-slide"
                                    src={slide.src}
                                    alt={slide.alt}
                                    style={{ display: index === currentSlide ? 'block' : 'none' }}
                                />
                            ))}
                        </div>
                        <button className="ed-nav-btn ed-next" onClick={nextSlide}>
                            <i className="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </div>

                {/* Event Details */}
                <div className="ed-event-details">
                    <div className="ed-event-header">
                        <h1>Tech Summit 2024</h1>
                        <div className="ed-event-meta">
                            <span className="ed-category">Technology</span>
                            <span className="ed-status">Early Bird</span>
                        </div>
                    </div>

                    <div className="ed-event-info">
                        <div className="ed-info-item">
                            <i className="fas fa-map-marker-alt"></i>
                            <div>
                                <h4>Location</h4>
                                <p>Cairo International Convention Center</p>
                            </div>
                        </div>
                        <div className="ed-info-item">
                            <i className="fas fa-calendar-alt"></i>
                            <div>
                                <h4>Date</h4>
                                <p>April 15, 2024</p>
                            </div>
                        </div>
                        <div className="ed-info-item">
                            <i className="fas fa-clock"></i>
                            <div>
                                <h4>Time</h4>
                                <p>9:00 AM - 5:00 PM</p>
                            </div>
                        </div>
                        <div className="ed-info-item">
                            <i className="fas fa-users"></i>
                            <div>
                                <h4>Capacity</h4>
                                <p>500 Attendees</p>
                            </div>
                        </div>
                    </div>

                    <div className="ed-event-description">
                        <h2>About The Event</h2>
                        <p>Join us for the biggest tech conference of the year! Tech Summit 2024 brings together industry leaders, innovators, and tech enthusiasts for an unforgettable day of learning, networking, and inspiration.</p>
                        <p>Experience keynote speeches from renowned speakers, interactive workshops, and cutting-edge product demonstrations. Whether you're a developer, entrepreneur, or tech enthusiast, this event is designed to help you stay ahead in the rapidly evolving tech landscape.</p>
                    </div>

                    {/* Sponsors Section */}
                    <div className="ed-sponsors-section">
                        <h2>Event Sponsors</h2>
                        <div className="ed-sponsors-grid">
                            <div className="ed-sponsor">
                                <img src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Sponsor 1" />
                            </div>
                            <div className="ed-sponsor">
                                <img src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Sponsor 2" />
                            </div>
                            <div className="ed-sponsor">
                                <img src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Sponsor 3" />
                            </div>
                            <div className="ed-sponsor">
                                <img src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Sponsor 4" />
                            </div>
                        </div>
                    </div>

                    {/* Previous Events */}
                    <div className="ed-previous-events">
                        <h2>Previous Events</h2>
                        <div className="ed-events-grid">
                            <div className="ed-event-card">
                                <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" alt="Tech Summit 2023" />
                                <div className="ed-overlay">
                                    <h3>Tech Summit 2023</h3>
                                    <p>A look back at last year's success</p>
                                </div>
                            </div>
                            <div className="ed-event-card">
                                <img src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80" alt="Tech Summit 2022" />
                                <div className="ed-overlay">
                                    <h3>Tech Summit 2022</h3>
                                    <p>Innovation meets technology</p>
                                </div>
                            </div>
                            <div className="ed-event-card">
                                <img src="https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" alt="Tech Summit 2021" />
                                <div className="ed-overlay">
                                    <h3>Tech Summit 2021</h3>
                                    <p>Where ideas come to life</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tickets Section */}
                    <div className="ed-tickets-section">
                        <h2>Choose Your Ticket</h2>
                        <div className="ed-tickets-grid">
                            {/* Early Bird Ticket */}
                            <div className="ed-ticket">
                                <div className="ed-ticket-header">
                                    <div className="ed-ticket-type">Early Bird</div>
                                    <div className="ed-ticket-price">
                                        <span className="ed-currency">$</span>
                                        <span className="ed-amount">299</span>
                                    </div>
                                </div>
                                <div className="ed-ticket-body">
                                    <div className="ed-ticket-details">
                                        <div className="ed-detail-item">
                                            <i className="fas fa-calendar"></i>
                                            <span>April 15, 2024</span>
                                        </div>
                                        <div className="ed-detail-item">
                                            <i className="fas fa-map-marker-alt"></i>
                                            <span>Cairo</span>
                                        </div>
                                        <div className="ed-detail-item">
                                            <i className="fas fa-chair"></i>
                                            <span>Premium Seating</span>
                                        </div>
                                    </div>
                                    <ul className="ed-ticket-features">
                                        <li><i className="fas fa-check"></i> Full Conference Access</li>
                                        <li><i className="fas fa-check"></i> Workshop Materials</li>
                                        <li><i className="fas fa-check"></i> Lunch & Refreshments</li>
                                        <li><i className="fas fa-check"></i> Networking Session</li>
                                    </ul>
                                    <button className="ed-ticket-button">
                                        <span>Buy Now</span>
                                        <i className="fas fa-arrow-right"></i>
                                    </button>
                                </div>
                                {/* <div className="ed-ticket-footer"> */}
                                <div className="ed-barcode">
                                    {/* <div className="ed-barcode-lines"></div> */}
                                    <span className="ed-ticket-number">EB24-0001</span>
                                </div>
                                {/* </div> */}
                            </div>

                            {/* Standard Ticket */}
                            <div className="ed-ticket">
                                <div className="ed-ticket-header">
                                    <div className="ed-ticket-type">Standard</div>
                                    <div className="ed-ticket-price">
                                        <span className="ed-currency">$</span>
                                        <span className="ed-amount">399</span>
                                    </div>
                                </div>
                                <div className="ed-ticket-body">
                                    <div className="ed-ticket-details">
                                        <div className="ed-detail-item">
                                            <i className="fas fa-calendar"></i>
                                            <span>April 15, 2024</span>
                                        </div>
                                        <div className="ed-detail-item">
                                            <i className="fas fa-map-marker-alt"></i>
                                            <span>Cairo</span>
                                        </div>
                                        <div className="ed-detail-item">
                                            <i className="fas fa-chair"></i>
                                            <span>Standard Seating</span>
                                        </div>
                                    </div>
                                    <ul className="ed-ticket-features">
                                        <li><i className="fas fa-check"></i> Full Conference Access</li>
                                        <li><i className="fas fa-check"></i> Workshop Materials</li>
                                        <li><i className="fas fa-check"></i> Lunch & Refreshments</li>
                                        <li><i className="fas fa-times"></i> Networking Session</li>
                                    </ul>
                                    <button className="ed-ticket-button">
                                        <span>Buy Now</span>
                                        <i className="fas fa-arrow-right"></i>
                                    </button>
                                </div>
                                {/* <div className="ed-ticket-footer"> */}
                                <div className="ed-barcode">
                                    {/* <div className="ed-barcode-lines"></div> */}
                                    <span className="ed-ticket-number">ST24-0001</span>
                                </div>
                                {/* </div> */}
                            </div>

                            {/* VIP Ticket */}
                            <div className="ed-ticket">
                                <div className="ed-ticket-header">
                                    <div className="ed-ticket-type">VIP</div>
                                    <div className="ed-ticket-price">
                                        <span className="ed-currency">$</span>
                                        <span className="ed-amount">599</span>
                                    </div>
                                </div>
                                <div className="ed-ticket-body">
                                    <div className="ed-ticket-details">
                                        <div className="ed-detail-item">
                                            <i className="fas fa-calendar"></i>
                                            <span>April 15, 2024</span>
                                        </div>
                                        <div className="ed-detail-item">
                                            <i className="fas fa-map-marker-alt"></i>
                                            <span>Cairo</span>
                                        </div>
                                        <div className="ed-detail-item">
                                            <i className="fas fa-crown"></i>
                                            <span>VIP Seating</span>
                                        </div>
                                    </div>
                                    <ul className="ed-ticket-features">
                                        <li><i className="fas fa-check"></i> Full Conference Access</li>
                                        <li><i className="fas fa-check"></i> Workshop Materials</li>
                                        <li><i className="fas fa-check"></i> Lunch & Refreshments</li>
                                        <li><i className="fas fa-check"></i> Networking Session</li>
                                        <li><i className="fas fa-check"></i> VIP Lounge Access</li>
                                        <li><i className="fas fa-check"></i> Private Meeting Room</li>
                                    </ul>
                                    <button className="ed-ticket-button">
                                        <span>Buy Now</span>
                                        <i className="fas fa-arrow-right"></i>
                                    </button>
                                </div>
                                {/* <div className="ed-ticket-footer"> */}
                                <div className="ed-barcode">
                                    {/* <div className="ed-barcode-lines"></div> */}
                                    <span className="ed-ticket-number">VIP24-0001</span>
                                </div>
                                {/* </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tickets Section */}
            <div className="ed-tickets-section">
                <h2>Choose Your Ticket</h2>
                <div className="ed-tickets-grid">
                    {/* Standard Ticket */}
                    <div className="ed-ticket">
                        <div className="ed-ticket-header">
                            <div className="ed-ticket-type">Standard</div>
                            <div className="ed-ticket-price">
                                <span className="ed-currency">$</span>
                                <span className="ed-amount">399</span>
                            </div>
                        </div>
                        <div className="ed-ticket-body">
                            {/* <div className="ed-ticket-details">
                                <div className="ed-detail-item">
                                    <i className="fas fa-calendar"></i>
                                    <span>April 15, 2024</span>
                                </div>
                                <div className="ed-detail-item">
                                    <i className="fas fa-map-marker-alt"></i>
                                    <span>Cairo</span>
                                </div>
                                <div className="ed-detail-item">
                                    <i className="fas fa-chair"></i>
                                    <span>Standard Seating</span>
                                </div>
                            </div> */}
                            <ul className="ed-ticket-features">
                                <li><i className="fas fa-check"></i> Full Conference Access</li>
                                <li><i className="fas fa-check"></i> Workshop Materials</li>
                                <li><i className="fas fa-check"></i> Lunch & Refreshments</li>
                                <li><i className="fas fa-times"></i> Networking Session</li>
                                <li><i className="fas fa-times"></i> VIP Lounge Access</li>
                                <li><i className="fas fa-times"></i> Private Meeting Room</li>
                            </ul>
                            <button className="ed-ticket-button">
                                <span>Buy Now</span>
                                <i className="fas fa-arrow-right"></i>
                            </button>
                        </div>
                        {/* <div className="ed-ticket-footer"> */}
                        <div className="ed-barcode">
                            {/* <div className="ed-barcode-lines"></div> */}
                            <span className="ed-ticket-number">ST24-0001</span>
                        </div>
                        {/* </div> */}
                    </div>

                    {/* Early Bird Ticket */}
                    <div className="ed-ticket">
                        <div className="ed-ticket-header">
                            <div className="ed-ticket-type">Early Bird</div>
                            <div className="ed-ticket-price">
                                <span className="ed-currency">$</span>
                                <span className="ed-amount">299</span>
                            </div>
                        </div>
                        <div className="ed-ticket-body">
                            {/* <div className="ed-ticket-details">
                                <div className="ed-detail-item">
                                    <i className="fas fa-calendar"></i>
                                    <span>April 15, 2024</span>
                                </div> 
                             <div className="ed-detail-item">
                                    <i className="fas fa-map-marker-alt"></i>
                                    <span>Cairo</span>
                                </div>
                                <div className="ed-detail-item">
                                    <i className="fas fa-chair"></i>
                                    <span>Premium Seating</span>
                                </div>
                            </div> */}
                            <ul className="ed-ticket-features">
                                <li><i className="fas fa-check"></i> Full Conference Access</li>
                                <li><i className="fas fa-check"></i> Workshop Materials</li>
                                <li><i className="fas fa-check"></i> Lunch & Refreshments</li>
                                <li><i className="fas fa-check"></i> Networking Session</li>
                                <li><i className="fas fa-times"></i> VIP Lounge Access</li>
                                <li><i className="fas fa-times"></i> Private Meeting Room</li>
                            </ul>
                            <button className="ed-ticket-button">
                                <span>Buy Now</span>
                                <i className="fas fa-arrow-right"></i>
                            </button>
                        </div>
                        {/* <div className="ed-ticket-footer"> */}
                        <div className="ed-barcode">
                            {/* <div className="ed-barcode-lines"></div> */}
                            <span className="ed-ticket-number">EB24-0001</span>
                        </div>
                        {/* </div> */}
                    </div>

                    {/* VIP Ticket */}
                    <div className="ed-ticket">
                        <div className="ed-ticket-header">
                            <div className="ed-ticket-type">VIP</div>
                            <div className="ed-ticket-price">
                                <span className="ed-currency">$</span>
                                <span className="ed-amount">599</span>
                            </div>
                        </div>
                        <div className="ed-ticket-body">
                            {/* <div className="ed-ticket-details">
                                <div className="ed-detail-item">
                                    <i className="fas fa-calendar"></i>
                                    <span>April 15, 2024</span>
                                </div>
                                <div className="ed-detail-item">
                                    <i className="fas fa-map-marker-alt"></i>
                                    <span>Cairo</span>
                                </div>
                                <div className="ed-detail-item">
                                    <i className="fas fa-crown"></i>
                                    <span>VIP Seating</span>
                                </div>
                            </div> */}
                            <ul className="ed-ticket-features">
                                <li><i className="fas fa-check"></i> Full Conference Access</li>
                                <li><i className="fas fa-check"></i> Workshop Materials</li>
                                <li><i className="fas fa-check"></i> Lunch & Refreshments</li>
                                <li><i className="fas fa-check"></i> Networking Session</li>
                                <li><i className="fas fa-check"></i> VIP Lounge Access</li>
                                <li><i className="fas fa-check"></i> Private Meeting Room</li>
                            </ul>
                            <button className="ed-ticket-button">
                                <span>Buy Now</span>
                                <i className="fas fa-arrow-right"></i>
                            </button>
                        </div>
                        {/* <div className="ed-ticket-footer"> */}
                        <div className="ed-barcode">
                            {/* <div className="ed-barcode-lines">
                                </div> */}
                            {/* <div className="" style={{fontSize: "100px"}}>
                                <i class="fas fa-qrcode"></i>
                                </div> */}
                            <span className="ed-ticket-number">VIP24-0001</span>
                        </div>
                        {/* </div> */}
                    </div>
                </div>
            </div>
        {/* </div > */}
            {/* // </div> */}

            <Footer />
    </>
  )
}

export default EventDetails