import axios from 'axios';

const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
        const response = await axios.post(CLOUDINARY_URL, formData);
        return response.data.secure_url;
    } catch (error) {
        console.error('Upload error:', error.response?.data || error.message);
        throw new Error('File upload failed: ' + (error.response?.data?.error?.message || error.message));
    }
};

const CLOUDINARY_CONFIG = {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dxqjyqz8p',
    uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'ml_default',
    apiUrl: import.meta.env.VITE_CLOUDINARY_API_URL || 'https://api.cloudinary.com/v1_1/dxqjyqz8p/image/upload'
};

export default CLOUDINARY_CONFIG;