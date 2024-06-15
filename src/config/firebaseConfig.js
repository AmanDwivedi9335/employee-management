// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDh_akQMb0QFtl3T_YVXex8OBxPA9x9fHQ",
  authDomain: "payroll-beechems.firebaseapp.com",
  projectId: "payroll-beechems",
  storageBucket: "payroll-beechems.appspot.com",
  messagingSenderId: "925997320308",
  appId: "1:925997320308:web:9b8afc1195ff753d9b2921",
  measurementId: "G-N2DK9YV12W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);