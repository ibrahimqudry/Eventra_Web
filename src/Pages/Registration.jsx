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
        .min(12, 'You must be at least 12 years old')
        .refine(val => Number.isInteger(val), 'Age must be a whole number'),
    role: z.enum(['attendee', 'eventManager', 'serviceOwner']),
    document: z.any()
        .refine(val => val.length > 0, 'Document is required')
        .optional(),
    interests: z.array(z.string()).min(1, 'Select at least one interest'),
    terms: z.literal(true, {
        errorMap: () => ({ message: "You must accept the terms and conditions" }),
    }),
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

            let documentUrl = null;
            if (data.role !== 'attendee' && data.document && data.document[0]) {
                documentUrl = await uploadToCloudinary(data.document[0]);
            }

            await setDoc(doc(db, 'users', userCredential.user.uid), {
                fullName: data.fullName,
                email: data.email,
                age: data.age,
                role: data.role,
                verificationDocument: documentUrl,
                verificationStatus: data.role === 'attendee' ? 'verified' : 'pending',
                interests: data.interests,
                createdAt: new Date().toISOString()
            });

            toast.success('Registration successful!');

            if (data.role === 'eventManager') {
                navigate('/EventMDashbord');
            } else if (data.role === 'serviceOwner') {
                navigate('/serviceOwnerDashboard');
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
                    <img
                        src="https://storyset.com/illustration/forms/amico#A777E3FF&hide=&hide=complete"
                        alt="Illustration"/>
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