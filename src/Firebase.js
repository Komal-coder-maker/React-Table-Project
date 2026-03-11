import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBW2AGGegjj3KTVxPg2cqBxNLPaUfyj8Yc",
  authDomain: "reacttable-22507.firebaseapp.com",
  projectId: "reacttable-22507",
  storageBucket: "reacttable-22507.firebasestorage.app",
  messagingSenderId: "445548873534",
  appId: "1:445548873534:web:31f0fef981d5d402044e6f",
  measurementId: "G-GEW30YXQVV"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);