import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../css/nav.css";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setMenuOpen(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
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
        <span>Eventera</span>
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
          <Link to="/Servses">Services</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>

        <li>
          <Link to="/signin" className="sign-in-btn">
            Sign In
          </Link>
        </li>
        <li>
          <Link to="/UserDashboard">
            <i className="fa-solid fa-user" style={{ fontSize: "25px" }}></i>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;