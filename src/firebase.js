import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBEqzlkxgewCLc6qKRO6NoMRJzv1C92E-o",
    authDomain: "react-whatsapp-clone-b9841.firebaseapp.com",
    projectId: "react-whatsapp-clone-b9841",
    storageBucket: "react-whatsapp-clone-b9841.appspot.com",
    messagingSenderId: "560852616469",
    appId: "1:560852616469:web:078dbcd945731d4b1dd51c",
    measurementId: "G-5MM2JR0LB9"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;