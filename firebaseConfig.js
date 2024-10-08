// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDVeFOlFY_6jKg6L19XTTQEta3MvaQ9bQ0",
  authDomain: "drive-498d9.firebaseapp.com",
  projectId: "drive-498d9",
  storageBucket: "drive-498d9.appspot.com",
  messagingSenderId: "561768826323",
  appId: "1:561768826323:web:d832d33111d387f81c9b26",
  measurementId: "G-JWYFZ41NPJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default app ;