import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { toast } from 'react-toastify';
import { auth, db } from '../firebase/config';
import { uploadToCloudinary } from '../utils/cloudinary';

const Registration = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        fullName: '',
        role: 'attendee',
        document: null
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({
            ...prev,
            document: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );

            let documentUrl = null;

            // Upload document to Cloudinary if role is not attendee
            if (formData.role !== 'attendee' && formData.document) {
                documentUrl = await uploadToCloudinary(formData.document);
            }

            // Store user data in Firestore
            await setDoc(doc(db, 'users', userCredential.user.uid), {
                fullName: formData.fullName,
                email: formData.email,
                role: formData.role,
                verificationDocument: documentUrl,
                verificationStatus: formData.role === 'attendee' ? 'verified' : 'pending',
                createdAt: new Date().toISOString()
            });

            toast.success('Registration successful!');
            
            // Route based on role
            if (formData.role === 'eventManager') {
                navigate('/EventMDashbord');
            } else if (formData.role === 'serviceOwner') {
                navigate('/serviceOwnerDashboard');
            } else {
                navigate('/');
            }
            
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8 space-y-8">
                <div>
                    <h2 className="text-center text-3xl font-extrabold text-indigo-900">
                        Join Eventra
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Create your account to start your journey
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-5">
                        <div>
                            <input
                                name="fullName"
                                type="text"
                                required
                                className="block w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out"
                                placeholder="Full Name"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <input
                                name="email"
                                type="email"
                                required
                                className="block w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out"
                                placeholder="Email address"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <input
                                name="password"
                                type="password"
                                required
                                className="block w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out"
                                placeholder="Password"
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                            <label className="text-indigo-900 font-semibold mb-3 block">Choose your role:</label>
                            <div className="space-y-3">
                                <label className="flex items-center p-2 rounded-lg hover:bg-indigo-50 transition-colors cursor-pointer">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="attendee"
                                        checked={formData.role === 'attendee'}
                                        onChange={handleInputChange}
                                        className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                    />
                                    <span className="ml-3 text-gray-700">Attendee</span>
                                </label>
                                <label className="flex items-center p-2 rounded-lg hover:bg-indigo-50 transition-colors cursor-pointer">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="eventManager"
                                        checked={formData.role === 'eventManager'}
                                        onChange={handleInputChange}
                                        className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                    />
                                    <span className="ml-3 text-gray-700">Event Manager</span>
                                </label>
                                <label className="flex items-center p-2 rounded-lg hover:bg-indigo-50 transition-colors cursor-pointer">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="serviceOwner"
                                        checked={formData.role === 'serviceOwner'}
                                        onChange={handleInputChange}
                                        className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                    />
                                    <span className="ml-3 text-gray-700">Service Owner</span>
                                </label>
                            </div>
                        </div>

                        {formData.role !== 'attendee' && (
                            <div className="bg-white rounded-lg p-4 border border-gray-200">
                                <label className="text-indigo-900 font-semibold mb-2 block">
                                    Verification Document
                                </label>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    required
                                    className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-lg file:border-0
                    file:text-sm file:font-semibold
                    file:bg-indigo-100 file:text-indigo-700
                    hover:file:bg-indigo-200 transition-colors
                    cursor-pointer"
                                />
                                <p className="mt-2 text-xs text-gray-500">
                                    Please upload a valid document for verification
                                </p>
                            </div>
                        )}
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out transform hover:-translate-y-0.5"
                        >
                            Create Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Registration;