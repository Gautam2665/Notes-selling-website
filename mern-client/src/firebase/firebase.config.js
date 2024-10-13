// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtRVVID_7TCfvLIGYdwhU7IUvaWLzXmC8",
  authDomain: "mern-notes-inventory.firebaseapp.com",
  projectId: "mern-notes-inventory",
  storageBucket: "mern-notes-inventory.appspot.com",
  messagingSenderId: "474972954041",
  appId: "1:474972954041:web:6a2b5a9bfe5eb2600e2a68"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;