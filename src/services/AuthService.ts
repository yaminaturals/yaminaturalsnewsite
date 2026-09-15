import { AdminUser, AuthSession } from '../types';
import { storageService } from './StorageService';
import { getFirebaseAuth, googleProvider, signInWithPopup, signOut } from '../config/firebase';

export const AUTHORIZED_ADMIN_EMAIL = 'yaminaturals@gmail.com';

export interface IAuthService {
  getSession(): Promise<AuthSession>;
  loginWithGoogle(): Promise<{ success: boolean; session?: AuthSession; error?: string }>;
  logout(): Promise<void>;
  isAuthenticated(): boolean;
}

class AuthService implements IAuthService {
  private sessionKey = 'admin_auth_session';

  private defaultSession: AuthSession = {
    isAuthenticated: false,
    user: null,
    isPrototypeSession: false
  };

  getSession(): Promise<AuthSession> {
    const session = storageService.getItem<AuthSession>(this.sessionKey, this.defaultSession);
    return Promise.resolve(session);
  }

  isAuthenticated(): boolean {
    const session = storageService.getItem<AuthSession>(this.sessionKey, this.defaultSession);
    if (!session || !session.isAuthenticated || !session.user) {
      return false;
    }
    // Strict verify that stored session matches authorized admin
    return session.user.email.toLowerCase().trim() === AUTHORIZED_ADMIN_EMAIL;
  }

  /**
   * Google Sign-In with Firebase Auth
   * Exclusively grants access if authenticated email is yaminaturals@gmail.com
   */
  async loginWithGoogle(): Promise<{ success: boolean; session?: AuthSession; error?: string }> {
    try {
      const activeAuth = getFirebaseAuth();
      if (!activeAuth) {
        return {
          success: false,
          error: 'Firebase project is not configured yet. Please enter your Firebase Web App configuration below to enable Google Authentication.'
        };
      }

      const result = await signInWithPopup(activeAuth, googleProvider);
      const firebaseUser = result.user;
      const authenticatedEmail = firebaseUser.email ? firebaseUser.email.toLowerCase().trim() : '';

      // Strict Authorization Gate
      if (authenticatedEmail !== AUTHORIZED_ADMIN_EMAIL) {
        // Immediately revoke and sign out unauthorized account
        await signOut(activeAuth);
        return {
          success: false,
          error: `Access Denied: Account "${authenticatedEmail}" is not authorized. Only ${AUTHORIZED_ADMIN_EMAIL} can access the Admin Panel.`
        };
      }

      // Construct authorized admin session
      const adminUser: AdminUser = {
        id: firebaseUser.uid,
        email: firebaseUser.email || AUTHORIZED_ADMIN_EMAIL,
        name: firebaseUser.displayName || 'Yami Naturals Admin',
        photoURL: firebaseUser.photoURL || undefined,
        role: 'superadmin',
        lastLogin: new Date().toISOString()
      };

      const newSession: AuthSession = {
        isAuthenticated: true,
        user: adminUser,
        token: await firebaseUser.getIdToken().catch(() => `firebase_token_${Date.now()}`),
        expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
        isPrototypeSession: false
      };

      storageService.setItem(this.sessionKey, newSession);
      return { success: true, session: newSession };
    } catch (err: unknown) {
      const errorObj = err as { code?: string; message?: string };
      console.error('Firebase Google Auth Error:', err);

      if (errorObj.code === 'auth/popup-closed-by-user') {
        return { success: false, error: 'Google sign-in popup was closed before completing.' };
      }
      if (errorObj.code === 'auth/cancelled-popup-request') {
        return { success: false, error: 'Sign-in cancelled. Please try again.' };
      }
      if (errorObj.code === 'auth/unauthorized-domain') {
        return { 
          success: false, 
          error: 'Current domain is not authorized in Firebase Console -> Authentication -> Settings -> Authorized domains. Please add this domain to the list.' 
        };
      }
      if (
        errorObj.code === 'auth/invalid-api-key' || 
        errorObj.code === 'auth/api-key-not-valid.-please-pass-a-valid-api-key.' ||
        errorObj.message?.includes('api-key-not-valid')
      ) {
        return {
          success: false,
          error: 'Invalid Firebase API Key. Please provide a valid Firebase configuration from your Firebase Console.'
        };
      }

      return {
        success: false,
        error: errorObj.message || 'Google Authentication failed. Please try again.'
      };
    }
  }

  async logout(): Promise<void> {
    try {
      const activeAuth = getFirebaseAuth();
      if (activeAuth) {
        await signOut(activeAuth);
      }
    } catch {
      // Ignore signOut cleanup errors
    }
    storageService.removeItem(this.sessionKey);
    return Promise.resolve();
  }
}

export const authService = new AuthService();
