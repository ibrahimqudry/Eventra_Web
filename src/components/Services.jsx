import { useState } from 'react';
import Sidebar from './Sidebar';
import NotificationIcon from './NotificationIcon';
import ProfileIcon from './ProfileIcon';
import '../css/SODashboard.css';

function SOServices() {
  const [services, setServices] = useState([
    {
      id: 1,
      name: 'Wedding Hall',
      price: 2000,
      available: true,
      description: 'Elegant wedding hall for up to 300 guests'
    },
    {
      id: 2,
      name: 'Conference Room',
      price: 500,
      available: true,
      description: 'Professional conference room for business meetings'
    }
  ]);

  const [newService, setNewService] = useState({
    name: '',
    price: '',
    description: '',
    available: true
  });

  const handleAddService = (e) => {
    e.preventDefault();
    setServices([...services, { ...newService, id: Date.now() }]);
    setNewService({ name: '', price: '', description: '', available: true });
  };

  return (
    <>
      <div className="container2">
        <Sidebar />
        <main className="main-content">
          <header className="header">
            <div className="header-icons">
              <NotificationIcon />
              <ProfileIcon />
            </div>
          </header>
          <div className="content">
            <div>
              <h1>Services</h1>

              <div className="card">
                <h2>Add New Service</h2>
                <form onSubmit={handleAddService}>
                  <div className="form-group">
                    <label>Service Name</label>
                    <input
                      type="text"
                      value={newService.name}
                      onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Price</label>
                    <input
                      type="number"
                      value={newService.price}
                      onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      value={newService.description}
                      onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">Add Service</button>
                </form>
              </div>

              <div className="services-grid">
                {services.map(service => (
                  <div key={service.id} className="service-card">
                    <h3>{service.name}</h3>
                    <p>${service.price}</p>
                    <p>{service.description}</p>
                    <p>Status: {service.available ? 'Available' : 'Unavailable'}</p>
                    <button
                      className={`btn ${service.available ? 'btn-primary' : 'btn-secondary'}`}
                      onClick={() => {
                        setServices(services.map(s =>
                          s.id === service.id ? { ...s, available: !s.available } : s
                        ));
                      }}
                    >
                      {service.available ? 'Mark Unavailable' : 'Mark Available'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default SOServices;