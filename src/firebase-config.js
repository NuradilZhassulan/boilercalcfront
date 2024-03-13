// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC0fwwGUrNF2SdFTijkEpraZqFcQuDcN9w",
  authDomain: "boilercalc.firebaseapp.com",
  projectId: "boilercalc",
  storageBucket: "boilercalc.appspot.com",
  messagingSenderId: "676489807065",
  appId: "1:676489807065:web:96ec978aae4f6104452ac8",
  measurementId: "G-HBBRBHR20T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };