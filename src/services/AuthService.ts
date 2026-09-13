import { AdminUser, AuthSession, LoginCredentials } from '../types';
import { storageService } from './StorageService';

export interface IAuthService {
  getSession(): Promise<AuthSession>;
  login(credentials: LoginCredentials): Promise<{ success: boolean; session?: AuthSession; error?: string }>;
  logout(): Promise<void>;
  isAuthenticated(): boolean;
}

/**
 * AuthService
 * 
 * SECURITY ARCHITECTURE NOTICE:
 * This is a PROTOTYPE authentication implementation provided solely for front-end demonstration,
 * testing of protected admin routes, and UI validation.
 * 
 * WARNING:
 * Client-side session simulation or LocalStorage credential checks MUST NOT be treated as secure
 * production authentication.
 * 
 * In production:
 * - This class must be swapped with a server-validated OAuth 2.0 / OIDC / JWT / Supabase Auth provider.
 * - Authentication state will be governed by HTTP-only, secure, SameSite cookies or short-lived Bearer tokens.
 * - The IAuthService interface guarantees zero changes to admin UI pages when transitioning.
 */
class AuthService implements IAuthService {
  private sessionKey = 'admin_auth_session';

  private defaultSession: AuthSession = {
    isAuthenticated: false,
    user: null,
    isPrototypeSession: true
  };

  getSession(): Promise<AuthSession> {
    const session = storageService.getItem<AuthSession>(this.sessionKey, this.defaultSession);
    return Promise.resolve(session);
  }

  isAuthenticated(): boolean {
    const session = storageService.getItem<AuthSession>(this.sessionKey, this.defaultSession);
    return session.isAuthenticated;
  }

  async login(credentials: LoginCredentials): Promise<{ success: boolean; session?: AuthSession; error?: string }> {
    // Basic validation
    if (!credentials.email || !credentials.email.includes('@')) {
      return { success: false, error: 'Please provide a valid administrator email.' };
    }

    // Prototype Simulation Check
    // Default demo email: admin@yaminaturals.com
    const mockUser: AdminUser = {
      id: 'usr-admin-01',
      email: credentials.email,
      name: 'Yami Procurement Admin',
      role: 'superadmin',
      lastLogin: new Date().toISOString()
    };

    const newSession: AuthSession = {
      isAuthenticated: true,
      user: mockUser,
      token: `proto_jwt_${Date.now()}`,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000,
      isPrototypeSession: true
    };

    storageService.setItem(this.sessionKey, newSession);
    return { success: true, session: newSession };
  }

  async logout(): Promise<void> {
    storageService.removeItem(this.sessionKey);
    return Promise.resolve();
  }
}

export const authService = new AuthService();
