import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../css/nav.css";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
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
          <li><Link to="/">Home</Link></li>
          <li><Link to="/events">Events</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>

      {/* User Section */}
      <div className="nav-section user-section">
        {userData ? (
          <div className="profile-container" onClick={toggleDropdown}>
            <img
              src={userData.profileImage || '/img/per1.avif'}
              alt={userData.fullName || 'User'}
              className="profile-img"
            />
            <span className="profile-name">
              {userData.fullName || 'User'}
            </span>
            {dropdownOpen && (
              <div className="profile-dropdown">
                {userData.role === 'eventManager' && (
                  <Link to="/EventMDashbord">Dashboard</Link>
                )}
                {userData.role === 'serviceOwner' && (
                  <Link to="/sodashboard">Dashboard</Link>
                )}
                {userData.role === 'admin' && (
                  <Link to="/admin">Dashboard</Link>
                )}
                <Link to="/user">Profile</Link>
                <button
                  className="logout-btn"
                  onClick={() => {
                    localStorage.removeItem('userData');
                    window.location.href = '/login';
                  }}
                >
                  Logout
                </button>
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
}

export default Nav;