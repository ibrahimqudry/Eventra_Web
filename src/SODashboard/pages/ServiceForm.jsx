import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import TopBar from "../components/TopBar";
import "../css/serviceform.css";

// Import Firestore functions and your db instance
import { db } from "../../firebase/config";
import { collection, addDoc, doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { Toaster, toast } from 'react-hot-toast';

// Add this import at the top with other imports
import { uploadToCloudinary } from '../../utils/cloudinary';


const ServiceForm = () => {
  // Add these state variables for image handling
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [sliderImages, setSliderImages] = useState([]);
  const [uploadingSlider, setUploadingSlider] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    unit: "day",
    image: "",
    sliderImages: [],
    status: "available",
    packages: [],
    createdAt: null,
    updatedAt: null
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      toast.loading('Saving service...', { id: 'serviceToast' });

      const serviceData = {
        name: formData.name,
        category: formData.category,
        description: formData.description,
        price: Number(formData.price),
        unit: formData.unit,
        image: formData.image,
        sliderImages: formData.sliderImages,
        status: formData.status,
        packages: formData.packages.map(pkg => ({
          type: pkg.type,
          price: Number(pkg.price),
          benefits: pkg.benefits.filter(b => b.trim() !== ""),
        })),
        updatedAt: serverTimestamp(),
      };

      if (isEditing) {
        const serviceDocRef = doc(db, "services", id);
        await updateDoc(serviceDocRef, serviceData);
        toast.success('Service updated successfully!', { id: 'serviceToast' });
      } else {
        const servicesRef = collection(db, "services");
        await addDoc(servicesRef, {
          ...serviceData,
          createdAt: serverTimestamp(),
        });
        toast.success('Service added successfully!', { id: 'serviceToast' });

        // Clear form data
        setFormData({
          name: "",
          category: "",
          description: "",
          price: "",
          unit: "day",
          image: "",
          status: "available",
          packages: [],
        });
        setImagePreview(null);
      }

      setTimeout(() => {
        navigate("/soservices");
      }, 1000);

    } catch (error) {
      console.error("Error adding/updating service:", error);
      toast.error('Failed to save service', { id: 'serviceToast' });
    }
  };
  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);
  const [packageData, setPackageData] = useState({
    type: "standard",
    price: "",
    benefits: [""]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    
    try {
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      
      // Upload to Cloudinary
      const imageUrl = await uploadToCloudinary(file);
      
      // Update form data
      setFormData(prev => ({
        ...prev,
        image: imageUrl
      }));
      
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
      setImagePreview(null);
    } finally {
      setUploading(false);
    }
  };

  const handleSliderImagesUpload = async (e) => {
    const files = Array.from(e.target.files);
    setUploadingSlider(true);

    try {
      const uploadPromises = files.map(file => uploadToCloudinary(file));
      const uploadedUrls = await Promise.all(uploadPromises);

      setSliderImages(prev => [...prev, ...uploadedUrls]);
      setFormData(prev => ({
        ...prev,
        sliderImages: [...(prev.sliderImages || []), ...uploadedUrls]
      }));
    } catch (error) {
      console.error('Error uploading slider images:', error);
      toast.error('Failed to upload some images');
    } finally {
      setUploadingSlider(false);
    }
  };

  const handleAddPackage = () => {
    if (!packageData.type || !packageData.price) {
      toast.error('Package type and price are required');
      return;
    }
  
    setFormData(prev => ({
      ...prev,
      packages: [
        ...prev.packages,
        {
          type: packageData.type,
          price: Number(packageData.price),
          benefits: packageData.benefits.filter(b => b.trim() !== ""),
          name: `${packageData.type} Package`, // Added default name
          description: packageData.benefits.join(', ') // Added default description
        }
      ]
    }));
  
    // Reset package data and close modal
    setPackageData({
      type: "standard",
      price: "",
      benefits: [""]
    });
    setIsPackageModalOpen(false);
  };
  

  return (
    <div className="service-form-page">
      <Toaster position="top-right" />
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


            <div className="form-group">
              <label htmlFor="image">Service Image</label>
              <div className="image-upload-container">
                {imagePreview && (
                  <div className="image-preview">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="preview-image"
                    />
                    <button
                      type="button"
                      className="btn-icon preview-remove"
                      onClick={() => {
                        setImagePreview(null);
                        setFormData(prev => ({ ...prev, image: "" }));
                      }}
                    >
                      <i className="fas fa-times"></i>
                    </button>
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


            <div className="form-group">
              <label>Slider Images</label>
              <div className="image-upload-container">
                {sliderImages.length > 0 && (
                  <div className="slider-preview">
                    {sliderImages.map((img, index) => (
                      <div key={index} className="slider-image-item">
                        <img src={img} alt={`Slider ${index}`} />
                        <button
                          type="button"
                          className="btn-icon"
                          onClick={() => {
                            setSliderImages(prev => prev.filter((_, i) => i !== index));
                            setFormData(prev => ({
                              ...prev,
                              sliderImages: prev.sliderImages.filter((_, i) => i !== index)
                            }));
                          }}
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <input
                  type="file"
                  id="slider-images"
                  accept="image/*"
                  onChange={handleSliderImagesUpload}
                  className="image-input"
                  multiple
                  disabled={uploadingSlider}
                />
                <label htmlFor="slider-images" className="image-upload-label">
                  {uploadingSlider ? (
                    <span>Uploading...</span>
                  ) : (
                    <>
                      <i className="fas fa-cloud-upload-alt"></i>
                      <span>Choose multiple images</span>
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
                onClick={() => navigate("/soservices")}
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
                  <label>Package Type</label>
                  <select
                    value={packageData.type}
                    onChange={(e) =>
                      setPackageData(prev => ({ ...prev, type: e.target.value }))
                    }
                    required
                  >
                    <option value="standard">Standard</option>
                    <option value="pro">Pro</option>
                    <option value="vip">VIP</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Benefits</label>
                  <textarea
                    value={packageData.benefits.join("\n")}
                    onChange={(e) =>
                      setPackageData(prev => ({
                        ...prev,
                        benefits: e.target.value.split("\n"),
                      }))
                    }
                    placeholder="Enter benefits (one per line)"
                  />
                </div>
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
      </main >
    </div >
  );
};

export default ServiceForm;











