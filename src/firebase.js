// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAwoNoeS3MRbrsUnXwKRKBbhfPInCLwusk",
  authDomain: "bgc-functions.firebaseapp.com",
  projectId: "bgc-functions",
  storageBucket: "bgc-functions.appspot.com",
  messagingSenderId: "640297824173",
  appId: "1:640297824173:web:0154002a4cbdf4a9b7fb24"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export { auth, db, storage };