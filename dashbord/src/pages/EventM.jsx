import React from 'react'
import SideNav from '../coponats/SideNav'
import TopNav from '../coponats/TopNav'
import "../css/EventM.css";
import "../css/Dashbord.css";



function EventM() {
  return (
      <>
          <body>
              <SideNav />
              <main className="main-content">
                  < TopNav />
        <div className="events-content">
            <div className="page-header">
                <h1>Events Management</h1>
                <button className="btn-create">
                    <i className="fas fa-plus"></i>
                    Create New Event
                </button>
            </div>

           
            <div className="filters-section">
                <div className="filters-group">
                    <select className="filter-select">
                        <option value="">All Categories</option>
                        <option value="tech">Technology</option>
                        <option value="business">Business</option>
                        <option value="arts">Arts & Culture</option>
                    </select>
                    <select className="filter-select">
                        <option value="">All Statuses</option>
                        <option value="upcoming">Upcoming</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="completed">Completed</option>
                    </select>
                    <input type="date" className="filter-date" placeholder="Select Date" />
                </div>
                <button className="btn-filter">
                    <i className="fas fa-filter"></i>
                    Apply Filters
                </button>
            </div>

          
            <div className="table-container">
                <table className="events-table">
                    <thead>
                        <tr>
                            <th>Event</th>
                            <th>Date</th>
                            <th>Location</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Attendees</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div className="event-info">
                                    <img src="img/ev1.avif" alt="Tech Summit" />
                                    <div>
                                        <h4>Tech Summit 2024</h4>
                                        <span>ID: #EVT001</span>
                                    </div>
                                </div>
                            </td>
                            <td>Apr 15, 2024</td>
                            <td>San Francisco</td>
                            <td><span className="status-badge tech">Technology</span></td>
                            <td><span className="status-badge upcoming">Upcoming</span></td>
                            <td>500/600</td>
                            <td>
                                <div className="actions">
                                    <button className="action-btn edit" title="Edit">
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button className="action-btn view" title="View">
                                        <i className="fas fa-eye"></i>
                                    </button>
                                    <button className="action-btn delete" title="Delete">
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="event-info">
                                    <img src="img/ev2.avif" alt="Design Conference" />
                                    <div>
                                        <h4>Design Conference</h4>
                                        <span>ID: #EVT002</span>
                                    </div>
                                </div>
                            </td>
                            <td>May 20, 2024</td>
                            <td>New York</td>
                            <td><span className="status-badge design">Design</span></td>
                            <td><span className="status-badge sold-out">Sold Out</span></td>
                            <td>300/300</td>
                            <td>
                                <div className="actions">
                                    <button className="action-btn edit" title="Edit">
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button className="action-btn view" title="View">
                                        <i className="fas fa-eye"></i>
                                    </button>
                                    <button className="action-btn delete" title="Delete">
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="event-info">
                                    <img src="img/ev3.avif" alt="Startup Weekend" />
                                    <div>
                                        <h4>Startup Weekend</h4>
                                        <span>ID: #EVT003</span>
                                    </div>
                                </div>
                            </td>
                            <td>Jun 10, 2024</td>
                            <td>London</td>
                            <td><span className="status-badge business">Business</span></td>
                            <td><span className="status-badge active">Active</span></td>
                            <td>150/200</td>
                            <td>
                                <div className="actions">
                                    <button className="action-btn edit" title="Edit">
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button className="action-btn view" title="View">
                                        <i className="fas fa-eye"></i>
                                    </button>
                                    <button className="action-btn delete" title="Delete">
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="pagination">
                <button className="page-btn" disabled>
                    <i className="fas fa-chevron-left"></i>
                </button>
                <button className="page-btn active">1</button>
                <button className="page-btn">2</button>
                <button className="page-btn">3</button>
                <span className="page-dots">...</span>
                <button className="page-btn">10</button>
                <button className="page-btn">
                    <i className="fas fa-chevron-right"></i>
                </button>
            </div>
        </div>
</main>
      </body>
      
      </>
  )

}

export default EventM;