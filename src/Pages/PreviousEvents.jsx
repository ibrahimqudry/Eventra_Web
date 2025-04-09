import React, { useState } from 'react';

const CustomerReviews = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", alt: "Tech Summit" },
    { src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80", alt: "Conference" },
    { src: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", alt: "Networking" }
  ];

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const [reviews, setReviews] = useState([
    {
      name: 'Emma Davis',
      date: '20 Mar, 2024',
      rating: 4,
      comment:
        "I recently had the opportunity to explore Pagedone's UI design system, and it left a lasting impression on my workflow.",
      likes: 8,
      dislikes: 2,
    },
    {
      name: 'Anuj Mishra',
      date: '16 Dec, 2023',
      rating: 5,
      comment:
        "Pagedone's UI design system seamlessly blends user-friendly features with a robust set of design components.",
      likes: 10,
      dislikes: 5,
    },
    {
      name: 'Robert Karmazov',
      date: '24 Oct, 2023',
      rating: 5,
      comment:
        "A go-to for creating visually stunning and consistent interfaces.",
      likes: 4,
      dislikes: 0,
    },
  ]);

  const [newReview, setNewReview] = useState({
    name: '',
    email: '',
    rating: 0,
    comment: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleRatingChange = (rating) => {
    setNewReview({ ...newReview, rating });
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (
      newReview.name &&
      newReview.email &&
      newReview.rating > 0 &&
      newReview.comment
    ) {
      setReviews([
        ...reviews,
        {
          ...newReview,
          date: new Date().toLocaleDateString(),
          likes: 0,
          dislikes: 0,
        },
      ]);
      setNewReview({ name: '', email: '', rating: 0, comment: '' });
    }
  };

  return (
    <>
      {/* Slider Section */}
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
                style={{ display: index === currentSlide ? 'block' : 'none', width: '100%' }}
              />
            ))}
          </div>
          <button className="ed-nav-btn ed-next" onClick={nextSlide}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div style={{ maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Customer Reviews</h2>

        {reviews.map((review, index) => (
          <div
            key={index}
            style={{ border: '1px solid #ddd', padding: '20px', marginBottom: '15px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <img
                src={`https://i.pravatar.cc/50?img=${index + 1}`}
                alt="User"
                style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
              />
              <div>
                <strong>{review.name}</strong>
                <p style={{ fontSize: '12px', color: '#888' }}>{review.date}</p>
              </div>
            </div>
            <div style={{ marginBottom: '10px' }}>
              {Array.from({ length: 5 }, (_, i) => (
                <span
                  key={i}
                  style={{ color: i < review.rating ? 'gold' : '#ddd', fontSize: '18px' }}
                >
                  ★
                </span>
              ))}
            </div>
            <p>{review.comment}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
              <div>
                <span role="img" aria-label="like">
                  👍
                </span>{' '}
                {review.likes}
                <span role="img" aria-label="dislike" style={{ marginLeft: '10px' }}>
                  👎
                </span>{' '}
                {review.dislikes}
              </div>
            </div>
          </div>
        ))}

        {/* Review Form */}
        <div style={{ borderTop: '1px solid #ddd', marginTop: '30px', paddingTop: '20px' }}>
          <h3>Submit Your Review</h3>
          <form onSubmit={handleSubmitReview}>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="rating" style={{ display: 'block', marginBottom: '5px' }}>
                Add Your Rating
              </label>
              <div>
                {Array.from({ length: 5 }, (_, i) => (
                  <span
                    key={i}
                    style={{
                      color: i < newReview.rating ? 'gold' : '#ddd',
                      fontSize: '24px',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleRatingChange(i + 1)}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>
                Name
              </label>
              <input
                type="text"
                name="name"
                value={newReview.name}
                onChange={handleInputChange}
                placeholder="John Doe"
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={newReview.email}
                onChange={handleInputChange}
                placeholder="email@pagedone.com"
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="comment" style={{ display: 'block', marginBottom: '5px' }}>
                Write Your Review
              </label>
              <textarea
                name="comment"
                value={newReview.comment}
                onChange={handleInputChange}
                placeholder="Write here..."
                style={{
                  width: '100%',
                  padding: '8px',
                  boxSizing: 'border-box',
                  minHeight: '100px',
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                backgroundColor: '#6750A4',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CustomerReviews;
