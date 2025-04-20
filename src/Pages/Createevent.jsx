import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, collection, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase/config';
import { uploadToCloudinary } from '../utils/cloudinary';
import { toast } from 'react-toastify';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
// import "../css/events.css";
import "../css/createevent.css";


const Createevent = () => {

    const handleAddPackage = () => {
        if (eventData.packages.length < 3) {
            setEventData(prev => ({
                ...prev,
                packages: [...prev.packages, {
                    type: 'standard',
                    price: '',
                    benefits: ['']
                }]
            }));
        }
    };

    const handleRemovePackage = (packageIndex) => {
        if (eventData.packages.length > 1) {
            setEventData(prev => ({
                ...prev,
                packages: prev.packages.filter((_, index) => index !== packageIndex)
            }));
        }
    };

    // Also update the handlePackageChange function to handle multiple packages
    const handlePackageChange = (packageIndex, field, value) => {
        setEventData(prev => ({
            ...prev,
            packages: prev.packages.map((pkg, index) =>
                index === packageIndex ? { ...pkg, [field]: value } : pkg
            )
        }));
    };
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [eventData, setEventData] = useState({
        title: '',
        category: '',
        date: '',
        time: '',
        duration: '',
        location: {
            venue: '',
            address: '',
            city: '',
            country: ''
        },
        description: '',
        capacity: '',
        sliderImages: [],
        sponsorLogos: [],
        packages: [{
            type: 'standard',
            price: '',
            benefits: ['']
        }],
        previousEvents: []
    });

    // Add new state for package benefits
    const [currentBenefits, setCurrentBenefits] = useState(['']);



    // Add handler for previous events
    const [previousEvent, setPreviousEvent] = useState({
        title: '',
        category: '',
        images: [],
        location: '',
        date: '',
        attendees: ''
    });

    const handlePreviousEventSubmit = () => {
        setEventData(prev => ({
            ...prev,
            previousEvents: [...prev.previousEvents, previousEvent]
        }));
        setPreviousEvent({
            title: '',
            category: '',
            images: [],
            location: '',
            date: '',
            attendees: ''
        });
    };



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
                duration: eventData.duration,
                location: {
                    venue: eventData.location.venue.trim(),
                    address: eventData.location.address.trim(),
                    city: eventData.location.city.trim(),
                    country: eventData.location.country.trim()
                },
                description: eventData.description.trim(),
                capacity: parseInt(eventData.capacity, 10),
                sliderImages: eventData.sliderImages,
                sponsorLogos: eventData.sponsorLogos,
                packages: eventData.packages.map(pkg => ({
                    type: pkg.type,
                    price: parseFloat(pkg.price),
                    benefits: pkg.benefits.filter(benefit => benefit.trim() !== '')
                })),
                previousEvents: eventData.previousEvents.map(event => ({
                    title: event.title,
                    category: event.category,
                    images: event.images,
                    location: event.location,
                    date: event.date,
                    attendees: parseInt(event.attendees, 10)
                })),
                createdAt: serverTimestamp(),
                status: 'pending',
                eventManagerId: auth.currentUser?.uid,
                eventManagerName: auth.currentUser?.displayName || '',
                eventManagerEmail: auth.currentUser?.email || ''
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
                                    <option value="music">Music & Concerts</option>
                                    <option value="business">Business & Networking</option>
                                    <option value="tech">Tech & Innovation</option>
                                    <option value="arts">Arts & Culture</option>
                                    <option value="food">Food & Drink</option>
                                    <option value="health">Health & Wellness</option>
                                    <option value="sports">Sports & Fitness</option>
                                    <option value="education">Education & Workshops</option>
                                    <option value="charity">Charity & Causes</option>
                                    <option value="festivals">Festivals & Fairs</option>
                                    <option value="parties">Parties & Nightlife</option>
                                    <option value="travel">Travel & Outdoor</option>
                                    <option value="family">Family & Kids</option>
                                    <option value="fashion">Fashion & Beauty</option>
                                    <option value="spirituality">Spirituality & Religion</option>
                                    <option value="film">Film & Media</option>
                                    <option value="theater">Theater & Performing Arts</option>
                                    <option value="gaming">Gaming & Esports</option>
                                    <option value="literature">Literature & Books</option>
                                    <option value="finance">Finance & Investment</option>
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
                            <h2>Event Duration</h2>
                            <div className="form-group">
                                <label htmlFor="duration">Duration (in hours)*</label>
                                <input
                                    type="number"
                                    id="duration"
                                    value={eventData.duration}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-section">
                            <h2>Event Slider Images</h2>
                            <div className="form-group">
                                <label>Upload Slider Images (Recommended: 3-5 images)</label>
                                <div className="image-upload-container">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={async (e) => {
                                            const files = Array.from(e.target.files);
                                            setLoading(true);
                                            try {
                                                const uploadPromises = files.map(file => uploadToCloudinary(file));
                                                const urls = await Promise.all(uploadPromises);
                                                setEventData(prev => ({
                                                    ...prev,
                                                    sliderImages: [...prev.sliderImages, ...urls]
                                                }));
                                                toast.success('Slider images uploaded successfully');
                                            } catch (error) {
                                                toast.error('Failed to upload slider images');
                                            } finally {
                                                setLoading(false);
                                            }
                                        }}
                                    />
                                    <div className="upload-placeholder">
                                        <i className="fas fa-cloud-upload-alt" />
                                        <p>Upload slider images</p>
                                    </div>
                                </div>
                                <div className="image-preview">
                                    {eventData.sliderImages.map((url, index) => (
                                        <img
                                            key={index}
                                            src={url}
                                            alt={`Slider ${index + 1}`}
                                            className="preview-image"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Existing sponsors section */}
                        <div className="form-section">
                            <h2>Event Sponsors</h2>
                            <div className="form-group">
                                <label>Upload Sponsor Logos</label>
                                <div className="image-upload-container">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={async (e) => {
                                            const files = Array.from(e.target.files);
                                            setLoading(true);
                                            try {
                                                const uploadPromises = files.map(file => uploadToCloudinary(file));
                                                const urls = await Promise.all(uploadPromises);
                                                setEventData(prev => ({
                                                    ...prev,
                                                    sponsorLogos: [...prev.sponsorLogos, ...urls]
                                                }));
                                                toast.success('Sponsor logos uploaded successfully');
                                            } catch (error) {
                                                toast.error('Failed to upload sponsor logos');
                                            } finally {
                                                setLoading(false);
                                            }
                                        }}
                                    />
                                    <div className="upload-placeholder">
                                        <i className="fas fa-cloud-upload-alt" />
                                        <p>Upload sponsor logos</p>
                                    </div>
                                </div>
                                <div className="image-preview">
                                    {eventData.sponsorLogos.map((url, index) => (
                                        <img
                                            key={index}
                                            src={url}
                                            alt={`Sponsor ${index + 1}`}
                                            className="preview-image"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="form-section">
                            <h2>Ticket Packages</h2>
                            {eventData.packages.map((pkg, packageIndex) => (
                                <div key={packageIndex} className="package-card">
                                    <h3>Package {packageIndex + 1}</h3>
                                    <div className="form-group">
                                        <label>Package Type</label>
                                        <select
                                            value={pkg.type}
                                            onChange={(e) => handlePackageChange(packageIndex, 'type', e.target.value)}
                                        >
                                            <option value="standard">Standard</option>
                                            <option value="pro">Pro</option>
                                            <option value="vip">VIP</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Price*</label>
                                        <input
                                            type="number"
                                            value={pkg.price}
                                            onChange={(e) => handlePackageChange(packageIndex, 'price', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Benefits*</label>
                                        {pkg.benefits.map((benefit, benefitIndex) => (
                                            <div key={benefitIndex} className="benefit-input">
                                                <input
                                                    type="text"
                                                    value={benefit}
                                                    onChange={(e) => {
                                                        const newBenefits = [...pkg.benefits];
                                                        newBenefits[benefitIndex] = e.target.value;
                                                        handlePackageChange(packageIndex, 'benefits', newBenefits);
                                                    }}
                                                    placeholder="Enter benefit"
                                                // required
                                                />
                                                {benefitIndex === pkg.benefits.length - 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const newBenefits = [...pkg.benefits, ''];
                                                            handlePackageChange(packageIndex, 'benefits', newBenefits);
                                                        }}
                                                    >
                                                        Add Benefit
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    {eventData.packages.length > 1 && (
                                        <button
                                            type="button"
                                            className="remove-package-btn"
                                            onClick={() => handleRemovePackage(packageIndex)}
                                        >
                                            Remove Package
                                        </button>
                                    )}
                                </div>
                            ))}
                            {eventData.packages.length < 3 && (
                                <button
                                    type="button"
                                    className="add-package-btn"
                                    onClick={handleAddPackage}
                                >
                                    Add New Package
                                </button>
                            )}
                        </div>

                        <div className="form-section">
                            <h2>Previous Events (Optional)</h2>
                            {eventData.previousEvents.map((event, index) => (
                                <div key={index} className="previous-event-card">
                                    <h3>Previous Event {index + 1}</h3>
                                    <p>{event.title} - {event.category}</p>
                                    <p>{event.location} - {event.date}</p>
                                    <p>Attendees: {event.attendees}</p>
                                    <div className="event-images">
                                        {event.images.map((img, i) => (
                                            <img key={i} src={img} alt={`Event ${index + 1} image ${i + 1}`} />
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <div className="add-previous-event">
                                <input
                                    type="text"
                                    placeholder="Event Title"
                                    value={previousEvent.title}
                                    onChange={(e) => setPreviousEvent({ ...previousEvent, title: e.target.value })}
                                />
                                <select
                                    value={previousEvent.category}
                                    onChange={(e) => setPreviousEvent({ ...previousEvent, category: e.target.value })}
                                >
                                    <option value="">Select Category</option>
                                    <option value="music">Music & Concerts</option>
                                    <option value="business">Business & Networking</option>
                                    <option value="tech">Tech & Innovation</option>
                                    <option value="arts">Arts & Culture</option>
                                    <option value="food">Food & Drink</option>
                                    <option value="health">Health & Wellness</option>
                                    <option value="sports">Sports & Fitness</option>
                                    <option value="education">Education & Workshops</option>
                                    <option value="charity">Charity & Causes</option>
                                    <option value="festivals">Festivals & Fairs</option>
                                    <option value="parties">Parties & Nightlife</option>
                                    <option value="travel">Travel & Outdoor</option>
                                    <option value="family">Family & Kids</option>
                                    <option value="fashion">Fashion & Beauty</option>
                                    <option value="spirituality">Spirituality & Religion</option>
                                    <option value="film">Film & Media</option>
                                    <option value="theater">Theater & Performing Arts</option>
                                    <option value="gaming">Gaming & Esports</option>
                                    <option value="literature">Literature & Books</option>
                                    <option value="finance">Finance & Investment</option>
                                </select>
                                <input
                                    type="text"
                                    placeholder="Location"
                                    value={previousEvent.location}
                                    onChange={(e) => setPreviousEvent({ ...previousEvent, location: e.target.value })}
                                />
                                <input
                                    type="date"
                                    value={previousEvent.date}
                                    onChange={(e) => setPreviousEvent({ ...previousEvent, date: e.target.value })}
                                />
                                <input
                                    type="number"
                                    placeholder="Number of Attendees"
                                    value={previousEvent.attendees}
                                    onChange={(e) => setPreviousEvent({ ...previousEvent, attendees: e.target.value })}
                                />
                                <div className="image-upload-container">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={async (e) => {
                                            const files = Array.from(e.target.files);
                                            try {
                                                const uploadPromises = files.map(file => uploadToCloudinary(file));
                                                const urls = await Promise.all(uploadPromises);
                                                setPreviousEvent(prev => ({
                                                    ...prev,
                                                    images: [...prev.images, ...urls]
                                                }));
                                            } catch (error) {
                                                toast.error('Failed to upload previous event images');
                                            }
                                        }}
                                    />
                                    <div className="upload-placeholder">
                                        <i className="fas fa-cloud-upload-alt" />
                                        <p>Upload event images</p>
                                    </div>
                                </div>
                                <button type="button" onClick={handlePreviousEventSubmit}>
                                    Add Previous Event
                                </button>
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