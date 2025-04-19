import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../css/serviceDetails.css';

const ServiceDetails = () => {
    const { id } = useParams();
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [reviews, setReviews] = useState([
        {
            id: 1,
            user: "John Doe",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
            rating: 5,
            text: "Amazing service! Everything was perfect and exactly as described. Would definitely recommend!",
            date: "2 days ago"
        },
        {
            id: 2,
            user: "Sarah Smith",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
            rating: 4,
            text: "Great experience overall. The team was very professional and responsive.",
            date: "1 week ago"
        }
    ]);

    // Add handlers
    const handleRatingClick = (selectedRating) => {
        setRating(selectedRating);
    };

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        if (rating === 0 || !reviewText.trim()) return;

        const newReview = {
            id: reviews.length + 1,
            user: "Current User", // You can replace this with actual user data
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`,
            rating: rating,
            text: reviewText,
            date: "Just now"
        };

        setReviews([newReview, ...reviews]);
        setRating(0);
        setReviewText('');
    };

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

    if (!service) {
        return <div>Service not found</div>;
    }

    const inspirationImages = [
        {
            id: 1,
            url: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3",
            title: "Elegant Wedding Setup"
        },
        {
            id: 2,
            url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
            title: "Modern Venue Design"
        },
        {
            id: 3,
            url: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a",
            title: "Creative Decorations"
        },
        {
            id: 4,
            url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622",
            title: "Unique Experience"
        },
        {
            id: 5,
            url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
            title: "Special Moments"
        }
    ];

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        centerMode: true,
        centerPadding: '60px',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    centerPadding: '40px'
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    centerPadding: '30px'
                }
            }
        ]
    };

    return (
        <>
            <Nav />
            <div className="service-details">
                <div className="container">
                    {/* Service Header Section */}
                    <div className="service-header">
                        <img src={service.image} alt={service.title} />
                        <div className="service-info">
                            <div className="category">{service.category}</div>
                            <h1>{service.title}</h1>
                            <p className="description">{service.description}</p>
                        </div>
                    </div>

                    {/* Inspiration Gallery Section */}
                    <div className="inspiration-section">
                        <div className="inspiration-title">
                            <h2>Inspiration Gallery</h2>
                            <span className="inspiration-subtitle">Discover amazing possibilities</span>
                        </div>
                        <div className="slider-container">
                            <Slider {...sliderSettings}>
                                {inspirationImages.map(image => (
                                    <div key={image.id} className="slider-item">
                                        <img src={image.url} alt={image.title} />
                                        <h3>{image.title}</h3>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>

                    {/* Packages Section */}
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

                    {/* Reviews Section */}
                    <div className="reviews-section">
                        <h2>Customer Reviews</h2>
                        <div className="reviews-container">
                            <div className="review-form">
                                <h3>Leave a Review</h3>
                                <div className="rating-input">
                                    <span>Your Rating:</span>
                                    <div className="stars">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button 
                                                key={star} 
                                                className={`star-btn ${star <= rating ? 'active' : ''}`}
                                                onClick={() => handleRatingClick(star)}
                                            >
                                                ★
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <textarea 
                                    placeholder="Share your experience..."
                                    className="review-textarea"
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                />
                                <button 
                                    className="submit-review-btn"
                                    onClick={handleReviewSubmit}
                                >
                                    Submit Review
                                </button>
                            </div>
                            
                            <div className="reviews-list">
                                {reviews.map(review => (
                                    <div className="review-card" key={review.id}>
                                        <div className="review-header">
                                            <div className="reviewer-info">
                                                <img src={review.avatar} alt={review.user} />
                                                <div>
                                                    <h4>{review.user}</h4>
                                                    <span className="review-date">{review.date}</span>
                                                </div>
                                            </div>
                                            <div className="rating">
                                                {Array(5).fill('★').map((star, index) => (
                                                    <span 
                                                        key={index}
                                                        style={{ color: index < review.rating ? '#f6e05e' : '#cbd5e0' }}
                                                    >
                                                        {star}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <p className="review-text">{review.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ServiceDetails;