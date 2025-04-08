import React from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import "../css/events.css"



const Create = () => {
    return (
     <>
        <Nav/>
        <section className="create-event-section">
            <div className="create-event-container">
                <h1>Create New Event</h1>
                <form className="create-event-form">
                    {/* Basic Information */}
                    <div className="form-section">
                        <h2>Basic Information</h2>
                        <div className="form-group">
                            <label htmlFor="event-title">Event Title*</label>
                            <input type="text" id="event-title" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="event-category">Category*</label>
                            <select id="event-category" required>
                                <option value="">Select Category</option>
                                <option value="tech">Technology</option>
                                <option value="business">Business</option>
                                <option value="arts">Arts & Culture</option>
                                <option value="sports">Sports</option>
                            </select>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="event-date">Date*</label>
                                <input type="date" id="event-date" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="event-time">Time*</label>
                                <input type="time" id="event-time" required />
                            </div>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="form-section">
                        <h2>Location</h2>
                        <div className="form-group">
                            <label htmlFor="venue-name">Venue Name*</label>
                            <input type="text" id="venue-name" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="venue-address">Address*</label>
                            <input type="text" id="venue-address" required />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="city">City*</label>
                                <input type="text" id="city" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="country">Country*</label>
                                <input type="text" id="country" required />
                            </div>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="form-section">
                        <h2>Event Details</h2>
                        <div className="form-group">
                            <label htmlFor="description">Description*</label>
                            <textarea id="description" rows="4" required />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="capacity">Capacity*</label>
                                <input type="number" id="capacity" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">Ticket Price*</label>
                                <input type="number" id="price" required />
                            </div>
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div className="form-section">
                        <h2>Event Image</h2>
                        <div className="form-group">
                            <label htmlFor="event-image">Upload Image*</label>
                            <div className="image-upload-container">
                                <input type="file" id="event-image" accept="image/*" required />
                                <div className="upload-placeholder">
                                    <i className="fas fa-cloud-upload-alt" />
                                    <p>Drag and drop or click to upload</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit Buttons */}
                    <div className="form-buttons">
                        <button type="button" className="cancel-btn">Cancel</button>
                        <button type="submit" className="submit-btn">Create Event</button>
                    </div>
                </form>
            </div>
        </section>

            <Footer />
            </>
    )
}

export default Create