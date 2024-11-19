// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAEz0i4QDX0wn6GnKyJbK7uwS6G_Nku18",
  authDomain: "zupernews-877d6.firebaseapp.com",
  projectId: "zupernews-877d6",
  storageBucket: "zupernews-877d6.firebasestorage.app",
  messagingSenderId: "921447314745",
  appId: "1:921447314745:web:b004d86d58ecbf71eb24e8",
  measurementId: "G-68058M7WF2",
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);

// Initialize Firestore
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
