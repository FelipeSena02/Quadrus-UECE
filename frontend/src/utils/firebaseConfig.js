import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebase configuration using Vite VITE_ prefix environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCTDnHyPOw0wE-m-6nFPgXkJ6B3l7xmt-g",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "quadrus-b99da.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "quadrus-b99da",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "quadrus-b99da.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "805018459542",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:805018459542:web:2063479376b92de24191b7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);

export { app, auth };
export default firebaseConfig;
