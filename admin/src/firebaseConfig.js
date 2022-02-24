import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyC-P8ON7JcrKvDeVdYp8RbOBowJvWdbNBo",
  authDomain: "clips-2f906.firebaseapp.com",
  projectId: "clips-2f906",
  storageBucket: "clips-2f906.appspot.com",
  messagingSenderId: "574855457453",
  appId: "1:574855457453:web:b6f60996b113484b24b424",
  measurementId: "G-QH20791RZW",
};

const app = initializeApp(firebaseConfig);
export const Auth = getAuth(app);
