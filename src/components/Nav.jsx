import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../css/nav.css";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);

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
            {userData.role === 'eventManager' && (
              <li>
                <Link to="/EventMDashbord">Dashboard</Link>
              </li>
            )}
            {userData.role === 'serviceOwner' && (
              <li>
                <Link to="/sodashboard">Dashboard</Link>
              </li>
            )}
            {userData.role === 'admin' && (
              <li>
                <Link to="/admin">Dashboard</Link>
              </li>
            )}
            <li>
              <Link to="/user">Profile</Link>
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