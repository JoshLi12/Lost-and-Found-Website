// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClH7O9dLDuO7-YI0sa-2ba_q-546gWUq8",
  authDomain: "lost-and-found-website-21130.firebaseapp.com",
  projectId: "lost-and-found-website-21130",
  storageBucket: "lost-and-found-website-21130.appspot.com",
  messagingSenderId: "210245001403",
  appId: "1:210245001403:web:bdda72b98ab7791250c99e",
  measurementId: "G-MF630ZQ7CG"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);