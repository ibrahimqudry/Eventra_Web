import React from 'react';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/services.css';
import { Link } from 'react-router-dom';


const Services = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const services = [
        {
            id: 1,
            title: "Wedding Halls",
            description: "Turn your dream wedding into reality! Grand ballrooms, intimate garden settings, or chic modern spaces every detail crafted to mirror your love story. ✨💍",
            image: "../img/card1.jpg",
            category: "wedding"
        },
        {
            id: 2,
            title: "Makeup Services",
            description: "Enhance your natural beauty with expert touch! From glamorous bridal looks to chic evening styles, our artists bring your vision to life. 💄✨",
            image: "../img/card2.jpg",
            category: "wedding"
        },
        {
            id: 3,
            title: "Product Launch",
            description: "Make your product unforgettable! From concept to execution, we create buzz-worthy events that captivate audiences and leave a lasting impression. 🚀✨",
            image: "/img/card3.webp",
            category: "corporate"
        },
        {
            id: 4,
            title: "Conference Halls",
            description: "Host impactful events in style! State-of-the-art facilities, flexible setups, and seamless tech integration—perfect for meetings, seminars, and corporate gatherings. 🎤💼",
            image: "/img/card4.jpg",
            category: "corporate"
        },
        {
            id: 5,
            title: "Award Ceremonies",
            description: "Celebrate excellence in style! From red-carpet glamour to elegant stages, we create unforgettable moments that honor achievements and inspire greatness. 🏆✨",
            image: "/img/card5.webp",
            category: "corporate"
        },
        {
            id: 6,
            title: "Photogrphy",
            description: "Capture the world through your unique perspective! Whether it's breathtaking landscapes, candid emotions, or artistic details, every shot tells a story. 🌟📸",
            image: "/img/card6.jpg",
            category: "social"
        },
        {
            id: 7,
            title: "Events decorations",
            description: "Transform any space into a magical setting! From elegant floral arrangements to dazzling lighting, we create unforgettable atmospheres for every occasion. ✨🎉",
            image: "/img/card7.jpg",
            category: "decor"
        },
        {
            id: 8,
            title: "Catering For Events",
            description: "Delight your guests with exquisite flavors! From gourmet dishes to custom menus, we craft unforgettable culinary experiences for every occasion. 🍴✨",
            image: "/img/card8.jpg",
            category: "social"
        },
        {
            id: 9,
            title: "Music Concerts",
            description: "Feel the rhythm, live the moment! From electrifying performances to unforgettable acoustics, we bring the stage to life for every music lover. 🎶✨",
            image: "/img/card10.jpg",
            category: "social"
        }
    ];

    const filteredServices = services.filter(service => {
        const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              service.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = !selectedCategory || service.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <>
            <Nav/>
            <section className="services-hero">
                <div className="hero-slider">
                    <div className="slide active">
                        <img src="https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" alt="Event Services" />
                        <div className="slide-content">
                            <h1>Our Services</h1>
                            <p>Creating Unforgettable Moments</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="what-we-do">
                <div className="section-container">
                    <h2>What <span>We Do</span></h2>
                    <div className="services-grid">
                        <div className="services-content">
                            <h3>Comprehensive Event Solutions</h3>
                            <p>We provide end-to-end event management services tailored to your needs.</p>

                            <div className="services-features">
                                <div className="feature">
                                    <h4><i className="fas fa-gem"></i> Wedding Decor</h4>
                                    <p>Transform your special day with our elegant and customized wedding decorations.</p>
                                </div>
                                <div className="feature">
                                    <h4><i className="fas fa-music"></i> Sound Systems</h4>
                                    <p>Professional audio equipment and setup for crystal clear sound at your event.</p>
                                </div>
                                <div className="feature">
                                    <h4><i className="fas fa-magic"></i> Makeup Services</h4>
                                    <p>Professional makeup artists to help you look your best on your special day.</p>
                                </div>
                                <div className="feature">
                                    <h4><i className="fas fa-paint-brush"></i> Event Decor</h4>
                                    <p>Creative and themed decorations for any type of event or celebration.</p>
                                </div>
                            </div>

                            <a href="#services-catalog" className="btn-primary">Explore Services</a>
                        </div>
                        <div className="services-gallery">
                            <div className="gallery-grid">
                                <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Service 1" />
                                <img src="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Service 2" />
                                <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Service 3" />
                                <img src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Service 4" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="services-catalog" className="services-catalog">
                <div className="section-container">
                    <h2>Our <span>Services</span></h2>

                    <div className="catalog-filters">
                        <div className="serch-box">
                            <i className="fas fa-search"></i>
                            <input 
                                type="text" 
                                placeholder="Search services..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="category-filter">
                            <select 
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <option value="">All Categories</option>
                                <option value="wedding">Wedding Services</option>
                                <option value="corporate">Corporate Events</option>
                                <option value="social">Social Events</option>
                                <option value="decor">Decoration</option>
                            </select>
                        </div>
                    </div>

                    <div className="services-cards">
                        {filteredServices.map(service => (
                            <div className="service-card" key={service.id}>
                                <div className="card-image">
                                    <img src={service.image} alt={service.title} />
                                </div>
                                <div className="card-content">
                                    <h3>{service.title}</h3>
                                    <p>{service.description}</p>
                                    <Link 
                                        to={`/serviceDetails/${service.id}`} 
                                        className="btn-secondary"
                                    >
                                        Show Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default Services;