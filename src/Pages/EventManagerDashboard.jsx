import React from 'react'
import SideNav from '../components/SideNav';
import TopNav from '../components/TopNav';
import "../css/EventManagerDashboard.css";
import { Link } from 'react-router-dom';
function EventMDashbord() {
  return (
    <>
      <body>
        <SideNav />

        <main className="main-content">
          <TopNav />
          <div className="dashboard-content">
            <div className="stats-grid">
              <div className="stat-card">
                <div
                  className="stat-icon"
                  style={{
                    background: "linear-gradient(135deg, #FF6B6B, #FF8E8E)",
                  }}
                >
                  <i className="fas fa-calendar-check"></i>
                </div>
                <div className="stat-details">
                  <h3>Total Events</h3>
                  <p className="stat-number">24</p>
                  <span className="stat-change positive">
                    +12% from last month
                  </span>
                </div>
              </div>
              <div className="stat-card">
                <div
                  className="stat-icon"
                  style={{
                    background: "linear-gradient(135deg, #4CAF50, #8BC34A)",
                  }}
                >
                  <i className="fas fa-users"></i>
                </div>
                <div className="stat-details">
                  <h3>Total Attendees</h3>
                  <p className="stat-number">1,234</p>
                  <span className="stat-change positive">
                    +8% from last month
                  </span>
                </div>
              </div>
              <div className="stat-card">
                <div
                  className="stat-icon"
                  style={{
                    background: "linear-gradient(135deg, #2196F3, #03A9F4)",
                  }}
                >
                  <i className="fas fa-dollar-sign"></i>
                </div>
                <div className="stat-details">
                  <h3>Revenue</h3>
                  <p className="stat-number">$12,345</p>
                  <span className="stat-change positive">
                    +15% from last month
                  </span>
                </div>
              </div>
              <div className="stat-card">
                <div
                  className="stat-icon"
                  style={{
                    background: "linear-gradient(135deg, #9C27B0, #E040FB)",
                  }}
                >
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
            </div>

            <div className="content-section">
              <div className="section-header">
                <h2>Recent Events</h2>
                <Link to="/Eventm" className="btn-link">
                  View All
                </Link>
              </div>
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Event Name</th>
                      <th>Date</th>
                      <th>Location</th>
                      <th>Attendees</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="event-name">
                          <img src="img/ev1.avif" alt="Tech Summit" />
                          <span>Tech Summit 2024</span>
                        </div>
                      </td>
                      <td>Apr 15, 2024</td>
                      <td>San Francisco</td>
                      <td>500/600</td>
                      <td>
                        <span className="status-badge upcoming">Upcoming</span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="btn-icon" title="Edit">
                            <i className="fas fa-edit"></i>
                          </button>
                          <button className="btn-icon" title="Delete">
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="event-name">
                          <img src="img/ev2.avif" alt="Design Conference" />
                          <span>Design Conference</span>
                        </div>
                      </td>
                      <td>May 20, 2024</td>
                      <td>New York</td>
                      <td>300/300</td>
                      <td>
                        <span className="status-badge sold-out">Sold Out</span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="btn-icon" title="Edit">
                            <i className="fas fa-edit"></i>
                          </button>
                          <button className="btn-icon" title="Delete">
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="event-name">
                          <img src="img/ev3.avif" alt="Startup Weekend" />
                          <span>Startup Weekend</span>
                        </div>
                      </td>
                      <td>Jun 10, 2024</td>
                      <td>London</td>
                      <td>150/200</td>
                      <td>
                        <span className="status-badge active">Active</span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="btn-icon" title="Edit">
                            <i className="fas fa-edit"></i>
                          </button>
                          <button className="btn-icon" title="Delete">
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="content-section">
              <div className="section-header">
                <h2>Recent Orders</h2>
                <Link to="/orders" className="btn-link">
                  View All
                </Link>
              </div>
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Event</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>#ORD-001</td>
                      <td>
                        <div className="customer-info">
                          <img src="img/per2.avif" alt="Sarah Johnson" />
                          <span>Sarah Johnson</span>
                        </div>
                      </td>
                      <td>Tech Summit 2024</td>
                      <td>Mar 15, 2024</td>
                      <td>$299</td>
                      <td>
                        <span className="status-badge completed">
                          Completed
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>#ORD-002</td>
                      <td>
                        <div className="customer-info">
                          <img src="img/per1.avif" alt="Michael Chen" />
                          <span>Michael Chen</span>
                        </div>
                      </td>
                      <td>Design Conference</td>
                      <td>Mar 14, 2024</td>
                      <td>$199</td>
                      <td>
                        <span className="status-badge pending">Pending</span>
                      </td>
                    </tr>
                    <tr>
                      <td>#ORD-003</td>
                      <td>
                        <div className="customer-info">
                          <img src="img/per3.avif" alt="Emily Davis" />
                          <span>Emily Davis</span>
                        </div>
                      </td>
                      <td>Startup Weekend</td>
                      <td>Mar 13, 2024</td>
                      <td>$149</td>
                      <td>
                        <span className="status-badge completed">
                          Completed
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </body>
    </>
  );
}

export default EventMDashbord;