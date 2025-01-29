// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDieryek5eMg8Hc-03XCunwX7D0GsNfy_M",
  authDomain: "timeline-ee559.firebaseapp.com",
  projectId: "timeline-ee559",
  storageBucket: "timeline-ee559.firebasestorage.app",
  messagingSenderId: "316883144646",
  appId: "1:316883144646:web:e2e2dbcf786204d0ae2cc7",
  measurementId: "G-Y5ZP7PW05X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and export it
const db = getFirestore(app);
export { db };
