import React from 'react';
import { Link } from 'react-router-dom';
import "../css/footer.css";



const Footer = () => {
    return (
 <footer className="footer">
  <div className="footer-content">
    <div className="footer-section">
      <div className="logo">
        <div className="logo-icon"></div>
        <span>Eventera</span>
      </div>
      <p>Discover and join amazing events happening around you.</p>
    </div>
    <div className="footer-section">
      <h3>Quick Links</h3>
      <ul>
        <li>
          <Link to="#">About Us</Link>
        </li>
        <li>
          <Link to="#">Events</Link>
        </li>
        <li>
          <Link to="#">Blog</Link>
        </li>
        <li>
          <Link to="#">Contact</Link>
        </li>
      </ul>
    </div>
    <div className="footer-section">
      <h3>Support</h3>
      <ul>
        <li>
          <Link to="#">Help Center</Link>
        </li>
        <li>
          <Link to="#">Terms of Service</Link>
        </li>
        <li>
          <Link to="#">Privacy Policy</Link>
        </li>
        <li>
          <Link to="#">FAQ</Link>
        </li>
      </ul>
    </div>
    <div className="footer-section">
      <h3>Follow Us</h3>
      <div className="social-links">
        <a href="#" className="social-link">
          Facebook
        </a>
        <a href="#" className="social-link">
          Twitter
        </a>
        <a href="#" className="social-link">
          Instagram
        </a>
        <a href="#" className="social-link">
          LinkedIn
        </a>
      </div>
    </div>
  </div>
  <div className="footer-bottom">
    <p>&copy; 2024 Eventera. All rights reserved.</p>
  </div>
</footer>
    );
};

export default Footer;