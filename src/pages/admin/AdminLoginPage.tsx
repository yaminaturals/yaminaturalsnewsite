import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';
import { Card } from '../../components/ui/Card/Card';
import { Button } from '../../components/ui/Button/Button';
import { authService } from '../../services/AuthService';
import { siteConfig } from '../../config/siteConfig';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@yaminaturals.com');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await authService.login({ email, password });
      if (res.success) {
        navigate('/admin/dashboard');
      } else {
        setError(res.error || 'Authentication failed.');
      }
    } catch {
      setError('An error occurred during authentication.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-bg-base)', padding: 'var(--space-6)' }}>
      <SEO
        title="Admin Portal Login"
        noindex={true}
      />
      <div style={{ width: '100%', maxWidth: '440px' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
          <Link to="/">
            <img src={siteConfig.brand.logoPath} alt="Yami Naturals" style={{ height: '48px', margin: '0 auto var(--space-3)' }} />
          </Link>
          <h2>Procurement Desk Admin</h2>
          <p className="text-xs text-muted">Authorized personnel management portal</p>
        </div>

        <Card variant="surface" padding="lg">
          {/* Explicit Prototype Architecture Notice */}
          <div style={{ backgroundColor: 'var(--color-warning-bg)', border: '1px solid var(--color-accent-400)', borderRadius: 'var(--radius-sm)', padding: 'var(--space-3)', marginBottom: 'var(--space-5)', fontSize: 'var(--font-size-xs)', color: 'var(--color-accent-700)' }}>
            ⚠️ <strong>PROTOTYPE MODE:</strong> Simulated client-side session. Use prefilled credentials below to access the administrative dashboard.
          </div>

          {error && (
            <div style={{ backgroundColor: 'var(--color-error-bg)', color: 'var(--color-error)', padding: 'var(--space-3)', borderRadius: 'var(--radius-sm)', marginBottom: 'var(--space-4)', fontSize: 'var(--font-size-xs)' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div>
              <label style={{ display: 'block', fontSize: 'var(--font-size-xs)', fontWeight: 600, marginBottom: 'var(--space-1)' }}>
                Administrator Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: '0.65rem 0.85rem', border: '1px solid var(--color-border-medium)', borderRadius: 'var(--radius-sm)', minHeight: '44px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 'var(--font-size-xs)', fontWeight: 600, marginBottom: 'var(--space-1)' }}>
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '0.65rem 0.85rem', border: '1px solid var(--color-border-medium)', borderRadius: 'var(--radius-sm)', minHeight: '44px' }}
              />
            </div>

            <Button type="submit" variant="primary" size="lg" fullWidth isLoading={isLoading}>
              Sign In to Admin Portal
            </Button>
          </form>

          <div style={{ textAlign: 'center', marginTop: 'var(--space-4)' }}>
            <Link to="/" style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-primary-700)' }}>
              ← Return to Public Website
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};
