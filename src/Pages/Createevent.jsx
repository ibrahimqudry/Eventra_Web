import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, collection, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase/config';
import { uploadToCloudinary } from '../utils/cloudinary';
import { toast } from 'react-toastify';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import "../css/events.css";

const Createevent = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [eventData, setEventData] = useState({
        title: '',
        category: '',
        date: '',
        time: '',
        location: {
            venue: '',
            address: '',
            city: '',
            country: ''
        },
        description: '',
        capacity: '',
        sliderImages: []
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (['venue', 'address', 'city', 'country'].includes(id)) {
            setEventData(prev => ({
                ...prev,
                location: {
                    ...prev.location,
                    [id]: value
                }
            }));
        } else {
            setEventData(prev => ({
                ...prev,
                [id]: value
            }));
        }
    };

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        setLoading(true);
        
        try {
            const uploadPromises = files.map(file => uploadToCloudinary(file));
            const urls = await Promise.all(uploadPromises);
            
            setEventData(prev => ({
                ...prev,
                sliderImages: [...prev.sliderImages, ...urls]
            }));
            toast.success('Images uploaded successfully');
        } catch (error) {
            toast.error('Failed to upload images');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const eventsCollectionRef = collection(db, 'events');
            const newEventRef = doc(eventsCollectionRef);

            const eventObject = {
                id: newEventRef.id,
                title: eventData.title.trim(),
                category: eventData.category,
                date: new Date(eventData.date).toISOString().split('T')[0],
                time: eventData.time,
                location: {
                    venue: eventData.location.venue.trim(),
                    address: eventData.location.address.trim(),
                    city: eventData.location.city.trim(),
                    country: eventData.location.country.trim()
                },
                description: eventData.description.trim(),
                capacity: parseInt(eventData.capacity, 10),
                sliderImages: eventData.sliderImages,
                createdAt: serverTimestamp(),
                status: 'pending',
                eventManagerId: auth.currentUser?.uid
            };

            await setDoc(newEventRef, eventObject);
            toast.success('Event created successfully!');
            navigate('/EventMDashbord');
        } catch (error) {
            console.error('Error creating event:', error);
            toast.error('Failed to create event: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Nav />
            <section className="create-event-section">
                <div className="create-event-container">
                    <h1>Create New Event</h1>
                    <form className="create-event-form" onSubmit={handleSubmit}>
                        <div className="form-section">
                            <h2>Basic Information</h2>
                            <div className="form-group">
                                <label htmlFor="title">Event Title*</label>
                                <input 
                                    type="text" 
                                    id="title" 
                                    value={eventData.title}
                                    onChange={handleInputChange}
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="category">Category*</label>
                                <select 
                                    id="category" 
                                    value={eventData.category}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select Category</option>
                                    <option value="tech">Technology</option>
                                    <option value="business">Business</option>
                                    <option value="arts">Arts & Culture</option>
                                    <option value="sports">Sports</option>
                                </select>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="date">Date*</label>
                                    <input 
                                        type="date" 
                                        id="date" 
                                        value={eventData.date}
                                        onChange={handleInputChange}
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="time">Time*</label>
                                    <input 
                                        type="time" 
                                        id="time" 
                                        value={eventData.time}
                                        onChange={handleInputChange}
                                        required 
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-section">
                            <h2>Location</h2>
                            <div className="form-group">
                                <label htmlFor="venue">Venue Name*</label>
                                <input 
                                    type="text" 
                                    id="venue" 
                                    value={eventData.location.venue}
                                    onChange={handleInputChange}
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Address*</label>
                                <input 
                                    type="text" 
                                    id="address" 
                                    value={eventData.location.address}
                                    onChange={handleInputChange}
                                    required 
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="city">City*</label>
                                    <input 
                                        type="text" 
                                        id="city" 
                                        value={eventData.location.city}
                                        onChange={handleInputChange}
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="country">Country*</label>
                                    <input 
                                        type="text" 
                                        id="country" 
                                        value={eventData.location.country}
                                        onChange={handleInputChange}
                                        required 
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-section">
                            <h2>Event Details</h2>
                            <div className="form-group">
                                <label htmlFor="description">Description*</label>
                                <textarea 
                                    id="description" 
                                    rows="4" 
                                    value={eventData.description}
                                    onChange={handleInputChange}
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="capacity">Capacity*</label>
                                <input 
                                    type="number" 
                                    id="capacity" 
                                    value={eventData.capacity}
                                    onChange={handleInputChange}
                                    required 
                                />
                            </div>
                        </div>

                        <div className="form-section">
                            <h2>Event Images</h2>
                            <div className="form-group">
                                <label htmlFor="event-image">Upload Slider Images*</label>
                                <div className="image-upload-container">
                                    <input 
                                        type="file" 
                                        id="event-image" 
                                        accept="image/*"
                                        multiple
                                        onChange={handleImageUpload}
                                        required 
                                    />
                                    <div className="upload-placeholder">
                                        <i className="fas fa-cloud-upload-alt" />
                                        <p>Drag and drop or click to upload</p>
                                    </div>
                                </div>
                                <div className="image-preview">
                                    {eventData.sliderImages.map((url, index) => (
                                        <img 
                                            key={index} 
                                            src={url} 
                                            alt={`Preview ${index + 1}`} 
                                            className="preview-image" 
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="form-buttons">
                            <button 
                                type="button" 
                                className="cancel-btn" 
                                onClick={() => navigate('/EventMDashbord')}
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                className="submit-btn" 
                                disabled={loading}
                            >
                                {loading ? 'Creating...' : 'Create Event'}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Createevent;