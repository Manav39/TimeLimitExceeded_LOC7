// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjXoLYTUH0jh_bk0lPKwrGpG2Ta54X0Yc",
  authDomain: "sih-tle.firebaseapp.com",
  projectId: "sih-tle",
  storageBucket: "sih-tle.appspot.com",
  messagingSenderId: "331123955779",
  appId: "1:331123955779:web:34a5a090750c13a7bd1cf6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
