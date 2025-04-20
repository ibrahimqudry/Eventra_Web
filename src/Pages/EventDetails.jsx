import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";  // Fix the import
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase/config';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import "../css/eventDetails.css";
import { Link } from "react-router-dom";

const EventDetails = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const fetchEventDetails = async () => {
            if (!id) {
                toast.error('Event ID not found');
                return;
            }

            try {
                const eventDoc = await getDoc(doc(db, 'events', id));
                if (eventDoc.exists()) {
                    setEvent({ id: eventDoc.id, ...eventDoc.data() });
                } else {
                    toast.error('Event not found');
                }
            } catch (error) {
                console.error('Error fetching event:', error);
                toast.error('Failed to load event details');
            } finally {
                setLoading(false);
            }
        };

        fetchEventDetails();
    }, [id]);

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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!event) {
        return <div>Event not found</div>;
    }

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
                            {event.sliderImages?.map((image, index) => (
                                <img
                                    key={index}
                                    className="ed-slide"
                                    src={image}
                                    alt={`${event.title} - Image ${index + 1}`}
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
                        <h1>{event.title}</h1>
                        <div className="ed-event-meta">
                            <span className="ed-category">{event.category}</span>
                            <span className="ed-status">{new Date(event.date) > new Date() ? 'Upcoming' : 'Past Event'}</span>
                        </div>
                    </div>

                    <div className="ed-event-info">
                        <div className="ed-info-item">
                            <i className="fas fa-map-marker-alt"></i>
                            <div>
                                <h4>Location</h4>
                                <p>{event.location.city}, {event.location.venue}</p>
                            </div>
                        </div>
                        <div className="ed-info-item">
                            <i className="fas fa-calendar-alt"></i>
                            <div>
                                <h4>Date</h4>
                                <p>{new Date(event.date).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div className="ed-info-item">
                            <i className="fas fa-clock"></i>
                            <div>
                                <h4>Time</h4>
                                <p>{event.time}</p>
                            </div>
                        </div>
                        <div className="ed-info-item">
                            <i className="fas fa-users"></i>
                            <div>
                                <h4>Capacity</h4>
                                <p>{event.capacity} Attendees</p>
                            </div>
                        </div>
                    </div>

                    <div className="ed-event-description">
                        <h2>About The Event</h2>
                        <p>{event.description}</p>
                    </div>

                    {/* Tickets Section */}
                    <div className="ed-tickets-section">
                        <h2>Choose Your Ticket</h2>
                        <div className="ed-tickets-grid">
                            {event.packages && event.packages.length > 0 ? (
                                event.packages.map((pkg, index) => (
                                    <div className="ed-ticket" key={index}>
                                        <div className="ed-ticket-header">
                                            <div className="ed-ticket-type">{pkg.name}</div>
                                            <div className="ed-ticket-price">
                                                <span className="ed-currency">$</span>
                                                <span className="ed-amount">{pkg.price}</span>
                                            </div>
                                        </div>
                                        <div className="ed-ticket-body">
                                            <ul className="ed-ticket-features">
                                                {pkg.benefits && Array.isArray(pkg.benefits) ? (
                                                    pkg.benefits.map((benefit, bIndex) => (
                                                        <li key={bIndex}>
                                                            <i className="fas fa-check"></i>
                                                            {benefit}
                                                        </li>
                                                    ))
                                                ) : (
                                                    <li>No benefits listed</li>
                                                )}
                                            </ul>
                                            <button className="ed-ticket-button">
                                                <span>Buy Now</span>
                                                <i className="fas fa-arrow-right"></i>
                                            </button>
                                        </div>
                                        <div className="ed-barcode">
                                            <span className="ed-ticket-number">
                                                {pkg.name ? `${pkg.name.substring(0, 2).toUpperCase()}24-${String(index + 1).padStart(4, '0')}` : `TKT24-${String(index + 1).padStart(4, '0')}`}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="no-tickets">
                                    <p>No tickets available for this event</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sponsors Section */}
                    {event.sponsorLogos && event.sponsorLogos.length > 0 && (
                        <div className="ed-sponsors-section">
                            <h2>Event Sponsors</h2>
                            <div className="ed-sponsors-grid">
                                {event.sponsorLogos.map((logo, index) => (
                                    <div className="ed-sponsor" key={index}>
                                        <img src={logo} alt={`Sponsor ${index + 1}`} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Previous Events Section */}
                    {event.previousEvents && event.previousEvents.length > 0 && (
                        <div className="ed-previous-events">
                            <h2>Previous Events</h2>
                            <div className="ed-events-grid">
                                {event.previousEvents.map((prevEvent, index) => (
                                    <Link
                                        to="/previous"
                                        onClick={() => {
                                            localStorage.setItem('clickedPreviousEvent', JSON.stringify(prevEvent));
                                        }}
                                        key={index}
                                    >
                                        <div className="ed-event-card">
                                            <img 
                                                src={prevEvent.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87"} 
                                                alt={prevEvent.title} 
                                            />
                                            <div className="ed-overlay">
                                                <h3>{prevEvent.title}</h3>
                                                <p>{prevEvent.description || "Previous event"}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default EventDetails;