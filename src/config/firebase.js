// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAXr6lwpFghHHODzn_BgGyPXq1nTBv8z7U",
    authDomain: "moviesinfo-54517.firebaseapp.com",
    projectId: "moviesinfo-54517",
    storageBucket: "moviesinfo-54517.appspot.com",
    messagingSenderId: "808748974005",
    appId: "1:808748974005:web:db967311aa66c0ebc463fc",
    measurementId: "G-F04Q8XQHRE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);