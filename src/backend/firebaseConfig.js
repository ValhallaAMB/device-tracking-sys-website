// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: null,
  authDomain: null,
  databaseURL: null,
  projectId: null,
  storageBucket: null,
  messagingSenderId: null,
  appId: null,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
