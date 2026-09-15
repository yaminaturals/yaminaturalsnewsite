export interface AdminUser {
  id: string;
  email: string;
  name: string;
  photoURL?: string;
  role: 'superadmin' | 'procurement-manager' | 'viewer';
  lastLogin?: string;
}

export interface AuthSession {
  isAuthenticated: boolean;
  user: AdminUser | null;
  token?: string;
  expiresAt?: number;
  isPrototypeSession: boolean;
}

export interface LoginCredentials {
  email: string;
  password?: string;
}
