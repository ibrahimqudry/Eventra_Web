import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { auth, db } from '../firebase/config';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );

            // Get user role from Firestore
            const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
            const userData = userDoc.data();

            // Redirect based on user role
            if (userData.role === 'eventManager') {
                navigate('/EventMDashbord');
            } else if (userData.role === 'serviceOwner') {
                navigate('/serviceOwnerDashboard');
            } else if (userData.role === 'attendee') {
                navigate('/'); // Changed to navigate to home page
            }

            toast.success('Login successful!');
        } catch (error) {
            toast.error('Invalid email or password');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8 space-y-8">
                <div>
                    <h2 className="text-center text-3xl font-extrabold text-indigo-900">
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Sign in to your Eventra account
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-5">
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
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out transform hover:-translate-y-0.5"
                        >
                            Sign In
                        </button>
                    </div>

                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Register here
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;