import React, { useState, useEffect } from 'react'
import SideNav from '../components/SideNav';
import TopNav from '../components/TopNav';
import "../css/Ordersm.css";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

function Ordersm() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalOrders: 0,
        revenue: 0,
        customers: 0
    });

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                
                // Fetch all orders directly
                const ordersQuery = query(collection(db, 'orders'));
                const querySnapshot = await getDocs(ordersQuery);
                console.log('Total orders found:', querySnapshot.size);

                const ordersData = [];
                let totalRevenue = 0;
                const customerIds = new Set();

                // First get all customer IDs from orders
                const customerIdsArray = [];
                querySnapshot.forEach((doc) => {
                    const order = { id: doc.id, ...doc.data() };
                    console.log('Order data:', order);
                    console.log('Customer ID:', order.customer.id);
                    customerIdsArray.push(order.customer.id);
                });

                console.log('All customer IDs:', customerIdsArray);

                // Then fetch all customer data from users collection
                const usersQuery = query(
                    collection(db, 'users'),
                    where('uid', 'in', customerIdsArray)
                );
                console.log('Users query:', usersQuery);
                
                const usersSnapshot = await getDocs(usersQuery);
                console.log('Users snapshot:', usersSnapshot);
                
                const usersData = {};
                usersSnapshot.forEach(doc => {
                    console.log('User document:', doc.id, doc.data());
                    usersData[doc.id] = doc.data();
                });

                console.log('Users data map:', usersData);

                // Now process orders with complete customer data
                querySnapshot.forEach((doc) => {
                    const order = { id: doc.id, ...doc.data() };
                    const customerData = usersData[order.customer.id] || {};
                    ordersData.push({
                        ...order,
                        customer: {
                            ...order.customer,
                            photoURL: customerData.profileImage || 'img/per1.avif'
                        }
                    });
                    totalRevenue += order.ticket.price;
                    customerIds.add(order.customer.id);
                });

                setOrders(ordersData);
                setStats({
                    totalOrders: ordersData.length,
                    revenue: totalRevenue,
                    customers: customerIds.size
                });

            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <div className="loading">Loading orders...</div>;
    }

    return (
        <>
            <div className='ordersm-container'>
                <SideNav />
                <main className="order-content">
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

                        {/* Updated Stats Cards */}
                        <div className="stats-grid">
                            <div className="stat-card">
                                <div className="stat-icon">
                                    <i className="fas fa-shopping-cart"></i>
                                </div>
                                <div className="stat-details">
                                    <h3>Total Orders</h3>
                                    <p className="stat-number">{stats.totalOrders}</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">
                                    <i className="fas fa-dollar-sign"></i>
                                </div>
                                <div className="stat-details">
                                    <h3>Revenue</h3>
                                    <p className="stat-number">${stats.revenue.toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">
                                    <i className="fas fa-users"></i>
                                </div>
                                <div className="stat-details">
                                    <h3>Customers</h3>
                                    <p className="stat-number">{stats.customers}</p>
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

                        {/* Updated Orders Table */}
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
                                    {orders.map((order) => (
                                        <tr key={order.id}>
                                            <td>#{order.id.substring(0, 6)}</td>
                                            <td>
                                                <div className="customer-info">
                                                    <img src={order.customer.photoURL} alt={order.customer.name} />
                                                    <div>
                                                        <h4>{order.customer.name}</h4>
                                                        <span>{order.customer.email}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{order.event?.title || 'Event'}</td>
                                            <td>{new Date(order.date).toLocaleDateString()}</td>
                                            <td>${order.ticket?.price || 0}</td>
                                            <td>
                                                <span className={`status-badge ${order.status}`}>
                                                    {order.status}
                                                </span>
                                            </td>
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
                                    ))}
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


        </>
    )
}
export default Ordersm;



