import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase/config';
import { doc, getDoc, collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
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

    // Remove Firebase reviews fetching from useEffect
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch service details only
                const serviceDoc = await getDoc(doc(db, 'services', id));
                if (serviceDoc.exists()) {
                    const serviceData = { id: serviceDoc.id, ...serviceDoc.data() };
                    setService(serviceData);
                    console.log('Fetched service:', serviceData);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleRatingClick = (selectedRating) => {
        setRating(selectedRating);
    };


    //     e.preventDefault();
    //     if (rating === 0 || !reviewText.trim()) return;

    //     const newReview = {
    //         id: reviews.length + 1,
    //         user: "Current User",
    //         avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`,
    //         rating: rating,
    //         text: reviewText,
    //         date: "Just now"
    //     };

    //     setReviews([newReview, ...reviews]);
    //     setRating(0);
    //     setReviewText('');
    // };
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch service and reviews from Firebase
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch service details
                const serviceDoc = await getDoc(doc(db, 'services', id));
                if (serviceDoc.exists()) {
                    const serviceData = { id: serviceDoc.id, ...serviceDoc.data() };
                    setService(serviceData);
                    console.log('Fetched service:', serviceData);

                    // Fetch reviews for this service
                    const reviewsSnapshot = await getDocs(collection(db, 'services', id, 'reviews'));
                    const reviewsData = reviewsSnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setReviews(reviewsData);
                    console.log('Fetched reviews:', reviewsData);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    // Get current user from localStorage
    const currentUser = JSON.parse(localStorage.getItem('userData'));
    console.log('Current User:', currentUser);

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (rating === 0 || !reviewText.trim()) return;



        try {
            const newReview = {
                user: currentUser?.name || "Current User",
                avatar: currentUser?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`,
                rating: rating,
                text: reviewText,
                createdAt: serverTimestamp()
            };

            // Add review to Firebase
            const docRef = await addDoc(collection(db, 'services', id, 'reviews'), newReview);

            // Update local state
            setReviews(prev => [{
                id: docRef.id,
                ...newReview,
                date: "Just now" // Temporary until we format the timestamp
            }, ...prev]);

            setRating(0);
            setReviewText('');
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    if (loading) {
        return (
            <>
                <Nav />
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Loading service details...</p>
                </div>
                <Footer />
            </>
        );
    }

    if (!service) {
        return (
            <>
                <Nav />
                <div className="service-not-found">
                    <h2>Service not found</h2>
                    <p>The service you're looking for doesn't exist or may have been removed.</p>
                    <Link to="/services" className="btn-primary">Browse Services</Link>
                </div>
                <Footer />
            </>
        );
    }

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
                                {service.sliderImages?.length > 0 ? (
                                    service.sliderImages.map((image, index) => (
                                        <div key={`${image.id || image.url}_${index}`} className="slider-item">
                                            <img src={image} alt={image.title || `Gallery image ${index}`} />
                                            <h3>{image.title || `Image ${index + 1}`}</h3>
                                        </div>
                                    ))
                                ) : (
                                    <div className="no-images-message">
                                        <p>No inspiration images available</p>
                                    </div>
                                )}
                            </Slider>
                        </div>
                    </div>

                    {/* Packages Section */}
                    <div className="packages-section">
                        <h2>Available Packages</h2>
                        <div className="packages-grid">
                            {service.packages?.map(pkg => (
                                <div className="package-card" key={pkg.id || pkg.type}>
                                    <h3>{pkg.type}</h3>
                                    <div className="price">{pkg.price}</div>
                                    <ul>
                                        {pkg.benefits?.map((benefit, index) => (
                                            <li key={index}>{benefit}</li>
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
                                                aria-label={`Rate ${star} star${star !== 1 ? 's' : ''}`}
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
                                    minLength="10"
                                    maxLength="500"
                                    required
                                />
                                <button
                                    className="submit-review-btn"
                                    onClick={handleReviewSubmit}
                                    disabled={rating === 0 || !reviewText.trim()}
                                >
                                    Submit Review
                                </button>
                            </div>

                            <div className="reviews-list">
                                {reviews.length > 0 ? (
                                    reviews.map(review => (
                                        <div className="review-card" key={review.id}>
                                            <div className="review-header">
                                                <div className="reviewer-info">
                                                    <img
                                                        src={currentUser.profileImage}
                                                        alt={review.user}
                                                        onError={(e) => {
                                                            e.target.src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=Default';
                                                        }}
                                                    />
                                                    <div>
                                                        <h4>{currentUser.fullName}</h4>
                                                        <span className="review-date">
                                                            {review.date || new Date(review.createdAt?.seconds * 1000).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="rating">
                                                    {Array(5).fill('★').map((star, index) => (
                                                        <span
                                                            key={index}
                                                            style={{ color: index < review.rating ? '#f6e05e' : '#cbd5e0' }}
                                                            aria-hidden="true"
                                                        >
                                                            {star}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="review-text">{review.text}</p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="no-reviews-container">
                                        <img 
                                            src="https://cdn-icons-png.flaticon.com/512/4076/4076478.png" 
                                            alt="No reviews icon"
                                            className="no-reviews-icon"
                                        />
                                        <p className="no-reviews">
                                            No reviews yet. <br />
                                            <span className="no-reviews-subtext">Be the first to share your experience!</span>
                                        </p>
                                        <button 
                                            className="btn-primary"
                                            onClick={() => document.querySelector('.review-form').scrollIntoView({ behavior: 'smooth' })}
                                        >
                                            Write a Review
                                        </button>
                                    </div>
                                )}
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