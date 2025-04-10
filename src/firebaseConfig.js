// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);