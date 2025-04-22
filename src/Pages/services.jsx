import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import { Link } from 'react-router-dom';
import '../css/services.css';
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

const Services = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch services from Firebase
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'services'));
                const servicesData = [];
                querySnapshot.forEach((doc) => {
                    servicesData.push({ id: doc.id, ...doc.data() });
                });
                setServices(servicesData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching services:', error);
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    const filteredServices = services.filter(service => {
        const title = service.title || '';
        const description = service.description || '';
        const category = service.category || '';
        
        const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = !selectedCategory || category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    if (loading) {
        return (
            <>
                <Nav />
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Loading services...</p>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Nav />
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

                            <a href="#services-catalog" className="btn-primary-services">Explore Services</a>
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
                            <div className="service-card-serv" key={service.id}>
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