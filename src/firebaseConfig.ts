// Import Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBsF269ERSNY4oUNJbWpIiGm5os6rAHA-8",
  authDomain: "pm-internship-engine-1b6b9.firebaseapp.com",
  projectId: "pm-internship-engine-1b6b9",
  storageBucket: "pm-internship-engine-1b6b9.firebasestorage.app",
  messagingSenderId: "518411017209",
  appId: "1:518411017209:web:05396791f72b7532a47b28"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore DB instance
export const db = getFirestore(app);
