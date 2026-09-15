import { AdminUser, AuthSession } from '../types';
import { storageService } from './StorageService';
import { auth, googleProvider, signInWithPopup, signOut } from '../config/firebase';

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
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;
      const authenticatedEmail = firebaseUser.email ? firebaseUser.email.toLowerCase().trim() : '';

      // Strict Authorization Gate
      if (authenticatedEmail !== AUTHORIZED_ADMIN_EMAIL) {
        // Immediately revoke and sign out unauthorized account
        await signOut(auth);
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
          error: 'Current domain is not whitelisted in Firebase Console Authentication settings.' 
        };
      }
      if (errorObj.code === 'auth/invalid-api-key' || errorObj.code === 'auth/api-key-not-valid.pleas') {
        return {
          success: false,
          error: 'Firebase API key needs to be configured in environment variables (VITE_FIREBASE_API_KEY).'
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
      await signOut(auth);
    } catch {
      // Ignore signOut cleanup errors
    }
    storageService.removeItem(this.sessionKey);
    return Promise.resolve();
  }
}

export const authService = new AuthService();
