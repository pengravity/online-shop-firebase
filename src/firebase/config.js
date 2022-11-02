import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: 'AIzaSyDf768LbbrMC1r8yZH_MkrCm71QRIY7bHU',
  authDomain: 'online-shop-e8bdd.firebaseapp.com',
  projectId: 'online-shop-e8bdd',
  storageBucket: 'online-shop-e8bdd.appspot.com',
  messagingSenderId: '1021312524867',
  appId: '1:1021312524867:web:48161b3c3c60336e836af6',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
