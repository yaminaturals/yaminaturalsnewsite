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

// Firebase configuration using Vite environment variables with sensible defaults
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyDummyKeyForYamiNaturalsProdAuth',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'yaminaturals-auth.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'yaminaturals-auth',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'yaminaturals-auth.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '123456789012',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:123456789012:web:abcdef1234567890'
};

let app: FirebaseApp;
try {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
} catch {
  app = initializeApp(firebaseConfig);
}

export const auth: Auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export { signInWithPopup, signOut, onAuthStateChanged };
export type { User };
