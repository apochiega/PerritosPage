import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import App from "./App";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAg8XrBs-3-XrE-9WNAQwdOEDVYwGHVLGM",
  authDomain: "perritos-c6d2d.firebaseapp.com",
  projectId: "perritos-c6d2d",
  storageBucket: "perritos-c6d2d.appspot.com",
  messagingSenderId: "370572953842",
  appId: "1:370572953842:web:93e854f90e22cac0e9a86b",
  measurementId: "G-FEMHGY7WVV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();

  
};
ReactDOM.render(
  <React.StrictMode>
    <button onClick={signInWithGoogle}>Iniciar sesión con Google</button>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);


