import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAofkJP63Y8udpLS28gZfjmQaN3bPW6FMU",
    authDomain: "eventra-df9ca.firebaseapp.com",
    projectId: "eventra-df9ca",
    storageBucket: "eventra-df9ca.firebasestorage.app",
    messagingSenderId: "468930877386",
    appId: "1:468930877386:web:78cb43bf7d65dacfe06133",
    measurementId: "G-RQM8SXP352"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;