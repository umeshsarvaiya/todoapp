// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getFirestore} from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2mgAH3N3jdbnk8loamVt8wv4COvJ3Otw",
  authDomain: "todosapp-bca16.firebaseapp.com",
  projectId: "todosapp-bca16",
  storageBucket: "todosapp-bca16.appspot.com",
  messagingSenderId: "956009079982",
  appId: "1:956009079982:web:88ae3677ac95db6f8cf93f",
  measurementId: "G-B71CTS4GN0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db=getFirestore(app);
export default app;