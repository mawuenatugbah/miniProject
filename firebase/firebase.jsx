// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLEvGmWT7Qg6dt0ZEoAJkCCoxYzwbaCrw",
  authDomain: "eduai-a955c.firebaseapp.com",
  projectId: "eduai-a955c",
  storageBucket: "eduai-a955c.firebasestorage.app",
  messagingSenderId: "492880603434",
  appId: "1:492880603434:web:689f1511dfa861585d1653",
  measurementId: "G-7ZK3162FJ3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };