

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/nav.css";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }

    const handleScroll = () => {
      setMenuOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // Determine profile link based on user role
  const getProfileLink = () => {
    if (!userData) return "/user";
    switch (userData.role) {
      case "eventManager":
        return "/eventManagerProfile";
      case "serviceOwner":
        return "/serviceOwnerProfile";
      case "admin":
        return "/adminProfile";
      default:
        return "/user";
    }
  };

  // Check if user has a role that allows dashboard access
  const hasDashboardAccess = () => {
    if (!userData) return false;
    return ["eventManager", "serviceOwner", "admin"].includes(userData.role);
  };

  return (
    <nav className="navbar">
      {/* Logo Section */}
      <div className="nav-section logo-section">
        <div className="logo-icon-main">
          <img src="/img/logo.jpeg" alt="Eventra Logo" />
        </div>
        <span>
          <Link to="/" className="logo-text">
            Eventra
          </Link>
        </span>
      </div>

      {/* Main Navigation Links */}
      <div className={`nav-section main-links ${menuOpen ? "active" : ""}`}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/events">Events</Link>
          </li>
          <li>
            <Link to="/services">Services</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>

      {/* User Section */}
      <div className="nav-section user-section">
        {userData ? (
          <div className="profile-container" onClick={toggleDropdown}>
            <img
              src={userData.profileImage || "/img/per1.avif"}
              alt={userData.fullName || "User"}
              className="profile-img"
            />
            <span className="profile-name">{userData.fullName || "User"}</span>
            {dropdownOpen && (
              <div className="profile-dropdown">
                {hasDashboardAccess() && (
                  <Link
                    to={
                      userData.role === "eventManager"
                        ? "/EventMDashbord"
                        : userData.role === "serviceOwner"
                        ? "/sodashboard"
                        : userData.role === "admin"
                        ? "/admin"
                        : "/dashboard"
                    }
                  >
                    Dashboard
                  </Link>
                )}
                <Link to={getProfileLink()}>Profile</Link>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="sign-in-btn">
            Sign In
          </Link>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div
        className={`menu-toggle ${menuOpen ? "active" : ""}`}
        onClick={handleMenuClick}
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </nav>
  );
};

export default Nav;