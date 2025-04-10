import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { toast } from 'react-toastify';
import { auth, db, storage } from '../firebase/config';

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
      // Create user authentication using initialized auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      let documentUrl = null;
      
      // Upload document if role is not attendee using initialized storage
      if (formData.role !== 'attendee' && formData.document) {
        const storageRef = ref(storage, `verification/${userCredential.user.uid}`);
        await uploadBytes(storageRef, formData.document);
        documentUrl = await getDownloadURL(storageRef);
      }

      // Store user data in Firestore using initialized db
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        fullName: formData.fullName,
        email: formData.email,
        role: formData.role,
        verificationDocument: documentUrl,
        verificationStatus: formData.role === 'attendee' ? 'verified' : 'pending',
        createdAt: new Date().toISOString()
      });

      toast.success('Registration successful!');
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <input
                name="fullName"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Full Name"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <input
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <input
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-gray-700 font-medium">Select Role:</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="attendee"
                    checked={formData.role === 'attendee'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Attendee
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="eventManager"
                    checked={formData.role === 'eventManager'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Event Manager
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="serviceOwner"
                    checked={formData.role === 'serviceOwner'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Service Owner
                </label>
              </div>
            </div>

            {formData.role !== 'attendee' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Verification Document
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  required
                  className="mt-1 block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-indigo-50 file:text-indigo-700
                    hover:file:bg-indigo-100"
                />
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;