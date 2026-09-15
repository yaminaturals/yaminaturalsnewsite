import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';
import { Card } from '../../components/ui/Card/Card';
import { Button } from '../../components/ui/Button/Button';
import { authService, AUTHORIZED_ADMIN_EMAIL } from '../../services/AuthService';
import { 
  isFirebaseConfigured, 
  getSavedFirebaseConfig, 
  saveFirebaseConfig,
  FirebaseConfigObject 
} from '../../config/firebase';
import { siteConfig } from '../../config/siteConfig';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showConfigModal, setShowConfigModal] = useState(false);
  
  // Firebase config input state
  const [rawSnippet, setRawSnippet] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [authDomain, setAuthDomain] = useState('');
  const [projectId, setProjectId] = useState('');
  const [appId, setAppId] = useState('');
  const [configSuccess, setConfigSuccess] = useState('');

  // If already authenticated with authorized email, redirect to dashboard
  useEffect(() => {
    if (authService.isAuthenticated()) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [navigate]);

  // Load existing config into modal fields if present
  useEffect(() => {
    const existing = getSavedFirebaseConfig();
    if (existing) {
      setApiKey(existing.apiKey || '');
      setAuthDomain(existing.authDomain || '');
      setProjectId(existing.projectId || '');
      setAppId(existing.appId || '');
    }
  }, [showConfigModal]);

  const handleGoogleLogin = async () => {
    setError('');
    
    if (!isFirebaseConfigured()) {
      setShowConfigModal(true);
      setError('Please connect your Firebase project credentials first.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await authService.loginWithGoogle();
      if (res.success) {
        navigate('/admin/dashboard', { replace: true });
      } else {
        setError(res.error || 'Authentication failed.');
        if (res.error?.includes('API key') || res.error?.includes('not configured')) {
          setShowConfigModal(true);
        }
      }
    } catch {
      setError('An unexpected error occurred during Google authentication.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSnippetParse = (snippetText: string) => {
    setRawSnippet(snippetText);
    try {
      // Regex extraction from JS/JSON object
      const extract = (key: string) => {
        const regex = new RegExp(`${key}["']?\\s*:\\s*["']([^"']+)["']`, 'i');
        const match = snippetText.match(regex);
        return match ? match[1] : '';
      };

      const extractedApiKey = extract('apiKey');
      const extractedAuthDomain = extract('authDomain');
      const extractedProjectId = extract('projectId');
      const extractedAppId = extract('appId');

      if (extractedApiKey) setApiKey(extractedApiKey);
      if (extractedAuthDomain) setAuthDomain(extractedAuthDomain);
      if (extractedProjectId) setProjectId(extractedProjectId);
      if (extractedAppId) setAppId(extractedAppId);
    } catch {
      // Ignore parse errors
    }
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey || !authDomain || !projectId) {
      setError('API Key, Auth Domain, and Project ID are required.');
      return;
    }

    const newConfig: FirebaseConfigObject = {
      apiKey: apiKey.trim(),
      authDomain: authDomain.trim(),
      projectId: projectId.trim(),
      appId: appId.trim() || '1:123456789012:web:abcdef123456'
    };

    saveFirebaseConfig(newConfig);
    setConfigSuccess('Firebase configuration saved successfully! You can now sign in with Google.');
    setError('');
    setTimeout(() => {
      setShowConfigModal(false);
      setConfigSuccess('');
    }, 1200);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-bg-base)', padding: 'var(--space-6)' }}>
      <SEO
        title="Admin Panel Login | Yami Naturals"
        noindex={true}
      />
      <div style={{ width: '100%', maxWidth: '460px' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
          <Link to="/" aria-label="Yami Naturals Home">
            <img 
              src={siteConfig.brand.logoPath} 
              alt="Yami Naturals" 
              style={{ 
                height: '75px', 
                width: 'auto', 
                maxWidth: '280px', 
                margin: '0 auto var(--space-4)', 
                display: 'block', 
                objectFit: 'contain' 
              }} 
            />
          </Link>
          <h1 style={{ fontFamily: 'var(--font-heading, "Playfair Display", serif)', fontSize: '2.1rem', color: 'var(--color-primary-900)', fontWeight: 700, margin: 0 }}>
            Admin Panel
          </h1>
        </div>

        <Card variant="surface" padding="lg">
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.75rem', 
            padding: '0.85rem 1rem', 
            backgroundColor: 'rgba(21, 57, 41, 0.05)', 
            border: '1px solid rgba(21, 57, 41, 0.12)', 
            borderRadius: 'var(--radius-md)', 
            marginBottom: 'var(--space-5)' 
          }}>
            <span style={{ fontSize: '1.25rem' }}>🔒</span>
            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-primary-900)', lineHeight: 1.4 }}>
              <strong>Authorized Google Authentication</strong>
              <div style={{ color: 'var(--color-text-muted)', fontSize: '0.74rem', marginTop: '2px' }}>
                Sign in with <strong>{AUTHORIZED_ADMIN_EMAIL}</strong> to manage requirements, products, and leads.
              </div>
            </div>
          </div>

          {error && (
            <div style={{ 
              backgroundColor: 'var(--color-error-bg)', 
              color: 'var(--color-error)', 
              padding: 'var(--space-3)', 
              borderRadius: 'var(--radius-sm)', 
              marginBottom: 'var(--space-4)', 
              fontSize: 'var(--font-size-xs)',
              lineHeight: 1.4,
              border: '1px solid rgba(220, 38, 38, 0.2)'
            }}>
              ⚠️ {error}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                padding: '0.85rem 1.25rem',
                backgroundColor: '#ffffff',
                color: '#3c4043',
                border: '1px solid #dadce0',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: isLoading ? 'not-allowed' : 'pointer',
                boxShadow: '0 1px 3px rgba(60,64,67,0.08)',
                transition: 'all var(--duration-fast) ease',
                minHeight: '48px'
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = '#f8f9fa';
                  e.currentTarget.style.boxShadow = '0 2px 6px rgba(60,64,67,0.15)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(60,64,67,0.08)';
                }
              }}
            >
              {isLoading ? (
                <span>Authenticating with Google...</span>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                  </svg>
                  <span>Sign in with Google</span>
                </>
              )}
            </button>

            {/* Quick Firebase Connection Toggle */}
            <button
              type="button"
              onClick={() => setShowConfigModal(!showConfigModal)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-primary-700)',
                fontSize: '0.76rem',
                cursor: 'pointer',
                textAlign: 'center',
                padding: '0.25rem',
                textDecoration: 'underline'
              }}
            >
              {isFirebaseConfigured() ? '⚙ Update Firebase Project Keys' : '⚙ Connect Firebase Project Credentials'}
            </button>
          </div>

          {/* Config Setup Drawer */}
          {showConfigModal && (
            <div style={{ 
              marginTop: 'var(--space-4)', 
              padding: 'var(--space-4)', 
              backgroundColor: '#f8faf9', 
              border: '1px solid var(--color-border-medium)', 
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--font-size-xs)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                <strong style={{ color: 'var(--color-primary-900)' }}>Firebase Project Setup</strong>
                <button 
                  type="button" 
                  onClick={() => setShowConfigModal(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}
                >
                  ✕
                </button>
              </div>

              {configSuccess && (
                <div style={{ backgroundColor: 'var(--color-success-bg, #dcfce7)', color: 'var(--color-success, #166534)', padding: '0.5rem', borderRadius: '4px', marginBottom: '0.75rem' }}>
                  ✓ {configSuccess}
                </div>
              )}

              <p style={{ color: 'var(--color-text-muted)', marginBottom: '0.75rem', lineHeight: 1.4 }}>
                Paste the <code>firebaseConfig</code> object from your <a href="https://console.firebase.google.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary-700)', textDecoration: 'underline' }}>Firebase Console</a>:
              </p>

              <textarea
                placeholder={`const firebaseConfig = {\n  apiKey: "AIzaSy...",\n  authDomain: "...",\n  projectId: "..."\n};`}
                value={rawSnippet}
                onChange={(e) => handleSnippetParse(e.target.value)}
                rows={3}
                style={{
                  width: '100%',
                  fontFamily: 'monospace',
                  fontSize: '0.72rem',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  border: '1px solid var(--color-border-medium)',
                  marginBottom: '0.75rem'
                }}
              />

              <form onSubmit={handleSaveConfig} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.70rem', marginBottom: '2px' }}>API Key *</label>
                  <input
                    type="text"
                    required
                    placeholder="AIzaSy..."
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    style={{ width: '100%', padding: '0.4rem 0.6rem', border: '1px solid var(--color-border-medium)', borderRadius: '4px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.70rem', marginBottom: '2px' }}>Auth Domain *</label>
                  <input
                    type="text"
                    required
                    placeholder="your-project.firebaseapp.com"
                    value={authDomain}
                    onChange={(e) => setAuthDomain(e.target.value)}
                    style={{ width: '100%', padding: '0.4rem 0.6rem', border: '1px solid var(--color-border-medium)', borderRadius: '4px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.70rem', marginBottom: '2px' }}>Project ID *</label>
                  <input
                    type="text"
                    required
                    placeholder="your-project-id"
                    value={projectId}
                    onChange={(e) => setProjectId(e.target.value)}
                    style={{ width: '100%', padding: '0.4rem 0.6rem', border: '1px solid var(--color-border-medium)', borderRadius: '4px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.70rem', marginBottom: '2px' }}>App ID (optional)</label>
                  <input
                    type="text"
                    placeholder="1:123456789012:web:abcdef..."
                    value={appId}
                    onChange={(e) => setAppId(e.target.value)}
                    style={{ width: '100%', padding: '0.4rem 0.6rem', border: '1px solid var(--color-border-medium)', borderRadius: '4px' }}
                  />
                </div>

                <div style={{ marginTop: '0.5rem' }}>
                  <Button type="submit" variant="primary" size="sm" fullWidth>
                    Save & Activate Firebase
                  </Button>
                </div>
              </form>
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: 'var(--space-5)' }}>
            <Link to="/" style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-primary-700)', textDecoration: 'none' }}>
              ← Return to Public Website
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};
