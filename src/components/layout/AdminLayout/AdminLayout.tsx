import React, { useEffect, useState } from 'react';
import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom';
import { SEO } from '../../common/SEO';
import { siteConfig } from '../../../config/siteConfig';
import { authService, AUTHORIZED_ADMIN_EMAIL } from '../../../services/AuthService';
import { AdminUser } from '../../../types';
import { BackToTop } from '../../common/BackToTop';
import './AdminLayout.css';

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/admin/login', { replace: true });
      return;
    }

    authService.getSession().then((session) => {
      if (!session.isAuthenticated || !session.user || session.user.email.toLowerCase().trim() !== AUTHORIZED_ADMIN_EMAIL) {
        navigate('/admin/login', { replace: true });
      } else {
        setCurrentUser(session.user);
      }
    });
  }, [navigate]);

  const handleLogout = async () => {
    await authService.logout();
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="admin-shell">
      <SEO
        title="Admin Panel | Yami Naturals"
        noindex={true}
      />
      {/* Sidebar */}
      <aside className="admin-sidebar" aria-label="Admin Navigation">
        <div className="admin-sidebar-brand">
          <Link to="/admin/dashboard">
            <img
              src={siteConfig.brand.logoPath}
              alt="Yami Naturals Admin"
              className="admin-sidebar-logo"
            />
          </Link>
        </div>

        <nav className="admin-sidebar-nav">
          <NavLink to="/admin/dashboard" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
            <span>📊 Dashboard</span>
          </NavLink>
          <NavLink to="/admin/requirements" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
            <span>📋 Customer RFQs</span>
          </NavLink>
          <NavLink to="/admin/leads" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
            <span>📩 Leads & Inquiries</span>
          </NavLink>
          <NavLink to="/admin/products" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
            <span>🌿 Product Catalog</span>
          </NavLink>
          <NavLink to="/admin/categories" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
            <span>📁 Categories</span>
          </NavLink>
          <NavLink to="/admin/settings" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
            <span>⚙ Brand & Settings</span>
          </NavLink>
        </nav>

        <div className="admin-sidebar-footer">
          <Link to="/" className="admin-nav-item" target="_blank" rel="noopener noreferrer">
            <span>🌐 View Public Website</span>
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="admin-nav-item"
            style={{ background: 'none', border: 'none', width: '100%', cursor: 'pointer', textAlign: 'left' }}
          >
            <span>🚪 Logout</span>
          </button>
        </div>
      </aside>

      {/* Content Area */}
      <div className="admin-main">
        {/* Top bar */}
        <header className="admin-top-bar">
          <div>
            <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--color-primary-900)' }}>
              Yami Naturals Admin Panel
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            {currentUser?.photoURL && (
              <img 
                src={currentUser.photoURL} 
                alt="Profile" 
                style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} 
              />
            )}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', lineHeight: 1.2 }}>
              <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--color-primary-900)' }}>
                {currentUser?.name || 'Yami Naturals Admin'}
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
                {currentUser?.email || AUTHORIZED_ADMIN_EMAIL}
              </span>
            </div>
          </div>
        </header>

        {/* Dynamic Nested Route Viewport */}
        <main className="admin-content-area">
          <Outlet />
        </main>
        <BackToTop />
      </div>
    </div>
  );
};
