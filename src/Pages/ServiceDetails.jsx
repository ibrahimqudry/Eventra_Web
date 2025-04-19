import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import '../css/serviceDetails.css';

const ServiceDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { service } = location.state || {};

    // Sample packages
    const packages = [
        {
            title: "Basic Package",
            price: "$999",
            features: ["Basic Setup", "4 Hours Coverage", "50 Guests", "Basic Decorations"]
        },
        {
            title: "Premium Package",
            price: "$1999",
            features: ["Full Setup", "8 Hours Coverage", "100 Guests", "Premium Decorations"]
        },
        {
            title: "Luxury Package",
            price: "$2999",
            features: ["Deluxe Setup", "12 Hours Coverage", "200 Guests", "Luxury Decorations"]
        }
    ];

    if (!service) {
        return (
            <>
                <Nav />
                <div className="service-not-found">
                    <h2>Service not found.</h2>
                    <button className="btn-primary" onClick={() => navigate('/services')}>
                        Back to Services
                    </button>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Nav />
            <div className="service-details">
                <div className="container">
                    <button className="back-btn" onClick={() => navigate(-1)}>
                        ← Back to Services
                    </button>

                    <div className="service-header">
                        <img src={service.image} alt={service.title} />
                        
                        <div className="service-info">
                            <h1>{service.title}</h1>
                            <p className="category">Category: {service.category}</p>
                            <p className="description">{service.description}</p>
                        </div>
                    </div>

                    <div className="packages-section">
                        <h2>Available Packages</h2>
                        <div className="packages-grid">
                            {packages.map((pkg, index) => (
                                <div key={index} className="package-card">
                                    <h3>{pkg.title}</h3>
                                    <p className="price">{pkg.price}</p>
                                    <ul>
                                        {pkg.features.map((feature, i) => (
                                            <li key={i}>{feature}</li>
                                        ))}
                                    </ul>
                                    <button className="btn-primary">Select Package</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ServiceDetails;