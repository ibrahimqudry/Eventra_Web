import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar";
import "../css/services.css";

// Import Firestore functions and db instance
// Update the imports at the top
import { db, auth } from "../../firebase/config";
import { collection, getDocs, doc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { toast } from 'react-hot-toast';

const ServiceCard = ({ service, onEdit, onDelete }) => {
  const { id, image, category, status, name, rating, reviews, bookings, price, unit } = service;
  return (
    <div className="service-card">
      <div className="service-image">
        <img src={image} alt={name} />
        <span className="service-category">{category}</span>
        <span className={`service-status ${status.toLowerCase()}`}>{status}</span>
      </div>
      <div className="service-details">
        <h3>{name}</h3>
        <div className="service-stats">
          <div className="stat">
            <i className="fas fa-star"></i>
            <span>{rating} ({reviews} reviews)</span>
          </div>
          <div className="stat">
            <i className="fas fa-calendar-check"></i>
            <span>{bookings} bookings</span>
          </div>
        </div>
        <div className="service-price">
          <span className="price">${price}</span>
          <span className="unit">/ {unit}</span>
        </div>
        <div className="service-actions">
          <button className="btn-edit" onClick={() => onEdit(service)}>
            {status === "Draft" ? "Complete Setup" : "Edit Service"}
          </button>
          <button className="btn-icon" title="Preview">
            <i className="fas fa-eye"></i>
          </button>
          <button
            className="btn-icon"
            title="Delete"
            onClick={() => onDelete(id)}
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

const Services = () => {
  // State for services
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);

  // Filters state
  const [filters, setFilters] = useState({
    category: "",
    status: "",
    sortBy: "",
  });

  // States for edit modal
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState(null);

  // Fetch data from Firestore on mount
  useEffect(() => {
    const fetchServices = async () => {
      try {
        // Make sure we're using the initialized Firestore instance
        const servicesRef = collection(db, "services");
        const querySnapshot = await getDocs(servicesRef);
        const servicesArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setServices(servicesArray);
        setFilteredServices(servicesArray);
      } catch (error) {
        console.error("Error fetching services:", error);
        toast.error("Failed to load services");
      }
    };
    fetchServices();
  }, []);

  // Handle filters
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    let filtered = [...services];

    if (filters.category) {
      filtered = filtered.filter(
        (service) =>
          service.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    if (filters.status) {
      filtered = filtered.filter(
        (service) =>
          service.status.toLowerCase() === filters.status.toLowerCase()
      );
    }

    if (filters.sortBy) {
      filtered.sort((a, b) => {
        switch (filters.sortBy) {
          case "price-high":
            return (
              parseFloat(b.price.toString().replace(/,/g, "")) -
              parseFloat(a.price.toString().replace(/,/g, ""))
            );
          case "price-low":
            return (
              parseFloat(a.price.toString().replace(/,/g, "")) -
              parseFloat(b.price.toString().replace(/,/g, ""))
            );
          case "popular":
            return b.bookings - a.bookings;
          default:
            return 0;
        }
      });
    }

    setFilteredServices(filtered);
  };

  // Open edit modal with selected service
  const handleEditClick = (service) => {
    setEditFormData(service);
    setEditModalOpen(true);
  };

  // Handle changes in the edit form inputs
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle package addition in edit form
  const handleEditAddPackage = () => {
    setEditFormData((prev) => ({
      ...prev,
      packages: [...(prev.packages || []), editPackageData],
    }));
    setEditPackageData({
      name: "",
      description: "",
      price: "",
      duration: "",
    });
    setEditPackageModalOpen(false);
  };

  // State and handler for package modal in edit form
  const [editPackageModalOpen, setEditPackageModalOpen] = useState(false);
  const [editPackageData, setEditPackageData] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
  });

  // Handle edit form submission to update service in Firestore
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const serviceDocRef = doc(db, "services", editFormData.id);
      const updatedData = {
        ...editFormData,
        serviceOwnerId: auth.currentUser?.uid,
        updatedAt: serverTimestamp()
      };

      await updateDoc(serviceDocRef, updatedData);
      console.log("Service updated successfully");
      // Update local state after a successful update
      const updatedServices = services.map((s) =>
        s.id === editFormData.id ? editFormData : s
      );
      setServices(updatedServices);
      setFilteredServices(updatedServices);
      setEditModalOpen(false);
    } catch (error) {
      console.error("Error updating service:", error);
    }
  };


  const handleDeleteService = async (serviceId) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        toast.loading('Deleting service...', { id: 'deleteToast' });
        const serviceRef = doc(db, 'services', serviceId);
        await deleteDoc(serviceRef);

        // Update both services and filtered services states
        setServices(prev => prev.filter(service => service.id !== serviceId));
        setFilteredServices(prev => prev.filter(service => service.id !== serviceId));

        toast.success('Service deleted successfully!', { id: 'deleteToast' });
      } catch (error) {
        console.error('Error deleting service:', error);
        toast.error('Failed to delete service', { id: 'deleteToast' });
      }
    }
  };

  return (
    <div className="services-container">
      <Sidebar />

      <main className="main-content">
        <TopBar />

        <div className="services-content">
          <div className="page-header">
            <h1>Services Management</h1>
            <Link to="/services/new">
              <button className="btn-create">
                <i className="fas fa-plus"></i>
                Add New Service
              </button>
            </Link>
          </div>

          <div className="filters-section">
            <div className="filters-group">
              <select
                className="filter-select"
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
              >
                <option value="">All Categories</option>
                <option value="Venue">Venues</option>
                <option value="Catering">Catering</option>
                <option value="Decoration">Decoration</option>
                <option value="Photography">Photography</option>
              </select>
              <select
                className="filter-select"
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
              >
                <option value="">All Status</option>
                <option value="Active">Active</option>
                <option value="Draft">Draft</option>
                <option value="Archived">Archived</option>
              </select>
              <select
                className="filter-select"
                name="sortBy"
                value={filters.sortBy}
                onChange={handleFilterChange}
              >
                <option value="">Sort By</option>
                <option value="newest">Newest First</option>
                <option value="popular">Most Popular</option>
                <option value="price-high">Price: High to Low</option>
                <option value="price-low">Price: Low to High</option>
              </select>
            </div>
            <button className="btn-filter" onClick={applyFilters}>
              <i className="fas fa-filter"></i>
              Apply Filters
            </button>
          </div>

          <div className="services-grid">
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteService}
                />
              ))
            ) : (
              <p>No services found.</p>
            )}
          </div>

          {/* Static Pagination UI */}
          <div className="pagination">
            <button className="page-btn" disabled>
              <i className="fas fa-chevron-left"></i>
            </button>
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
            <span className="page-dots">...</span>
            <button className="page-btn">8</button>
            <button className="page-btn">
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </main>

      {/* Edit Service Modal */}
      {editModalOpen && editFormData && (
        <div className="modal-overlay">
          <div
            className="package-modal"
            style={{ maxHeight: "90vh", overflowY: "auto", padding: "20px" }}
          >
            <h3>Edit Service</h3>
            <form onSubmit={handleEditSubmit} className="service-form">
              <div className="form-group">
                <label htmlFor="edit-name">Service Name</label>
                <input
                  type="text"
                  id="edit-name"
                  name="name"
                  value={editFormData.name}
                  onChange={handleEditChange}
                  placeholder="Enter service name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit-category">Category</label>
                <select
                  id="edit-category"
                  name="category"
                  value={editFormData.category}
                  onChange={handleEditChange}
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Venue">Venue</option>
                  <option value="Catering">Catering</option>
                  <option value="Decoration">Decoration</option>
                  <option value="Photography">Photography</option>
                  <option value="Beauty">Beauty</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="edit-description">Description</label>
                <textarea
                  id="edit-description"
                  name="description"
                  value={editFormData.description}
                  onChange={handleEditChange}
                  placeholder="Describe your service"
                  rows="4"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="edit-price">Price</label>
                  <input
                    type="number"
                    id="edit-price"
                    name="price"
                    value={editFormData.price}
                    onChange={handleEditChange}
                    placeholder="Enter price"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="edit-unit">Unit</label>
                  <select
                    id="edit-unit"
                    name="unit"
                    value={editFormData.unit}
                    onChange={handleEditChange}
                    required
                  >
                    <option value="day">Per Day</option>
                    <option value="hour">Per Hour</option>
                    <option value="session">Per Session</option>
                    <option value="event">Per Event</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="edit-image">Image URL</label>
                <input
                  type="url"
                  id="edit-image"
                  name="image"
                  value={editFormData.image}
                  onChange={handleEditChange}
                  placeholder="Enter image URL"
                  required
                />
              </div>

              {/* Service Packages Section in Edit Form */}
              <div className="form-group">
                <label>Service Packages</label>
                <div className="packages-container">
                  {(editFormData.packages || []).map((pkg, index) => (
                    <div key={index} className="package-card">
                      <h4>{pkg.name}</h4>
                      <p>{pkg.description}</p>
                      <div className="package-details">
                        <span>${pkg.price}</span>
                        <span>{pkg.duration}</span>
                      </div>
                      <button
                        type="button"
                        className="btn-icon"
                        onClick={() => {
                          setEditFormData((prev) => ({
                            ...prev,
                            packages: prev.packages.filter((_, i) => i !== index),
                          }));
                        }}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn-add-package"
                    onClick={() => setEditPackageModalOpen(true)}
                  >
                    <i className="fas fa-plus"></i> Add Package
                  </button>
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setEditModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Update Service
                </button>
              </div>
            </form>

            {/* End of Edit Package Modal */}
          </div>
        </div>
      )}
    </div>
  );
};


export default Services;
