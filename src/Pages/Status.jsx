import React, { useState, useEffect } from 'react';
import '../css/Status.css';
import Navbar from '../components/Nav';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const Status = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const storedUserData = localStorage.getItem('userData');
                if (storedUserData) {
                    const user = JSON.parse(storedUserData);
                    const userRef = doc(db, 'users', user.uid);
                    const docSnap = await getDoc(userRef);
                    
                    if (docSnap.exists()) {
                        const freshData = docSnap.data();
                        localStorage.setItem('userData', JSON.stringify(freshData));
                        setUserData(freshData);
                    } else {
                        setUserData(user);
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const getStatusColor = (status) => {
        switch(status) {
            case 'approved': return '#4CAF50';
            case 'pending': return '#FFC107';
            case 'rejected': return '#F44336';
            default: return '#9E9E9E';
        }
    };

    if (loading) {
        return <div className="status-loading">Loading status...</div>;
    }

    if (!userData) {
        return <div className="status-error">No user data found</div>;
    }

    return (
        <>
            <Navbar />
            <div className="status-container">
                <h2>Account Verification Status</h2>
                <div className="status-card">
                    <div 
                        className="status-badge" 
                        style={{ backgroundColor: getStatusColor(userData.verificationStatus) }}
                    >
                        {userData.verificationStatus || 'unknown'}
                    </div>
                    
                    <div className="status-details">
                        <h3>{userData.fullName || 'User'}</h3>
                        <p>Email: {userData.email || 'Not provided'}</p>
                        
                        {userData.verificationStatus === 'approved' && (
                            <p className="status-message">
                                <i className="fas fa-check-circle"></i> Your account is fully verified
                            </p>
                        )}
                        
                        {userData.verificationStatus === 'pending' && (
                            <p className="status-message">
                                <i className="fas fa-clock"></i> Your verification is under review
                            </p>
                        )}
                        
                        {userData.verificationStatus === 'rejected' && (
                            <div className="status-message">
                                <p><i className="fas fa-times-circle"></i> Verification rejected</p>
                                {userData.rejectionReason && (
                                    <p className="rejection-reason">
                                        Reason: {userData.rejectionReason}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Status;