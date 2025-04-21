

import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/SideNav.css";

function SideNav() {
  const location = useLocation();

  return (
    <aside className="sidebar-em">
      <div className="sidebar-header-em">
        <div className="logo-em">
          <img src="img/logo.jpeg" alt="Eventera Logo" />
          <span><Link to="/">Eventera</Link></span>
        </div>
      </div>
      <nav className="sidebar-nav-em">
        <ul>
          <li className={location.pathname === "/EventMDashbord" ? "active" : ""}>
            <Link to="/EventMDashbord">
              <i className="fas fa-tachometer-alt"></i>
              <span>Dashboard</span>
            </Link>
          </li>
          <li className={location.pathname === "/EventM" ? "active" : ""}>
            <Link to="/EventM">
              <i className="fas fa-calendar-alt"></i>
              <span>Events</span>
            </Link>
          </li>
          <li className={location.pathname === "/orders" ? "active" : ""}>
            <Link to="/orders">
              <i className="fas fa-shopping-cart"></i>
              <span>Orders</span>
            </Link>
          </li>
          <li className={location.pathname === "/profile" ? "active" : ""}>
            <Link to="/profile">
              <i className="fas fa-user"></i>
              <span>Profile</span>
            </Link>
          </li>
          <li className={location.pathname === "/logout" ? "active" : ""}>
            <Link 
              to="/login"
              className="nav-link"
              onClick={() => {
                localStorage.removeItem('userData');
                localStorage.removeItem('selectedTicket');
                // Add any other items to clear here
              }}
            >
              <i className="fas fa-sign-out-alt"></i>
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default SideNav;