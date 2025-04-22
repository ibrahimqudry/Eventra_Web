import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/adminDashboard.css';
// import '../css/nav.css';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminDashboard = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isLoading, setIsLoading] = useState(true);
    const [registrations, setRegistrations] = useState([]);

    // Prepare for Firebase integration
    useEffect(() => {
        const fetchAllRegistrations = async () => {
            try {
                setIsLoading(true);
                const q = query(collection(db, 'users'));
                const querySnapshot = await getDocs(q);
                
                const allUsers = [];
                querySnapshot.forEach((doc) => {
                    allUsers.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
                
                setRegistrations(allUsers);
            } catch (error) {
                console.error('Error fetching registrations:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllRegistrations();
    }, [activeTab]); // Add activeTab as dependency

    // Update the handleApprove function
    const handleApprove = async (userId) => {
        try {
            const userRef = doc(db, 'users', userId);
            await updateDoc(userRef, {
                verificationStatus: 'approved',
                status: 'approved',
                verified: true
            });

            setRegistrations(prev =>
                prev.map(reg =>
                    reg.id === userId ? { ...reg, verificationStatus: 'approved' } : reg
                )
            );
            toast.success('User approved successfully!');
        } catch (error) {
            console.error('Error approving registration:', error);
            toast.error('Failed to approve user');
        }
    };

    const handleReject = async (userId) => {
        try {
            const userRef = doc(db, 'users', userId);
            await updateDoc(userRef, {
                verificationStatus: 'rejected',
                status: 'rejected'
            });

            setRegistrations(prev =>
                prev.map(reg =>
                    reg.id === userId ? { ...reg, verificationStatus: 'rejected' } : reg
                )
            );
            toast.success('User rejected successfully!');
        } catch (error) {
            console.error('Error rejecting registration:', error);
            toast.error('Failed to reject user');
        }
    };

    const getFilteredRegistrations = () => {
        switch (activeTab) {
            case 'pending':
                return registrations.filter(reg => reg.verificationStatus === 'pending');
            case 'approved':
                return registrations.filter(reg => reg.verificationStatus === 'approved');
            case 'deleted':
                return registrations.filter(reg => reg.verificationStatus === 'rejected');
            default:
                return registrations;
        }
    };

    // Update the stats cards to use verificationStatus
    <div className="dashboard-stats">
        <div className="stat-card">
            <div className="stat-icon">
                <i className="fas fa-clock"></i>
            </div>
            <div className="stat-content">
                <h3>Pending Registrations</h3>
                <p>{registrations.filter(reg => reg.verificationStatus === 'pending').length}</p>
            </div>
        </div>
        <div className="stat-card">
            <div className="stat-icon">
                <i className="fas fa-check-circle"></i>
            </div>
            <div className="stat-content">
                <h3>Approved Registrations</h3>
                <p>{registrations.filter(reg => reg.verificationStatus === 'approved').length}</p>
            </div>
        </div>
        <div className="stat-card">
            <div className="stat-icon">
                <i className="fas fa-trash-alt"></i>
            </div>
            <div className="stat-content">
                <h3>Rejected Registrations</h3>
                <p>{registrations.filter(reg => reg.verificationStatus === 'rejected').length}</p>
            </div>
        </div>
    </div>

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
                <nav className="sidebar-nav-admin">
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
                        <i className="fas fa-trash-alt"></i> Rejected Registrations
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
                                        'Rejected Registrations'}
                        </h1>
                        <div className="admin-profile">
                            <span>Admin</span>
                            <img src="img/user.png" alt="Admin" className="admin-avatar" />
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
                                    <p>{registrations.filter(reg => reg.verificationStatus === 'pending').length}</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">
                                    <i className="fas fa-check-circle"></i>
                                </div>
                                <div className="stat-content">
                                    <h3>Approved Registrations</h3>
                                    <p>{registrations.filter(reg => reg.verificationStatus === 'approved').length}</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">
                                    <i className="fas fa-trash-alt"></i>
                                </div>
                                <div className="stat-content">
                                    <h3>Rejected Registrations</h3>
                                    <p>{registrations.filter(reg => reg.verificationStatus === 'rejected').length}</p>
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
                                        <div className="status-badge-admin" data-status={registration.verificationStatus}>
                                            {registration.verificationStatus}
                                        </div>
                                        <div className="registration-info">
                                            <h3>{registration.name}</h3>
                                            <p><i className="fas fa-envelope"></i> {registration.email}</p>
                                            <p><i className="fas fa-briefcase"></i> {registration.age}</p>
                                            <p><i className="fas fa-user-tag"></i> {registration.role}</p>
                                            <p><i className="fas fa-info-circle"></i> Status: {registration.verificationStatus}</p>
                                            <a href={registration.verificationDocument} target="_blank" rel="noopener noreferrer">
                                                <i className="fas fa-file-pdf"></i> View Document
                                            </a>
                                        </div>
                                        {registration.verificationStatus === 'pending' ? (
                                            <div className="action-buttons">
                                                <button
                                                    className="approve-btn"
                                                    onClick={() => handleApprove(registration.id)}
                                                >
                                                    <i className="fas fa-check"></i> Approve
                                                </button>
                                                <button
                                                    className="reject-btn"
                                                    onClick={() => handleReject(registration.id)}
                                                >
                                                    <i className="fas fa-times"></i> Reject
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="status-message">
                                                {registration.verificationStatus === 'approved' ? (
                                                    <span className="approved-message">
                                                        <i className="fas fa-check-circle"></i> Approved
                                                    </span>
                                                ) : (
                                                    <span className="rejected-message">
                                                        <i className="fas fa-times-circle"></i> Rejected
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                        {registration.verificationStatus === 'deleted' && (
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