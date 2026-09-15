import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  User, 
  Auth 
} from 'firebase/auth';

// Official Yami Naturals Firebase configuration
export const defaultFirebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBRQCh5OpVF7gMTd9tlhPhcyhYsU6jFaBY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "yami-naturals.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "yami-naturals",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "yami-naturals.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "19260084966",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:19260084966:web:ac492a34ab424d5a5de127"
};

let app: FirebaseApp;
try {
  app = getApps().length > 0 ? getApp() : initializeApp(defaultFirebaseConfig);
} catch {
  app = initializeApp(defaultFirebaseConfig);
}

export const auth: Auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export function getFirebaseAuth(): Auth {
  return auth;
}

export { app, signInWithPopup, signOut, onAuthStateChanged };
export type { User };
