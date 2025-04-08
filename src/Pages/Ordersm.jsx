import React from 'react'
import SideNav from '../components/SideNav';
import TopNav from '../components/TopNav';
import "../css/Ordersm.css";


function Ordersm() {
    return (
        <>
            <body>
                <SideNav />
                <main className="main-content">
                    <TopNav />

                    <div className="orders-content">
                        <div className="page-header">
                            <h1>Orders Management</h1>
                            <div className="header-actions">
                                <button className="btn-export">
                                    <i className="fas fa-download"></i>
                                    Export Orders
                                </button>
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div className="stats-grid">
                            <div className="stat-card">
                                <div className="stat-icon">
                                    <i className="fas fa-shopping-cart"></i>
                                </div>
                                <div className="stat-details">
                                    <h3>Total Orders</h3>
                                    <p className="stat-number">1,234</p>
                                    <span className="stat-change positive">+15% from last month</span>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">
                                    <i className="fas fa-dollar-sign"></i>
                                </div>
                                <div className="stat-details">
                                    <h3>Revenue</h3>
                                    <p className="stat-number">$45,678</p>
                                    <span className="stat-change positive">+12% from last month</span>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">
                                    <i className="fas fa-users"></i>
                                </div>
                                <div className="stat-details">
                                    <h3>Customers</h3>
                                    <p className="stat-number">890</p>
                                    <span className="stat-change positive">+8% from last month</span>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">
                                    <i className="fas fa-chart-line"></i>
                                </div>
                                <div className="stat-details">
                                    <h3>Growth Rate</h3>
                                    <p className="stat-number">12%</p>
                                    <span className="stat-change positive">+2% from last month</span>
                                </div>
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="filters-section">
                            <div className="filters-group">
                                <select className="filter-select">
                                    <option value="">All Status</option>
                                    <option value="completed">Completed</option>
                                    <option value="pending">Pending</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                                <select className="filter-select">
                                    <option value="">Payment Method</option>
                                    <option value="credit">Credit Card</option>
                                    <option value="paypal">PayPal</option>
                                    <option value="bank">Bank Transfer</option>
                                </select>
                                <input type="date" className="filter-date" placeholder="Select Date" />
                            </div>
                            <button className="btn-filter">
                                <i className="fas fa-filter"></i>
                                Apply Filters
                            </button>
                        </div>

                        {/* Orders Table */}
                        <div className="table-container">
                            <table className="orders-table">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Customer</th>
                                        <th>Event</th>
                                        <th>Date</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>#ORD001</td>
                                        <td>
                                            <div className="customer-info">
                                                <img src="img/per1.avif" alt="Sarah Johnson" />
                                                <div>
                                                    <h4>Sarah Johnson</h4>
                                                    <span>sarah@example.com</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>Tech Summit 2024</td>
                                        <td>Mar 15, 2024</td>
                                        <td>$299</td>
                                        <td><span className="status-badge completed">Completed</span></td>
                                        <td>
                                            <div className="actions">
                                                <button className="action-btn view" title="View">
                                                    <i className="fas fa-eye"></i>
                                                </button>
                                                <button className="action-btn download" title="Download">
                                                    <i className="fas fa-download"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>#ORD002</td>
                                        <td>
                                            <div className="customer-info">
                                                <img src="img/per2.avif" alt="Michael Chen" />
                                                <div>
                                                    <h4>Michael Chen</h4>
                                                    <span>michael@example.com</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>Design Conference</td>
                                        <td>Mar 14, 2024</td>
                                        <td>$199</td>
                                        <td><span className="status-badge pending">Pending</span></td>
                                        <td>
                                            <div className="actions">
                                                <button className="action-btn view" title="View">
                                                    <i className="fas fa-eye"></i>
                                                </button>
                                                <button className="action-btn download" title="Download">
                                                    <i className="fas fa-download"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>#ORD003</td>
                                        <td>
                                            <div className="customer-info">
                                                <img src="img/per3.avif" alt="Emily Davis" />
                                                <div>
                                                    <h4>Emily Davis</h4>
                                                    <span>emily@example.com</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>Startup Weekend</td>
                                        <td>Mar 13, 2024</td>
                                        <td>$149</td>
                                        <td><span className="status-badge completed">Completed</span></td>
                                        <td>
                                            <div className="actions">
                                                <button className="action-btn view" title="View">
                                                    <i className="fas fa-eye"></i>
                                                </button>
                                                <button className="action-btn download" title="Download">
                                                    <i className="fas fa-download"></i>
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

            </body>


        </>
    )
}
export default Ordersm;



