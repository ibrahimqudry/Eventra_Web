import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedStatuses }) => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    
    if (!userData || !allowedStatuses.includes(userData.verificationStatus)) {
        return <Navigate to="/status" replace />;
    }
    
    return children;
};

export default ProtectedRoute;