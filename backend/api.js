// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getFirestore, collection, getDocs, setDoc, doc } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfIy85p1fGmZwdfSacgFGic2Htzu2-YgM",
  authDomain: "fasc-ec621.firebaseapp.com",
  projectId: "fasc-ec621",
  storageBucket: "fasc-ec621.appspot.com",
  messagingSenderId: "885995656780",
  appId: "1:885995656780:web:07beae9e0c1c0a401186e9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);