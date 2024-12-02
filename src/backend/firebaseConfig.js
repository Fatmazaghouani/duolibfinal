import { initializeApp } from '@firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from '@firebase/auth';
import { getFirestore } from '@firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyBDHtAhlYcMgSBXeY0sRnA7zxESKa8HilQ",
  authDomain: "duolib-7b3d1.firebaseapp.com",
  projectId: "duolib-7b3d1",
  storageBucket: "duolib-7b3d1.appspot.com",
  messagingSenderId: "1011822483466",
  appId: "1:1011822483466:web:c546edfff6e8c215cba7f3",
  measurementId: "G-RXT8D02XMY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Initialize Firestore
const db = getFirestore(app);

export { auth, db };
