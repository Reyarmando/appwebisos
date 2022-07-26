
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from '@firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from 'uuid'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD5DeGilU5Nkh3HSEZccyp6S3oYTdup0rQ",
    authDomain: "react-sis.firebaseapp.com",
    projectId: "react-sis",
    storageBucket: "react-sis.appspot.com",
    messagingSenderId: "71814353156",
    appId: "1:71814353156:web:83eb53c2ebbbfd9dd6c051"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export async function uploadFile(file) {
  const storageRef = ref(storage, `fotos/${file + v4()}`)
  await uploadBytes(storageRef, file)
  const url = await getDownloadURL(storageRef, file)
  return url
}
