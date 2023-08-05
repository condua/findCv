import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import firebase from 'firebase/app';
import 'firebase/storage';
const firebaseConfig = {
    apiKey: "AIzaSyDq3xyLBeWfn42RDdVpVnqafwHPdagpefo",
    authDomain: "uploading-1efe9.firebaseapp.com",
    projectId: "uploading-1efe9",
    storageBucket: "uploading-1efe9.appspot.com",
    messagingSenderId: "969376119504",
    appId: "1:969376119504:web:0bd8506b2862b670dfbcd5"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);