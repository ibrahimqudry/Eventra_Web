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
      <div className="logo">
        <div className="logo-icon">
          <img src="/img/logo.jpeg" alt="" />
        </div>
        <span>
          <Link to="/" className="active">
          Eventra
        </Link>
        </span>
      </div>
      <div
        className={`bx bx-menu ${menuOpen ? "bx-x" : ""}`}
        id="menu-icons"
        onClick={handleMenuClick}
      ></div>
      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li>
          <Link to="/" className="active">
            Home
          </Link>
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

        {userData ? (
          <>
            <li>
              <div className="profile-container" onClick={toggleDropdown}>
                <img 
                  src={userData.profileImage || '/img/per1.avif'} 
                  alt={userData.fullName || 'User'} 
                  className="profile-img"
                />
                <span className="profile-name">
                  {userData.fullName || 'User'}
                </span>
              </div>
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
                  <Link to="/soprofile">Profile</Link>
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
            </li>
          </>
        ) : null}

        {!userData && (
          <li>
            <Link to="/login" className="sign-in-btn">
              Sign In
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Nav;