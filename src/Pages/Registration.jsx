import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { auth, db } from '../firebase/config';
import { uploadToCloudinary } from '../utils/cloudinary';
import '../css/Registration.css';
import Lottie from "lottie-react";
import animationData from "../assets/register.json";

// Interests list
const interests = [
    "Music & Concerts", "Business & Networking", "Tech & Innovation",
    "Arts & Culture", "Food & Drink", "Health & Wellness",
    "Sports & Fitness", "Education & Workshops", "Charity & Causes",
    "Festivals & Fairs", "Parties & Nightlife", "Travel & Outdoor",
    "Family & Kids", "Fashion & Beauty", "Spirituality & Religion",
    "Film & Media", "Theater & Performing Arts", "Gaming & Esports",
    "Literature & Books", "Finance & Investment"
];

// Zod schema for form validation
// Update the document validation in the schema
const schema = z.object({
    fullName: z.string().min(1, 'Full name is required'),
    email: z.string().email('Invalid email address').min(1, 'Email is required'),
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number')
        .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
    age: z.number()
        .min(18, 'You must be at least 18 years old')
        .refine(val => Number.isInteger(val), 'Age must be a whole number'),
    role: z.enum(['attendee', 'eventManager', 'serviceOwner']),
    document: z.any()
        .optional()
        .superRefine((val, ctx) => {
            const formData = ctx.path[0];
            const role = formData?.role;
            
            // Skip validation for attendees or if role is not yet selected
            if (!role || role === 'attendee') {
                return true;
            }
            
            // For event managers and service owners, require document
            if (!val || !val.length) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Document is required for Event Managers and Service Owners',
                });
            }
        }),
    interests: z.array(z.string()).min(1, 'Select at least one interest'),
    terms: z.literal(true, {
        errorMap: () => ({ message: "You must accept the terms and conditions" }),
    }),
    profileImage: z.any()
        .refine(val => val.length > 0, 'Profile image is required'),
});

const Registration = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            email: '',
            password: '',
            fullName: '',
            age: 0,
            role: 'attendee',
            document: null,
            interests: [],
            terms: false
        }
    });

    const role = watch('role');
    const selectedInterests = watch('interests') || [];

    const onSubmit = async (data) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );

            // Upload profile image
            let profileImageUrl = null;
            if (data.profileImage && data.profileImage[0]) {
                profileImageUrl = await uploadToCloudinary(data.profileImage[0]);
            }

            // Upload verification document if needed
            let documentUrl = null;
            if (data.role !== 'attendee' && data.document && data.document[0]) {
                documentUrl = await uploadToCloudinary(data.document[0]);
            }

            const userData = {
                fullName: data.fullName,
                email: data.email,
                age: data.age,
                role: data.role,
                profileImage: profileImageUrl,
                verificationDocument: documentUrl,
                verificationStatus: data.role === 'attendee' ? 'verified' : 'pending',
                interests: data.interests,
                createdAt: new Date().toISOString(),
                uid: userCredential.user.uid
            };

            // Save to Firestore
            await setDoc(doc(db, 'users', userCredential.user.uid), userData);

            // Save to localStorage
            localStorage.setItem('userData', JSON.stringify(userData));

            toast.success('Registration successful!');

            if (data.role === 'eventManager') {
                navigate('/EventMDashbord');
            } else if (data.role === 'serviceOwner') {
                navigate('/sodashboard');
            } else {
                navigate('/');
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="registration-container">
            {/* Left Section - Promotional Content */}
            <div className="promotional-section">
                <h1>Eventra Where Every Moment Becomes a Memory.</h1>
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
                    <h2>Create Account</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="form">
                        {/* Full Name */}
                        <div className="form-group">
                            <input
                                {...register('fullName')}
                                type="text"
                                placeholder="Full Name"
                                className={`input-field ${errors.fullName ? 'error' : ''}`}
                            />
                            {errors.fullName && (
                                <p className="error-message">{errors.fullName.message}</p>
                            )}
                        </div>
                        
                        <div className="form-group">
                            <label className="role-label">Profile Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                {...register('profileImage')}
                                className={`input-field ${errors.profileImage ? 'error' : ''}`}
                            />
                            {errors.profileImage && (
                                <p className="error-message">{errors.profileImage.message}</p>
                            )}
                        </div>

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

                        {/* Age */}
                        <div className="form-group">
                            <input
                                {...register('age', { valueAsNumber: true })}
                                type="number"
                                placeholder="Age"
                                min="12"
                                className={`input-field ${errors.age ? 'error' : ''}`}
                            />
                            {errors.age && (
                                <p className="error-message">{errors.age.message}</p>
                            )}
                        </div>

                        {/* Role Selection */}
                        <div className="form-group">
                            <label className="role-label">Choose your role:</label>
                            <div className="role-options">
                                <label className="role-option">
                                    <input
                                        type="radio"
                                        value="attendee"
                                        {...register('role')}
                                    />
                                    <span>Attendee</span>
                                </label>
                                <label className="role-option">
                                    <input
                                        type="radio"
                                        value="eventManager"
                                        {...register('role')}
                                    />
                                    <span>Event Manager</span>
                                </label>
                                <label className="role-option">
                                    <input
                                        type="radio"
                                        value="serviceOwner"
                                        {...register('role')}
                                    />
                                    <span>Service Owner</span>
                                </label>
                            </div>
                        </div>

                        {/* Document Upload */}
                        {role !== 'attendee' && (
                            <div className="form-group">
                                <label className="role-label">Verification Document (Proof of identity or business)</label>
                                <input
                                    type="file"
                                    {...register('document')}
                                    className={`input-field ${errors.document ? 'error' : ''}`}
                                />
                                {errors.document && (
                                    <p className="error-message">{errors.document.message}</p>
                                )}
                            </div>
                        )}

                        {/* Interests */}
                        <div className="form-group">
                            <label className="role-label">Select Your Interests:</label>
                            <div className="interests-container">
                                {interests.map((interest) => (
                                    <label key={interest} className={`interest-option ${selectedInterests.includes(interest) ? 'selected' : ''}`}>
                                        <input
                                            type="checkbox"
                                            value={interest}
                                            {...register('interests')}
                                            className="hidden-checkbox"
                                        />
                                        {interest}
                                    </label>
                                ))}
                            </div>
                            {errors.interests && (
                                <p className="error-message">{errors.interests.message}</p>
                            )}
                        </div>

                        {/* Terms Checkbox */}
                        <div className="checkbox-container">
                            <input
                                type="checkbox"
                                id="terms"
                                {...register('terms')}
                                className={`terms-checkbox ${errors.terms ? 'error' : ''}`}
                            />
                            <label htmlFor="terms">I agree to the terms of service & privacy policy</label>
                            {errors.terms && (
                                <p className="error-message">{errors.terms.message}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="submit-button"
                        >
                            Sign Up
                        </button>

                        {/* Sign In Link */}
                        <p className="signin-link">
                            Already have an account?{' '}
                            <a href="/login">
                                Sign in
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Registration;

