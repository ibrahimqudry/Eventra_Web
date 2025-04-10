import { Route, Router, Routes } from "react-router";
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';
import Services from '../components/Services';
import Profile from '../components/Profile';
import Bookings from '../components/Bookings';
import NotificationIcon from '../components/NotificationIcon';
import ProfileIcon from '../components/ProfileIcon';

function ServiceOwnerDashboard() {
    return (
        <div className="container">
            <Sidebar />
            <main className="main-content">
                <header className="header">
                    <div className="header-icons">
                        <NotificationIcon />
                        <ProfileIcon />
                    </div>
                </header>
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/ServiceOwnerDashboard/services" element={<Services />} />
                        <Route path="/ServiceOwnerDashboard/profile" element={<Profile />} />
                        <Route path="/ServiceOwnerDashboard/bookings" element={<Bookings />} />
                    </Routes>
                </div>
            </main>
        </div>
    );
}

export default ServiceOwnerDashboard;