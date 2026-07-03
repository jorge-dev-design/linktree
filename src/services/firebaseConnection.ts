import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;

if (!apiKey) {
  throw new Error("VITE_FIREBASE_API_KEY não foi configurada.");
}

  const firebaseConfig = {
    apiKey,
    authDomain: "linktree-d4098.firebaseapp.com",
    projectId: "linktree-d4098",
    storageBucket: "linktree-d4098.firebasestorage.app",
    messagingSenderId: "1007086564976",
    appId: "1:1007086564976:web:5ef613752edbe47925e6b5",
    measurementId: "G-G159WRBH3V"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
