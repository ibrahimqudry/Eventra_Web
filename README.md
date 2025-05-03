# Eventra Web

## Description
Eventra Web is a web-based event management platform built with React and Vite, integrated with Firebase for backend services and Cloudinary for media management.

## Technologies Used
- React
- Vite
- Firebase (Authentication, Firestore)
- Cloudinary
- React Router DOM
- React Hook Form
- Zod (for form validation)

## Setup Instructions
1. Clone the repository
```bash
git clone https://github.com/ibrahimqudry/Eventra_Web.git
cd Eventra_Web
```
2. Install dependencies
```bash
npm install
```
3. Create a .env file in the root directory with the following variables:
### Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id

### Cloudinary Configuration
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
VITE_CLOUDINARY_API_KEY=your_api_key
VITE_CLOUDINARY_API_SECRET=your_api_secret

4. Start the development server
```bash
npm run dev
```
5. Open your browser and navigate to http://localhost:5173
Note: Make sure you have Node.js (v16 or higher) and npm installed on your system before starting the setup process.