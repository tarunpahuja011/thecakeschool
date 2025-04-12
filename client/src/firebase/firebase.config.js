// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAnm4t1mDgCkpXdfeq56Ls3k4ZIUogDb8",
  authDomain: "muslimsaathi-5e794.firebaseapp.com",
  projectId: "muslimsaathi-5e794",
  storageBucket: "muslimsaathi-5e794.appspot.com",
  messagingSenderId: "1061093366114",
  appId: "1:1061093366114:web:32f5fdefba12ffaf2e343b",
  measurementId: "G-XKDCXQ21CT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
