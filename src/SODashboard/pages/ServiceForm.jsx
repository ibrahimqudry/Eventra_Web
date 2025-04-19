import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import TopBar from "../components/TopBar";
import "../css/serviceform.css";

// Import Firestore functions and your db instance
import { db } from "../../firebase/config";
import { collection, addDoc, doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import Sidebar from "../components/Sidebar";
import axios from "axios";

const ServiceForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  // State for the form data with default status "available" when creating new services
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    unit: "day",
    image: "",
    status: "available", // new default attribute when adding a new service
    packages: [], // Field for service packages
  });

  // State for package modal and package data
  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);
  const [packageData, setPackageData] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
  });

  // Handler to add a new package into the packages array
  const handleAddPackage = () => {
    setFormData(prev => ({
      ...prev,
      packages: [...prev.packages, packageData],
    }));
    setPackageData({ name: "", description: "", price: "", duration: "" });
    setIsPackageModalOpen(false);
  };

  // Fetch service data if editing an existing service
  useEffect(() => {
    if (isEditing) {
      const fetchService = async () => {
        try {
          const serviceDocRef = doc(db, "services", id);
          const docSnap = await getDoc(serviceDocRef);
          if (docSnap.exists()) {
            setFormData(docSnap.data());
          } else {
            console.log("No such service!");
          }
        } catch (error) {
          console.error("Error fetching service:", error);
        }
      };
      fetchService();
    }
  }, [id, isEditing]);

  // Handler for form submission to add/update service in Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const serviceData = {
        ...formData,
        updatedAt: serverTimestamp(),
      };

      if (isEditing) {
        const serviceDocRef = doc(db, "services", id);
        await updateDoc(serviceDocRef, serviceData);
        console.log("Service updated successfully");
      } else {
        const servicesRef = collection(db, "services");
        const docRef = await addDoc(servicesRef, {
          ...serviceData,
          createdAt: serverTimestamp(),
        });
        console.log("Service added with ID:", docRef.id);
      }
      navigate("/soservices");
    } catch (error) {
      console.error("Error adding/updating service:", error);
    }
  };

  // Generic change handler for input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

 

  // Add new state for image upload
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Add this function to handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'eventra_preset');

      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dxqjyqz8p/image/upload',
        formData
      );

      setFormData(prev => ({
        ...prev,
        image: response.data.secure_url
      }));
      setUploading(false);
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploading(false);
    }
  };

  // Replace the existing image input with this
  return (
    <div className="service-form-page">
      <Sidebar />

      <main className="main-content">
        <TopBar />

        <div className="service-form-content">
          <div className="page-header">
            <h1>{isEditing ? "Edit Service" : "Add New Service"}</h1>
            <Link to="/services">
              <button className="btn-secondary back-btn">
                <i className="fas fa-arrow-left"></i>
                Back to Services
              </button>
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="service-form">
            <div className="form-group">
              <label htmlFor="name">Service Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter service name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
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
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your service"
                rows="4"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="unit">Unit</label>
                <select
                  id="unit"
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
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
              <label htmlFor="image">Service Image</label>
              <div className="image-upload-container">
                {imagePreview && (
                  <div className="image-preview">
                    <img src={imagePreview} alt="Preview" />
                  </div>
                )}
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="image-input"
                  required={!isEditing}
                />
                <label htmlFor="image" className="image-upload-label">
                  {uploading ? (
                    <span>Uploading...</span>
                  ) : (
                    <>
                      <i className="fas fa-cloud-upload-alt"></i>
                      <span>Choose an image</span>
                    </>
                  )}
                </label>
              </div>
            </div>

            {/* Service Packages Section */}
            <div className="form-group">
              <label>Service Packages</label>
              <div className="packages-container">
                {formData.packages.map((pkg, index) => (
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
                        setFormData(prev => ({
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
                  onClick={() => setIsPackageModalOpen(true)}
                >
                  <i className="fas fa-plus"></i> Add Package
                </button>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => navigate("/services")}
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                {isEditing ? "Update Service" : "Create Service"}
              </button>
            </div>
          </form>

          {/* Package Modal */}
          {isPackageModalOpen && (
            <div className="modal-overlay">
              <div className="package-modal">
                <h3>Add New Package</h3>
                <div className="form-group">
                  <label>Package Name</label>
                  <input
                    type="text"
                    value={packageData.name}
                    onChange={(e) =>
                      setPackageData(prev => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Enter package name"
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={packageData.description}
                    onChange={(e) =>
                      setPackageData(prev => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Describe the package"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Price</label>
                    <input
                      type="number"
                      value={packageData.price}
                      onChange={(e) =>
                        setPackageData(prev => ({ ...prev, price: e.target.value }))
                      }
                      placeholder="Enter price"
                    />
                  </div>
                  <div className="form-group">
                    <label>Duration</label>
                    <input
                      type="text"
                      value={packageData.duration}
                      onChange={(e) =>
                        setPackageData(prev => ({ ...prev, duration: e.target.value }))
                      }
                      placeholder="e.g., 2 hours"
                    />
                  </div>
                </div>
                <div className="modal-actions">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => setIsPackageModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={handleAddPackage}
                  >
                    Add Package
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ServiceForm;
