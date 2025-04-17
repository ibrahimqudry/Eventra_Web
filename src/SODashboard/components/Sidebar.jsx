import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/sidebar.css";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <img src="/assets/logo.jpeg" alt="Eventera Logo" />
          <span>Eventera</span>
        </div>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li className={isActive("/sodashboard") ? "active" : ""}>
            <Link to="/sodashboard">
              <i className="fas fa-tachometer-alt"></i>
              <span>Dashboard</span>
            </Link>
          </li>
          <li className={isActive("/soservices") ? "active" : ""}>
            <Link to="/soservices">
              <i className="fas fa-concierge-bell"></i>
              <span>Services</span>
            </Link>
          </li>
          <li className={isActive("/sobookings") ? "active" : ""}>
            <Link to="/sobookings">
              <i className="fas fa-calendar-check"></i>
              <span>Bookings</span>
            </Link>
          </li>
          <li className={isActive("/soreviews") ? "active" : ""}>
            <Link to="/soreviews">
              <i className="fas fa-star"></i>
              <span>Reviews</span>
            </Link>
          </li>
          <li className={isActive("/soearnings") ? "active" : ""}>
            <Link to="/soearnings">
              <i className="fas fa-wallet"></i>
              <span>Earnings</span>
            </Link>
          </li>
          <li className={isActive("/soprofile") ? "active" : ""}>
            <Link to="/soprofile">
              <i className="fas fa-user"></i>
              <span>Profile</span>
            </Link>
          </li>
          <li>
            <Link to="/">
              <i className="fas fa-sign-out-alt"></i>
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
