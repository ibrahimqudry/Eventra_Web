import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { ChevronDown } from "lucide-react";
import "../css/nav.css";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setMenuOpen(false);
      setDropdownOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      {/* Left Section - Logo */}
      <div className="logo">
        <div className="logo-icon">
          <img src="/img/logo.jpeg" alt="Eventera Logo" />
        </div>
        <span>Eventera</span>
      </div>

      {/* Middle Section - Navigation Links */}
      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <Link to="/" className={isActive("/") ? "active" : ""}>
          Home
        </Link>
        <Link to="/events" className={isActive("/events") ? "active" : ""}>
          Events
        </Link>
        <Link to="/Servses" className={isActive("/Servses") ? "active" : ""}>
          Services
        </Link>
        <Link to="/about" className={isActive("/about") ? "active" : ""}>
          About
        </Link>
        <Link to="/contact" className={isActive("/contact") ? "active" : ""}>
          Contact
        </Link>
      </div>

      {/* Right Section - User Profile or Sign In */}
      <div className="nav-right">
        {!user ? (
          <Link to="/signin" className="sign-in-btn">
            Sign In
          </Link>
        ) : (
          <div className="user-profile-nav">
            <div
              className="user-profile-trigger"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <img
                src={user.profileImage || "/img/default-avatar.png"}
                alt="Profile"
                className="user-avatar"
              />
              <span className="user-name">
                {user.firstName} {user.lastName}
              </span>
              <ChevronDown
                size={20}
                className={`dropdown-arrow ${dropdownOpen ? "rotate" : ""}`}
                style={{ transition: "transform 0.3s ease" , color: "#6366f1"}}
              />
            </div>
            {dropdownOpen && (
              <div className={`user-dropdown ${dropdownOpen ? "show" : ""}`}>
                <Link to="/user" className="dropdown-item">
                  <i className="fas fa-user"></i>
                  My Profile
                </Link>
                <Link to="/user" className="dropdown-item">
                  <i className="fas fa-bookmark"></i>
                  Saved Events
                </Link>
                <button
                  onClick={handleLogout}
                  className="dropdown-item logout-btn"
                >
                  <i className="fas fa-sign-out-alt"></i>
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div
        className={`bx bx-menu ${menuOpen ? "bx-x" : ""}`}
        id="menu-icons"
        onClick={handleMenuClick}
      ></div>
    </nav>
  );
};

export default Nav;
