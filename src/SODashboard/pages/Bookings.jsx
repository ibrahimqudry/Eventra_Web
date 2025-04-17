import React, { useState } from "react";
import { Link } from "react-router-dom";
import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar";
import "../css/bookings.css";

const Bookings = () => {
  const [filters, setFilters] = useState({
    service: "",
    status: "",
  });

  const [bookings, setBookings] = useState([
    {
      id: "BK001",
      service: {
        name: "Premium Wedding Hall",
        type: "Full Day Booking",
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      customer: {
        name: "Sarah Ahmed",
        email: "sarah@example.com",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      },
      date: "Apr 15, 2024",
      amount: 2500,
      status: "confirmed"
    },
    // ... add other booking data
  ]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleApplyFilters = () => {
    const filteredBookings = bookings.filter(booking => {
      const serviceMatch = !filters.service || booking.service.name.toLowerCase().includes(filters.service.toLowerCase());
      const statusMatch = !filters.status || booking.status === filters.status.toLowerCase();
      return serviceMatch && statusMatch;
    });
    setBookings(filteredBookings);
  };

  return (
    <div className="bookings-container">
      <Sidebar />

      <main className="main-content">
        <TopBar />

        <div className="bookings-content">
          <div className="page-header">
            <h1>Bookings Management</h1>
            <div className="header-actions">
              <button className="btn-export">
                <i className="fas fa-download"></i>
                Export Bookings
              </button>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-calendar-check"></i>
              </div>
              <div className="stat-details">
                <h3>Total Bookings</h3>
                <p className="stat-number">156</p>
                <span className="stat-change positive">
                  +23% from last month
                </span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-clock"></i>
              </div>
              <div className="stat-details">
                <h3>Pending Bookings</h3>
                <p className="stat-number">12</p>
                <span className="stat-change">Requires attention</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-check-circle"></i>
              </div>
              <div className="stat-details">
                <h3>Completed</h3>
                <p className="stat-number">142</p>
                <span className="stat-change positive">91% success rate</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-dollar-sign"></i>
              </div>
              <div className="stat-details">
                <h3>Revenue</h3>
                <p className="stat-number">$45,678</p>
                <span className="stat-change positive">
                  +15% from last month
                </span>
              </div>
            </div>
          </div>

          <div className="filters-section">
            <div className="filters-group">
              <select 
                className="filter-select"
                name="service"
                value={filters.service}
                onChange={handleFilterChange}
              >
                <option value="">All Services</option>
                <option value="Wedding Hall">Wedding Hall</option>
                <option value="Makeup">Makeup Service</option>
                <option value="Photography">Photography</option>
              </select>
              <select 
                className="filter-select"
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
              >
                <option value="">All Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <button 
              className="btn-filter"
              onClick={handleApplyFilters}
            >
              <i className="fas fa-filter"></i>
              Apply Filters
            </button>
          </div>

          <div className="table-container">
            <table className="bookings-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
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
                  <td>#BK001</td>
                  <td>
                    <div className="service-info-bookings">
                      <img
                        src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                        alt="Wedding Hall"
                      />
                      <div>
                        <h4>Premium Wedding Hall</h4>
                        <span>Full Day Booking</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="customer-info">
                      <img
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt="Sarah"
                      />
                      <div>
                        <h4>Sarah Ahmed</h4>
                        <span>sarah@example.com</span>
                      </div>
                    </div>
                  </td>
                  <td>Apr 15, 2024</td>
                  <td>$2,500</td>
                  <td>
                    <span className="status-badge confirmed">Confirmed</span>
                  </td>
                  <td>
                    <div className="actions">
                      <button className="btn-icon view" title="View Details">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="btn-icon message" title="Message">
                        <i className="fas fa-comment"></i>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>#BK002</td>
                  <td>
                    <div className="service-info-bookings">
                      <img
                        src="https://images.unsplash.com/photo-1470309864661-68328b2cd0a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                        alt="Makeup Service"
                      />
                      <div>
                        <h4>Bridal Makeup</h4>
                        <span>Wedding Package</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="customer-info-bookings">
                      <img
                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt="Nour"
                      />
                      <div>
                        <h4>Nour Hassan</h4>
                        <span>nour@example.com</span>
                      </div>
                    </div>
                  </td>
                  <td>Apr 18, 2024</td>
                  <td>$350</td>
                  <td>
                    <span className="status-badge pending">Pending</span>
                  </td>
                  <td>
                    <div className="actions">
                      <button className="btn-icon view" title="View Details">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="btn-icon message" title="Message">
                        <i className="fas fa-comment"></i>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>#BK003</td>
                  <td>
                    <div className="service-info-bookings">
                      <img
                        src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                        alt="Conference Hall"
                      />
                      <div>
                        <h4>Conference Hall</h4>
                        <span>Half Day Booking</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="customer-info-bookings">
                      <img
                        src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt="Ahmed"
                      />
                      <div>
                        <h4>Ahmed Mahmoud</h4>
                        <span>ahmed@example.com</span>
                      </div>
                    </div>
                  </td>
                  <td>Apr 20, 2024</td>
                  <td>$800</td>
                  <td>
                    <span className="status-badge completed">Completed</span>
                  </td>
                  <td>
                    <div className="actions">
                      <button className="btn-icon view" title="View Details">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="btn-icon message" title="Message">
                        <i className="fas fa-comment"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
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

export default Bookings;
