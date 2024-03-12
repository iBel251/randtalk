import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCG-o4XIYuKKoTvjcsrJvSxY44xsNPU_6c",
  authDomain: "randtalk-a0324.firebaseapp.com",
  projectId: "randtalk-a0324",
  storageBucket: "randtalk-a0324.appspot.com",
  messagingSenderId: "579406834347",
  appId: "1:579406834347:web:fa29d7c9df23fa1d90e5ee",
  measurementId: "G-ENDNWBSW1M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase(app);

// Exports
export { app, auth, db, database };
