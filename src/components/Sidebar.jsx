import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Event Planner</h2>
      <nav>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><Link to="/ServiceOwnerDashboard">Dashboard</Link></li>
          <li><Link to="/ServiceOwnerDashboard/services">Services</Link></li>
          <li><Link to="/ServiceOwnerDashboard/bookings" >Bookings</Link></li>
          <li><Link to="/ServiceOwnerDashboard/profile">Profile</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;