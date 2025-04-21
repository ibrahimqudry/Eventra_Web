import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { auth, db } from '../firebase/config';
import '../css/Login.css';
import Lottie from "lottie-react";
import animationData from "../assets/login_animation.json";

// Zod schema for form validation
const schema = z.object({
    email: z.string().email('Invalid email address').min(1, 'Email is required'),
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number')
        .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
});

const Login = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            email: '',
            password: '',
        }
    });

    const onSubmit = async (data) => {
        try {
            // Check for admin credentials
            if (data.email === 'admin@eventra.com' && data.password === 'AdminEventra1+') {
                navigate('/admin');
                return;
            }

            const userCredential = await signInWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );

            const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
            const userData = userDoc.data();

            // Store user data in localStorage
            localStorage.setItem('userData', JSON.stringify(userData));

            if (userData.role === 'eventManager') {
                navigate('/EventMDashbord');
            } else if (userData.role === 'serviceOwner') {
                navigate('/sodashboard');
            } else if (userData.role === 'attendee') {
                navigate('/');
            }

            toast.success('Login successful!');
        } catch (error) {
            toast.error('Invalid email or password');
        }
    };

    return (
        <div className="login-container">
            <div className="promotional-section">
                <h2 style={{color: 'white'}}>Wlecome Back To Eventra</h2>
                <div className="promotional-image">
                    <Lottie 
                        animationData={animationData}
                        style={{ width: "100%", height: "auto" }}
                        loop={true}
                        autoplay={true}
                    />
                </div>
            </div>
            {/* Right Section - Form */}
            <div className="form-section">
                <div className="form-container">
                    <h2>Sign In</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="form">
                        {/* Email */}
                        <div className="form-group">
                            <input
                                {...register('email')}
                                type="email"
                                placeholder="Email Address"
                                className={`input-field ${errors.email ? 'error' : ''}`}
                            />
                            {errors.email && (
                                <p className="error-message">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="form-group">
                            <input
                                {...register('password')}
                                type="password"
                                placeholder="Password"
                                className={`input-field ${errors.password ? 'error' : ''}`}
                            />
                            {errors.password && (
                                <p className="error-message">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Forgot Password Link */}
                        <div className="forgot-password">
                            <Link to="/forgot-password">Forgot password?</Link>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="submit-button"
                        >
                            Sign In
                        </button>

                        {/* Register Link */}
                        <p className="register-link">
                            Don't have an account?{' '}
                            <Link to="/register" className="register-text">
                                Register here
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;