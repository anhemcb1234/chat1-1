// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAImZJGY22PB_Fv-FeN433WJgBvhEApY5g",
    authDomain: "cy-demo-17cdd.firebaseapp.com",
    projectId: "cy-demo-17cdd",
    storageBucket: "cy-demo-17cdd.appspot.com",
    messagingSenderId: "777902188325",
    appId: "1:777902188325:web:7beb6587b44371cd7a5ccc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//firestore database //lưu trữ CSDL
const db = getFirestore(app);
const auth = getAuth(app);
export {db, auth};
