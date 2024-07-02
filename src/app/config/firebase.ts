import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "revents-85fc1.firebaseapp.com",
  projectId: "revents-85fc1",
  storageBucket: "revents-85fc1.appspot.com",
  messagingSenderId: "822280487153",
  appId: "1:822280487153:web:f0c2882a010ade16be2950",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
