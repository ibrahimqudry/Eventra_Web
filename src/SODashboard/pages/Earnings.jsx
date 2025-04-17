import React from "react";
import { Link } from "react-router-dom";
import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar";
import "../css/earnings.css";


const Earnings = () => {
  return (
    <div className="earnings-container">
      <Sidebar />

      <main className="main-content">
        <TopBar />

        <div className="earnings-content">
          <div className="page-header">
            <h1>Earnings Overview</h1>
            <div className="header-actions">
              <button className="btn-export">
                <i className="fas fa-download"></i>
                Export Report
              </button>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-dollar-sign"></i>
              </div>
              <div className="stat-details">
                <h3>Total Earnings</h3>
                <p className="stat-number">$45,678</p>
                <span className="stat-change positive">
                  +15% from last month
                </span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <div className="stat-details">
                <h3>Monthly Revenue</h3>
                <p className="stat-number">$8,450</p>
                <span className="stat-change positive">
                  +12% from last month
                </span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-shopping-cart"></i>
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
                <i className="fas fa-percentage"></i>
              </div>
              <div className="stat-details">
                <h3>Commission Rate</h3>
                <p className="stat-number">15%</p>
                <span className="stat-change">Standard rate</span>
              </div>
            </div>
          </div>

          <div className="earnings-chart">
            <div className="chart-header">
              <h2>Earnings Overview</h2>
              {/* Removing the chart-filters div */}
            </div>
            <div className="chart-container">
              <div className="chart-bars">
                {[
                  { value: 2450, label: "Mon", height: "60%" },
                  { value: 3200, label: "Tue", height: "80%" },
                  { value: 1800, label: "Wed", height: "40%" },
                  { value: 2800, label: "Thu", height: "70%" },
                  { value: 3600, label: "Fri", height: "90%" },
                  { value: 3000, label: "Sat", height: "75%" },
                  { value: 2000, label: "Sun", height: "50%" },
                ].map((bar, index) => (
                  <div
                    key={index}
                    className="chart-bar animate-bar"
                    style={{ 
                      height: bar.height,
                      animation: `growBar 1s ease-out ${index * 0.1}s`
                    }}
                  >
                    <span className="bar-value">${bar.value}</span>
                    <span className="bar-label">{bar.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="transactions-section">
            <div className="section-header">
              <h2>Recent Transactions</h2>
              <button className="btn-filter">
                <i className="fas fa-filter"></i>
                Filter
              </button>
            </div>
            <div className="table-container">
              <table className="transactions-table">
                <thead>
                  <tr>
                    <th>Transaction ID</th>
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
                    <td>#TRX001</td>
                    <td>
                      <div className="service-info-earnings">
                        <img
                          src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                          alt="Wedding Hall"
                        />
                        <span>Premium Wedding Hall</span>
                      </div>
                    </td>
                    <td>
                      <div className="customer-info-earnings">
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
                      <span className="status-badge completed">Completed</span>
                    </td>
                    <td>
                      <div className="actions">
                        <button className="btn-icon" title="View Details">
                          <i className="fas fa-eye"></i>
                        </button>
                        <button className="btn-icon" title="Download Invoice">
                          <i className="fas fa-download"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>#TRX002</td>
                    <td>
                      <div className="service-info-earnings">
                        <img
                          src="https://images.unsplash.com/photo-1470309864661-68328b2cd0a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                          alt="Makeup Service"
                        />
                        <span>Bridal Makeup</span>
                      </div>
                    </td>
                    <td>
                      <div className="customer-info-earnings">
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
                    <td>Apr 14, 2024</td>
                    <td>$350</td>
                    <td>
                      <span className="status-badge pending">Pending</span>
                    </td>
                    <td>
                      <div className="actions">
                        <button className="btn-icon" title="View Details">
                          <i className="fas fa-eye"></i>
                        </button>
                        <button className="btn-icon" title="Download Invoice">
                          <i className="fas fa-download"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>#TRX003</td>
                    <td>
                      <div className="service-info-earnings">
                        <img
                          src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                          alt="Conference Hall"
                        />
                        <span>Conference Hall</span>
                      </div>
                    </td>
                    <td>
                      <div className="customer-info-earnings">
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
                    <td>Apr 13, 2024</td>
                    <td>$800</td>
                    <td>
                      <span className="status-badge completed">Completed</span>
                    </td>
                    <td>
                      <div className="actions">
                        <button className="btn-icon" title="View Details">
                          <i className="fas fa-eye"></i>
                        </button>
                        <button className="btn-icon" title="Download Invoice">
                          <i className="fas fa-download"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
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

export default Earnings;
