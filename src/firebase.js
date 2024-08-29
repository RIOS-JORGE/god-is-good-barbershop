import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // Aquí va tu configuración de Firebase
  apiKey: "AIzaSyCGs9wy-cXnYAulAOYt2E4V3iyy7I2TP5k",
  authDomain: "login-test-636f7.firebaseapp.com",
  projectId: "login-test-636f7",
  storageBucket: "login-test-636f7.appspot.com",
  messagingSenderId: "404103418382",
  appId: "1:404103418382:web:cd6d5d36c3b0d61c98a25f",
  measurementId: "G-3HPQRH0QJL",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
