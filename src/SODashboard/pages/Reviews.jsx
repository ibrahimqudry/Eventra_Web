import React from "react";
import { Link } from "react-router-dom";
import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar";
import "../css/reviews.css";


const ReviewCard = ({ review }) => {
  const { customer, rating, service, text, date } = review;
  return (
    <div className="review-card">
      <div className="review-header">
        <div className="customer-info">
          <img src={customer.image} alt={customer.name} />
          <div>
            <h4>{customer.name}</h4>
            <span>{date}</span>
          </div>
        </div>
        <div className="review-rating">
          <div className="stars">
            {[...Array(5)].map((_, index) => (
              <i
                key={index}
                className={`fas fa-star ${index < rating ? "" : "far"}`}
              />
            ))}
          </div>
          <span>{rating.toFixed(1)}</span>
        </div>
      </div>
      <div className="service-info-sod">
        <img src={service.image} alt={service.name} />
        <span>{service.name}</span>
      </div>
      <p className="review-text">{text}</p>
      <div className="review-actions">
        <button className="btn-reply">
          <i className="fas fa-reply"></i>
          Reply
        </button>
        <div className="action-buttons">
          <button className="btn-icon" title="Mark as Featured">
            <i className="fas fa-star"></i>
          </button>
          <button className="btn-icon" title="Report">
            <i className="fas fa-flag"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

const RatingBar = ({ stars, count, total }) => {
  const percentage = (count / total) * 100;
  return (
    <div className="rating-bar">
      <div className="rating-label">{stars} Stars</div>
      <div className="bar-container">
        <div className="bar" style={{ width: `${percentage}%` }}></div>
      </div>
      <div className="rating-count">{count}</div>
    </div>
  );
};

const Reviews = () => {
  const reviewsData = [
    {
      customer: {
        name: "Sarah Ahmed",
        image:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      rating: 5,
      service: {
        name: "Premium Wedding Hall",
        image:
          "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      },
      text: "Amazing service! The wedding hall was perfectly decorated and the staff was very professional. Everything was exactly as promised. Highly recommended!",
      date: "2 days ago",
    },
    {
      customer: {
        name: "Nour Hassan",
        image:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      rating: 4,
      service: {
        name: "Bridal Makeup",
        image:
          "https://images.unsplash.com/photo-1470309864661-68328b2cd0a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      },
      text: "The makeup artist was very skilled and professional. Really happy with the results! Would have appreciated more time for consultation before starting.",
      date: "1 week ago",
    },
    {
      customer: {
        name: "Ahmed Mahmoud",
        image:
          "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      rating: 5,
      service: {
        name: "Conference Hall",
        image:
          "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      },
      text: "Perfect venue for our corporate event. The technical setup was flawless and the staff was very accommodating. Will definitely book again!",
      date: "2 weeks ago",
    },
  ];

  const ratingDistribution = {
    5: 180,
    4: 36,
    3: 12,
    2: 7,
    1: 5,
  };

  const totalReviews = Object.values(ratingDistribution).reduce(
    (a, b) => a + b,
    0
  );

  return (
    <div className="reviews-container-sod">
      <Sidebar />
      <main className="main-content-sod">
        <TopBar />

        <div className="reviews-content">
          <div className="page-header">
            <h1>Reviews & Ratings</h1>
            <div className="header-actions">
              <button className="btn-export">
                <i className="fas fa-download"></i>
                Export Reviews
              </button>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-star"></i>
              </div>
              <div className="stat-details">
                <h3>Average Rating</h3>
                <p className="stat-number">4.8</p>
                <span className="stat-change positive">
                  +0.2 from last month
                </span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-comment"></i>
              </div>
              <div className="stat-details">
                <h3>Total Reviews</h3>
                <p className="stat-number">245</p>
                <span className="stat-change positive">+18 new this month</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-thumbs-up"></i>
              </div>
              <div className="stat-details">
                <h3>Positive Reviews</h3>
                <p className="stat-number">92%</p>
                <span className="stat-change positive">
                  +3% from last month
                </span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-reply"></i>
              </div>
              <div className="stat-details">
                <h3>Response Rate</h3>
                <p className="stat-number">98%</p>
                <span className="stat-change positive">
                  +5% from last month
                </span>
              </div>
            </div>
          </div>

          <div className="rating-distribution">
            <h2>Rating Distribution</h2>
            <div className="rating-bars">
              {[5, 4, 3, 2, 1].map((stars) => (
                <RatingBar
                  key={stars}
                  stars={stars}
                  count={ratingDistribution[stars]}
                  total={totalReviews}
                />
              ))}
            </div>
          </div>

          <div className="reviews-grid">
            {reviewsData.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))}
          </div>

          <div className="pagination">
            <button className="page-btn" disabled>
              <i className="fas fa-chevron-left"></i>
            </button>
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
            <span className="page-dots">...</span>
            <button className="page-btn">10</button>
            <button className="page-btn">
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reviews;
