export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'superadmin' | 'procurement-manager' | 'viewer';
  lastLogin?: string;
}

export interface AuthSession {
  isAuthenticated: boolean;
  user: AdminUser | null;
  token?: string;
  expiresAt?: number;
  /** Flag clearly indicating whether this session is running under prototype mode or production */
  isPrototypeSession: boolean;
}

export interface LoginCredentials {
  email: string;
  password?: string;
}
