import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/adminDashboard.css';

const AdminDashboard = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isLoading, setIsLoading] = useState(true);
    const [registrations, setRegistrations] = useState([]);

    // Prepare for Firebase integration
    useEffect(() => {
        const fetchRegistrations = async () => {
            try {
                setIsLoading(true);
                // TODO: Replace with Firebase fetch
                setRegistrations(mockRegistrations);
            } catch (error) {
                console.error('Error fetching registrations:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRegistrations();
    }, []);

    const handleApprove = async (userId) => {
        try {
            // TODO: Replace with Firebase update
            setRegistrations(prev => 
                prev.map(reg => 
                    reg.id === userId ? {...reg, status: 'approved'} : reg
                )
            );
        } catch (error) {
            console.error('Error approving registration:', error);
        }
    };

    const handleRestore = async (userId) => {
        try {
            // TODO: Replace with Firebase update
            setRegistrations(prev => 
                prev.map(reg => 
                    reg.id === userId ? {...reg, status: 'pending'} : reg
                )
            );
        } catch (error) {
            console.error('Error restoring registration:', error);
        }
    };

    const handleDelete = async (userId) => {
        try {
            // TODO: Replace with Firebase update
            setRegistrations(prev => 
                prev.map(reg => 
                    reg.id === userId ? {...reg, status: 'deleted'} : reg
                )
            );
        } catch (error) {
            console.error('Error deleting registration:', error);
        }
    };

    const handleReject = async (userId) => {
        try {
            // TODO: Replace with Firebase delete/update
            setRegistrations(prev => 
                prev.filter(reg => reg.id !== userId)
            );
        } catch (error) {
            console.error('Error rejecting registration:', error);
        }
    };

    const getFilteredRegistrations = () => {
        switch(activeTab) {
            case 'pending':
                return registrations.filter(reg => reg.status === 'pending');
            case 'approved':
                return registrations.filter(reg => reg.status === 'approved');
            case 'deleted':
                return registrations.filter(reg => reg.status === 'deleted');
            default:
                return registrations;
        }
    };

    const filteredRegistrations = getFilteredRegistrations();

    return (
        <div className="admin-container">
            <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
                <div className="sidebar-header">
                    <h2>Admin Panel</h2>
                    <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="toggle-btn">
                        {isSidebarOpen ? '←' : '→'}
                    </button>
                </div>
                <nav className="sidebar-nav">
                    <Link to="#" className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
                        <i className="fas fa-home"></i> All Registrations
                    </Link>
                    <Link to="#" className={activeTab === 'pending' ? 'active' : ''} onClick={() => setActiveTab('pending')}>
                        <i className="fas fa-clock"></i> Pending Registrations
                    </Link>
                    <Link to="#" className={activeTab === 'approved' ? 'active' : ''} onClick={() => setActiveTab('approved')}>
                        <i className="fas fa-check-circle"></i> Approved Registrations
                    </Link>
                    <Link to="#" className={activeTab === 'deleted' ? 'active' : ''} onClick={() => setActiveTab('deleted')}>
                        <i className="fas fa-trash-alt"></i> Deleted Registrations
                    </Link>
                </nav>
            </div>

            <div className={`main-content ${!isSidebarOpen ? 'expanded' : ''}`}>
                <header className="dashboard-header">
                    <div className="header-content">
                        <h1>
                            {activeTab === 'dashboard' ? 'All Registrations' : 
                            activeTab === 'pending' ? 'Pending Registrations' : 
                            activeTab === 'approved' ? 'Approved Registrations' :
                            'Deleted Registrations'}
                        </h1>
                        <div className="admin-profile">
                            <span>Admin</span>
                            <img src="https://via.placeholder.com/40" alt="Admin" className="admin-avatar" />
                        </div>
                    </div>
                </header>

                {isLoading ? (
                    <div className="loading-spinner">
                        <div className="spinner"></div>
                        <p>Loading registrations...</p>
                    </div>
                ) : (
                    <>
                        <div className="dashboard-stats">
                            <div className="stat-card">
                                <div className="stat-icon">
                                    <i className="fas fa-clock"></i>
                                </div>
                                <div className="stat-content">
                                    <h3>Pending Registrations</h3>
                                    <p>{registrations.filter(reg => reg.status === 'pending').length}</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">
                                    <i className="fas fa-check-circle"></i>
                                </div>
                                <div className="stat-content">
                                    <h3>Approved Registrations</h3>
                                    <p>{registrations.filter(reg => reg.status === 'approved').length}</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">
                                    <i className="fas fa-trash-alt"></i>
                                </div>
                                <div className="stat-content">
                                    <h3>Deleted Registrations</h3>
                                    <p>{registrations.filter(reg => reg.status === 'deleted').length}</p>
                                </div>
                            </div>
                        </div>

                        <div className="registration-grid">
                            {filteredRegistrations.length === 0 ? (
                                <div className="no-data">
                                    <i className="fas fa-inbox"></i>
                                    <p>No registrations found</p>
                                </div>
                            ) : (
                                filteredRegistrations.map(registration => (
                                    <div key={registration.id} className="registration-card">
                                        <div className="status-badge" data-status={registration.status}>
                                            {registration.status}
                                        </div>
                                        <div className="registration-info">
                                            <h3>{registration.name}</h3>
                                            <p><i className="fas fa-envelope"></i> {registration.email}</p>
                                            <p><i className="fas fa-briefcase"></i> {registration.serviceType}</p>
                                            <p><i className="fas fa-info-circle"></i> Status: {registration.status}</p>
                                            <a href={registration.documentUrl} target="_blank" rel="noopener noreferrer">
                                                <i className="fas fa-file-pdf"></i> View Document
                                            </a>
                                        </div>
                                        {registration.status === 'pending' && (
                                            <div className="action-buttons">
                                                <button className="approve-btn" onClick={() => handleApprove(registration.id)}>
                                                    <i className="fas fa-check"></i> Approve
                                                </button>
                                                <button className="reject-btn" onClick={() => handleReject(registration.id)}>
                                                    <i className="fas fa-times"></i> Reject
                                                </button>
                                            </div>
                                        )}
                                        {registration.status === 'deleted' && (
                                            <div className="action-buttons">
                                                <button className="approve-btn" onClick={() => handleApprove(registration.id)}>
                                                    <i className="fas fa-check"></i> Approve
                                                </button>
                                                <button className="restore-btn" onClick={() => handleRestore(registration.id)}>
                                                    <i className="fas fa-undo"></i> Restore to Pending
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;