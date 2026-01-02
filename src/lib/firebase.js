import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCeuKdm-fKUOW3Z9mkcX3uuQ6SLoNuj7A8",
    authDomain: "activity-tracker-1f29b.firebaseapp.com",
    projectId: "activity-tracker-1f29b",
    storageBucket: "activity-tracker-1f29b.firebasestorage.app",
    messagingSenderId: "920524747010",
    appId: "1:920524747010:web:3b7fd327d731ffd7f1121b",
    measurementId: "G-C5GDLQQYNT"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
