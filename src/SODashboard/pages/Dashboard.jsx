import React from "react";
import { Link } from "react-router-dom";
import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar";
import "../css/Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="main-content">
        <TopBar />

        <div className="dashboard-content">
            {/* Stats Cards */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon-dashboard" style={{background: "linear-gradient(135deg, #FF6B6B, #FF8E8E)"}}>
                        <i className="fas fa-concierge-bell"></i>
                    </div>
                    <div className="stat-details">
                        <h3>Active Services</h3>
                        <p className="stat-number">12</p>
                        <span className="stat-change positive">+2 new this month</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon-dashboard" style={{background: "linear-gradient(135deg, #4CAF50, #8BC34A)"}}>
                        <i className="fas fa-calendar-check"></i>
                    </div>
                    <div className="stat-details">
                        <h3>Total Bookings</h3>
                        <p className="stat-number">156</p>
                        <span className="stat-change positive">+23% from last month</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon-dashboard" style={{background: "linear-gradient(135deg, #2196F3, #03A9F4)"}}>
                        <i className="fas fa-dollar-sign"></i>
                    </div>
                    <div className="stat-details">
                        <h3>Monthly Revenue</h3>
                        <p className="stat-number">$8,450</p>
                        <span className="stat-change positive">+15% from last month</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon-dashboard" style={{background: "linear-gradient(135deg, #9C27B0, #E040FB)"}}>
                        <i className="fas fa-star"></i>
                    </div>
                    <div className="stat-details">
                        <h3>Average Rating</h3>
                        <p className="stat-number">4.8</p>
                        <span className="stat-change positive">+0.2 from last month</span>
                    </div>
                </div>
            </div>

            {/* Recent Bookings */}
            <div className="content-section">
                <div className="section-header">
                    <h2>Recent Bookings</h2>
                    <Link to="/bookings" className="btn-link">View All</Link>
                </div>
                <div className="table-responsive">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Service</th>
                                <th>Customer</th>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="service-info-dashboard">
                                        <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Wedding Hall" />
                                        <span>Premium Wedding Hall</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="customer-info-dashboard">
                                        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Sarah" />
                                        <div>
                                            <h4>Sarah Ahmed</h4>
                                            <span>sarah@example.com</span>
                                        </div>
                                    </div>
                                </td>
                                <td>Apr 15, 2024</td>
                                <td>$2,500</td>
                                <td><span className="status-badge confirmed">Confirmed</span></td>
                                <td>
                                    <div className="action-buttons">
                                        <button className="btn-icon" title="View Details"><i className="fas fa-eye"></i></button>
                                        <button className="btn-icon" title="Message"><i className="fas fa-comment"></i></button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="service-info-dashboard">
                                        <img src="https://images.unsplash.com/photo-1470309864661-68328b2cd0a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Makeup Service" />
                                        <span>Bridal Makeup</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="customer-info-dashboard">
                                        <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Nour" />
                                        <div>
                                            <h4>Nour Hassan</h4>
                                            <span>nour@example.com</span>
                                        </div>
                                    </div>
                                </td>
                                <td>Apr 18, 2024</td>
                                <td>$350</td>
                                <td><span className="status-badge pending">Pending</span></td>
                                <td>
                                    <div className="action-buttons">
                                        <button className="btn-icon" title="View Details"><i className="fas fa-eye"></i></button>
                                        <button className="btn-icon" title="Message"><i className="fas fa-comment"></i></button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Recent Reviews */}
            <div className="content-section">
                <div className="section-header">
                    <h2>Recent Reviews</h2>
                    <Link to="/reviews" className="btn-link">View All</Link>
                </div>
                <div className="reviews-grid">
                    <div className="review-card-dashboard">
                        <div className="review-header">
                            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Customer" />
                            <div>
                                <h4>Sarah Ahmed</h4>
                                <div className="rating">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                </div>
                            </div>
                            <span className="review-date">2 days ago</span>
                        </div>
                        <p className="review-text">"Amazing service! The wedding hall was perfectly decorated and the staff was very professional. Highly recommended!"</p>
                        <div className="review-service">
                            <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Wedding Hall" />
                            <span>Premium Wedding Hall</span>
                        </div>
                    </div>

                    <div className="review-card-dashboard">
                        <div className="review-header">
                            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Customer" />
                            <div>
                                <h4>Nour Hassan</h4>
                                <div className="rating">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="far fa-star"></i>
                                </div>
                            </div>
                            <span className="review-date">1 week ago</span>
                        </div>
                        <p className="review-text">"The makeup artist was very skilled and professional. Really happy with the results!"</p>
                        <div className="review-service">
                            <img src="https://images.unsplash.com/photo-1470309864661-68328b2cd0a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Makeup Service" />
                            <span>Bridal Makeup</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
