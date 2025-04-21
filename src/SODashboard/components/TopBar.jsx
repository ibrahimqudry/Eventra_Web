import React, { useEffect, useState } from "react";
import "../css/topbar.css";

const TopBar = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  return (
    <nav className="top-nav-sod">
      <div className="search-bar-sod">
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
            src={userData?.profileImage || "https://via.placeholder.com/256"}
            alt="Profile"
          />
          <span>{userData?.fullName || "Loading..."}</span>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
