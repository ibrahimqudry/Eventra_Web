import React from "react";
import "../css/topbar.css";
const TopBar = () => {
  return (
    <nav className="top-nav">
      <div className="search-bar">
        <i className="fas fa-search"></i>
        <input type="text" placeholder="Search..." />
      </div>
      <div className="nav-right">
        <div className="notifications">
          <i className="fas fa-bell"></i>
          <span className="badge">5</span>
        </div>
        <div className="profile-menu">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Profile"
          />
          <span>Ahmed Hassan</span>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
