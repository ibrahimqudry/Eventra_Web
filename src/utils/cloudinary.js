import axios from 'axios';

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dih2r1pav/upload";
const UPLOAD_PRESET = "Eventra"; 

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