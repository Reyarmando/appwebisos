// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';
import { getFirestore } from '@firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBuT9jG8UZTFceaZeW3E6gwVKor3TSSV1A",
    authDomain: "appwebisos.firebaseapp.com",
    projectId: "appwebisos",
    storageBucket: "appwebisos.appspot.com",
    messagingSenderId: "655447694051",
    appId: "1:655447694051:web:c7bad87e54647db3e243d6",
    measurementId: "G-TMLXL0S73Q"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);