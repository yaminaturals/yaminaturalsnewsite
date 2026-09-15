import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  User, 
  Auth 
} from 'firebase/auth';

export interface FirebaseConfigObject {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId: string;
}

const STORAGE_KEY = 'yami_firebase_config';

export function getSavedFirebaseConfig(): FirebaseConfigObject | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.apiKey && parsed.authDomain && parsed.projectId) {
        return parsed;
      }
    }
  } catch {
    // Ignore JSON parse errors
  }

  // Fallback to Vite env variables if valid
  if (
    import.meta.env.VITE_FIREBASE_API_KEY && 
    !import.meta.env.VITE_FIREBASE_API_KEY.includes('DummyKey')
  ) {
    return {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'yaminaturals.firebaseapp.com',
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'yaminaturals',
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
      appId: import.meta.env.VITE_FIREBASE_APP_ID || ''
    };
  }

  return null;
}

export function saveFirebaseConfig(config: FirebaseConfigObject): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  initFirebase();
}

export function isFirebaseConfigured(): boolean {
  return getSavedFirebaseConfig() !== null;
}

let app: FirebaseApp | null = null;
let auth: Auth | null = null;

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export function initFirebase(): { app: FirebaseApp; auth: Auth } | null {
  const config = getSavedFirebaseConfig();
  if (!config || !config.apiKey || config.apiKey.includes('DummyKey')) {
    return null;
  }

  try {
    const apps = getApps();
    if (apps.length > 0) {
      app = apps[0];
    } else {
      app = initializeApp(config);
    }
    auth = getAuth(app);
    return { app, auth };
  } catch (err) {
    console.error('Failed to initialize Firebase with current config:', err);
    return null;
  }
}

// Initial setup attempt
initFirebase();

export function getFirebaseAuth(): Auth | null {
  if (!auth) {
    const initialized = initFirebase();
    if (initialized) {
      return initialized.auth;
    }
  }
  return auth;
}

export { app, auth, signInWithPopup, signOut, onAuthStateChanged };
export type { User };
