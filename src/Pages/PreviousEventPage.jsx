import React, { useState, useEffect } from 'react';
import '../css/previousEventPage.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const PreviousEventPage = () => {
  // Load reviews from localStorage on initial render
  const [reviews, setReviews] = useState(() => {
    const savedReviews = localStorage.getItem('eventReviews');
    return savedReviews ? JSON.parse(savedReviews) : [];
  });
  
  const [form, setForm] = useState({ name: '', email: '', comment: '', rating: 0 });
  const [editId, setEditId] = useState(null);
  const [lovedComments, setLovedComments] = useState(() => {
    const savedLoves = localStorage.getItem('lovedComments');
    return savedLoves ? JSON.parse(savedLoves) : {};
  });

  // Save reviews and loves to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('eventReviews', JSON.stringify(reviews));
    localStorage.setItem('lovedComments', JSON.stringify(lovedComments));
  }, [reviews, lovedComments]);

  const cards = [
    { id: 1, image: 'https://img.freepik.com/premium-photo/contemporary-student-with-vr-headset-demonstrating-abilities-automation-robot-front-his-classmates-presentation_274679-9219.jpg?w=1380',text: 'Artificial Intelligence & Machine Learning' },
    { id: 2, image: 'https://img.freepik.com/premium-photo/graph-is-going-up-male-business-trainer-is-against-projector-with-data-teaching-people_146671-123222.jpg?w=1380',text: 'Cloud Computing & DevOps' },
    { id: 3, image: 'https://img.freepik.com/free-photo/image-by-rawpixel-com_53876-165282.jpg?t=st=1745007077~exp=1745010677~hmac=2ea9d38674056ef30d7e19ef1238c84b1595effadde7d9de113d4990d7724fd1&w=1060' ,text: 'Cybersecurity'},
    { id: 4, image: 'https://img.freepik.com/premium-photo/recording-graduation-day_1048944-18644863.jpg?w=1480' ,text: 'Web3, Blockchain & FinTech'},
    { id: 5, image: 'https://img.freepik.com/premium-photo/building-space_664434-8204.jpg?w=1380' ,text: 'Metaverse & AR/VR'},
  ];

  // Slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0px',
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handleSubmit = () => {
    if (!form.name || !form.comment) return;

    if (editId !== null) {
      setReviews(reviews.map(r => r.id === editId ? { ...form, id: editId, date: r.date } : r));
      setEditId(null);
    } else {
      setReviews([
        {
          ...form,
          id: Date.now(),
          date: new Date().toLocaleDateString(),
          loves: 0,
          replies: 0
        },
        ...reviews
      ]);
    }

    setForm({ name: '', email: '', comment: '', rating: 0 });
  };

  const handleEdit = (id) => {
    const review = reviews.find(r => r.id === id);
    setForm(review);
    setEditId(id);
  };

  const handleDelete = (id) => {
    setReviews(reviews.filter(r => r.id !== id));
  };

  const handleLove = (id) => {
    // Get the current user's identifier (could be IP, email, or just a random ID)
    // For simplicity, we'll use a random ID for this example
    const userId = localStorage.getItem('userId') || Math.random().toString(36).substring(2, 15);
    localStorage.setItem('userId', userId);

    setLovedComments(prev => {
      const newLoves = { ...prev };
      if (!newLoves[id]) {
        newLoves[id] = [];
      }

      if (newLoves[id].includes(userId)) {
        // User already loved this comment, remove their love
        newLoves[id] = newLoves[id].filter(u => u !== userId);
      } else {
        // Add user's love
        newLoves[id] = [...newLoves[id], userId];
      }

      return newLoves;
    });

    // Update the review's love count
    setReviews(reviews.map(review => {
      if (review.id === id) {
        return {
          ...review,
          loves: lovedComments[id] ? lovedComments[id].length : 0
        };
      }
      return review;
    }));
  };

  return (
    <div className="container-previous">
        <div className="carousel-container">
      <h1 className="carousel-title">
      <h1>Tech Summit 2024</h1>
      <span className="pe-subtitle">Previous Event Highlights and Topics that had been discussed</span>
      </h1>
    
      <Slider {...settings}>
        {cards.map((card) => (
          <div key={card.id} className="card">
            <img src={card.image} alt={`Card ${card.id}`} />
            <div className="card-text"><p>{card.text}</p></div>
          </div>
        ))}
      </Slider>
      <div className="pv-event-header">
                        <div className="ed-event-meta">
                            <span className="ed-category">Technology</span>
                        </div>
                    </div>

                    <div className="pe-event-info">
                        <div className="pe-info-item">
                            <i className="fas fa-map-marker-alt"></i>
                            <div>
                                <h4>Location</h4>
                                <p>Cairo International Convention Center</p>
                            </div>
                        </div>
                        <div className="pe-info-item">
                            <i className="fas fa-calendar-alt"></i>
                            <div>
                                <h4>Date</h4>
                                <p>April 15, 2024</p>
                            </div>
                        </div>
                        <div className="pe-info-item">
                            <i className="fas fa-users"></i>
                            <div>
                                <h4>Number Of Attendees</h4>
                                <p>500 Attendees</p>
                            </div>
                        </div>
                    </div>

    </div>
 
      <h1 className="title">Customer Reviews</h1>

      {reviews.map((review) => (
        <div className="review-card" key={review.id}>
          <div className="review-header">
            <div>
              <h3>{review.name}</h3>
              <p className="review-date">{review.date}</p>
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>{i < review.rating ? '★' : '☆'}</span>
                ))}
              </div>
            </div>
            <div className="review-actions">
              <span 
                className="love-icon" 
                onClick={() => handleLove(review.id)}
                style={{ color: lovedComments[review.id]?.includes(localStorage.getItem('userId')) ? 'red' : 'gray' }}
              >
                ❤️ {lovedComments[review.id]?.length || 0}
              </span>
              <button onClick={() => handleEdit(review.id)}>Edit</button>
              <button onClick={() => handleDelete(review.id)}>Delete</button>
            </div>
          </div>
          <p>{review.comment}</p>
        </div>
      ))}

      <div className="form-card">
        <h2>Submit Your Review</h2>
        <div className="stars">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className="star-select"
              onClick={() => setForm({ ...form, rating: i + 1 })}
            >
              {i < form.rating ? '★' : '☆'}
            </span>
          ))}
        </div>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <textarea
          placeholder="Write your review..."
          value={form.comment}
          onChange={(e) => setForm({ ...form, comment: e.target.value })}
        />
        <button onClick={handleSubmit}>
          {editId !== null ? 'Update Review' : 'Submit Review'}
        </button>
      </div>
    </div>
  );
};

export default PreviousEventPage;