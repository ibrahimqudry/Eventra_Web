import React from 'react';
import "../css/TopNav.css";
function TopNav() {
    return (
        <nav className="top-nav">
            <div className="search-bar">
                <i className="fas fa-search"></i>
                <input type="text" placeholder="Search..."/>
            </div>
            <div className="nav-right">
                <div className="notifications">
                    <i className="fas fa-bell"></i>
                    <span className="badge">3</span>
                </div>
                <div className="profile-menu">
                    <img src="img/john.avif" alt="Profile"/>
                    <span>John Doe</span>
                </div>
            </div>
        </nav>
    )
};

export default TopNav;