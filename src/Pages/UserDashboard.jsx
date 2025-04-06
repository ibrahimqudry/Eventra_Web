import React from 'react';
// import '../css/UserDashboard.css';

function UserDashboard() {
  return (
   <>
   <div className="container-">
  <aside className="sidebar">
    <div className="user-info">
      <div className="avatar">
        <img src="./assets/avatar.jpg" />
      </div>
      <p>John Doe</p>
    </div>
    <nav className="menu">
      <ul>
        <li className="active">
          {" "}
          <i className="fa-solid fa-gears" /> Settings
        </li>
        <li>
          <i className="fa-solid fa-bell" /> Notifications
        </li>
        <li>
          {" "}
          <i className="fa-solid fa-clipboard-list" /> Scheduled Events
        </li>
        <li>
          {" "}
          <i className="fa-solid fa-ticket-simple" /> Your Tickets
        </li>
        <li>
          {" "}
          <i className="fa-solid fa-money-check-dollar" /> Bank Accounts
        </li>
        <li>
          {" "}
          <i className="fa-solid fa-comments" /> Coummunity room
        </li>
        <li>
          {" "}
          <i className="fa-solid fa-phone" /> Help/Support
        </li>
        <li>
          {" "}
          <i className="fa-solid fa-arrow-right-from-bracket" /> Logout
        </li>
      </ul>
    </nav>
  </aside>
  <main className="content">
    <section className="settings">
      <h2>Settings</h2>
      <p>Lorem ipsum dolor sit amet consectetur.</p>
      <div className="settings-container-">
        <div className="settings-content">
          <div className="profile-upload">
            <div className="avatar">
              <img src="./assets/avatar.jpg" />
            </div>
            <div className="profile-content">
              <h3>John Doe</h3>
              <button>Upload New Photo</button>
              <button className="delete">Delete</button>
            </div>
          </div>
          <form>
            <label>
              Name <input type="text" />
            </label>
            <label>
              Email Address <input type="email" />
            </label>
            <label>
              Phone Number <input type="text" />
            </label>
            <label>
              Country <input type="text" />
            </label>
            <label>
              City <input type="text" />
            </label>
            <label>
              State <input type="text" />
            </label>
          </form>
          <div className="interests">
            <h3>
              <span>
                <i className="fa-solid fa-plus" />
              </span>
              Add Interests
            </h3>
            <div className="interests-btns">
              <button>Books</button>
              <button>Finance</button>
              <button>Fashion</button>
              <button>Medical</button>
              <button>Technology</button>
              <button>Business</button>
            </div>
          </div>
          <div className="buttons">
            <button className="cancel">Cancel</button>
            <button className="save">Save Changes</button>
          </div>
        </div>
      </div>
    </section>
  </main>
</div>

   </>
  )
}

export default UserDashboard