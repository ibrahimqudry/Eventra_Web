import React from 'react';
import { useParams } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../css/serviceDetails.css';

const ServiceDetails = () => {
    const { id } = useParams();

    const services = [
        {
            id: 1,
            title: "Wedding Halls",
            description: "Turn your dream wedding into reality! Grand ballrooms, intimate garden settings, or chic modern spaces every detail crafted to mirror your love story. ✨💍",
            image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3",
            category: "wedding"
        },
        {
            id: 2,
            title: "Makeup Services",
            description: "Enhance your natural beauty with expert touch! From glamorous bridal looks to chic evening styles, our artists bring your vision to life. 💄✨",
            image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f",
            category: "wedding"
        },
        {
            id: 3,
            title: "Product Launch",
            description: "Make your product unforgettable! From concept to execution, we create buzz-worthy events that captivate audiences and leave a lasting impression. 🚀✨",
            image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
            category: "corporate"
        },
        {
            id: 4,
            title: "Conference Halls",
            description: "Host impactful events in style! State-of-the-art facilities, flexible setups, and seamless tech integration—perfect for meetings, seminars, and corporate gatherings. 🎤💼",
            image: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407",
            category: "corporate"
        },
        {
            id: 5,
            title: "Award Ceremonies",
            description: "Celebrate excellence in style! From red-carpet glamour to elegant stages, we create unforgettable moments that honor achievements and inspire greatness. 🏆✨",
            image: "https://images.unsplash.com/photo-1531058020387-3be344556be6",
            category: "corporate"
        },
        {
            id: 6,
            title: "Photography",
            description: "Capture the world through your unique perspective! Whether it's breathtaking landscapes, candid emotions, or artistic details, every shot tells a story. 🌟📸",
            image: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5",
            category: "social"
        },
        {
            id: 7,
            title: "Events decorations",
            description: "Transform any space into a magical setting! From elegant floral arrangements to dazzling lighting, we create unforgettable atmospheres for every occasion. ✨🎉",
            image: "https://images.unsplash.com/photo-1478146896981-b80fe463b330",
            category: "decor"
        },
        {
            id: 8,
            title: "Catering For Events",
            description: "Delight your guests with exquisite flavors! From gourmet dishes to custom menus, we craft unforgettable culinary experiences for every occasion. 🍴✨",
            image: "https://images.unsplash.com/photo-1555244162-803834f70033",
            category: "social"
        },
        {
            id: 9,
            title: "Music Concerts",
            description: "Feel the rhythm, live the moment! From electrifying performances to unforgettable acoustics, we bring the stage to life for every music lover. 🎶✨",
            image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3",
            category: "social"
        }
    ];

    const service = services.find(s => s.id === parseInt(id));

    const inspirationImages = [
        {
            id: 1,
            url: "https://images.unsplash.com/photo-1511578314322-379afb476865",
            title: "Elegant Setup"
        },
        {
            id: 2,
            url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
            title: "Modern Design"
        },
        {
            id: 3,
            url: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a",
            title: "Creative Layout"
        },
        {
            id: 4,
            url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622",
            title: "Unique Experience"
        }
    ];

    const packages = [
        {
            id: 1,
            name: "Basic Package",
            price: "$999",
            features: [
                "Basic setup and coordination",
                "Standard equipment",
                "4-hour service",
                "Basic support"
            ]
        },
        {
            id: 2,
            name: "Premium Package",
            price: "$1999",
            features: [
                "Full setup and coordination",
                "Premium equipment",
                "8-hour service",
                "Priority support",
                "Additional customization options"
            ]
        },
        {
            id: 3,
            name: "Luxury Package",
            price: "$2999",
            features: [
                "Complete setup and coordination",
                "Top-tier equipment",
                "12-hour service",
                "24/7 dedicated support",
                "Full customization options",
                "Additional services included"
            ]
        }
    ];

    const sliderSettings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: "ease-out",
        centerMode: true,
        centerPadding: "0px",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    };

    if (!service) {
        return <div>Service not found</div>;
    }

    // Make sure the component is wrapped in the main container
    return (
        <>
            <Nav />
            <div className="service-details">
                <div className="container">
                    <div className="service-header">
                        <img src={service.image} alt={service.title} />
                        <div className="service-info">
                            <h1>{service.title}</h1>
                            <div className="category">{service.category}</div>
                            <p className="description">{service.description}</p>
                        </div>
                    </div>

                    <div className="carousel-container">
                        <div className="carousel-title">
                            <h2>Inspiration Gallery</h2>
                            <span className="carousel-subtitle">Discover amazing possibilities</span>
                        </div>
                        <Slider {...sliderSettings}>
                            {inspirationImages.map(image => (
                                <div key={image.id} className="carousel-card">
                                    <img src={image.url} alt={image.title} />
                                    <div className="carousel-text">
                                        <h3>{image.title}</h3>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>

                    <div className="packages-section">
                        <h2>Available Packages</h2>
                        <div className="packages-grid">
                            {packages.map(pkg => (
                                <div className="package-card" key={pkg.id}>
                                    <h3>{pkg.name}</h3>
                                    <div className="price">{pkg.price}</div>
                                    <ul>
                                        {pkg.features.map((feature, index) => (
                                            <li key={index}>{feature}</li>
                                        ))}
                                    </ul>
                                    <button className="book-now-btn">Book Now</button>
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