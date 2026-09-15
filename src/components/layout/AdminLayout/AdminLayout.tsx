import React from 'react';
import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom';
import { SEO } from '../../common/SEO';
import { siteConfig } from '../../../config/siteConfig';
import { authService } from '../../../services/AuthService';
import './AdminLayout.css';

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await authService.logout();
    navigate('/admin/login');
  };

  return (
    <div className="admin-shell">
      <SEO
        title="Admin Management Portal"
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
          <NavLink to="/admin/products" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
            <span>🌿 Products</span>
          </NavLink>
          <NavLink to="/admin/categories" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
            <span>📁 Categories</span>
          </NavLink>
          <NavLink to="/admin/requirements" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
            <span>📋 Customer Requirements</span>
          </NavLink>
          <NavLink to="/admin/leads" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
            <span>📩 Leads & Inquiries</span>
          </NavLink>
          <NavLink to="/admin/content" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
            <span>📝 Content Manager</span>
          </NavLink>
          <NavLink to="/admin/media" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
            <span>🖼 Media Gallery</span>
          </NavLink>
          <NavLink to="/admin/settings" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
            <span>⚙ Settings</span>
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
        {/* Prototype Warning Banner */}
        <div className="admin-top-banner">
          <span>
            ⚠️ <strong>PROTOTYPE ARCHITECTURE:</strong> Simulated client-side session active. Production requires server-validated JWT/OAuth authentication.
          </span>
          <Link to="/" style={{ textDecoration: 'underline', color: 'inherit', fontWeight: 'bold' }}>
            Exit to Public Site
          </Link>
        </div>

        {/* Top bar */}
        <header className="admin-top-bar">
          <div>
            <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
              Procurement Management System
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600 }}>
              Admin Operator
            </span>
          </div>
        </header>

        {/* Dynamic Nested Route Viewport */}
        <main className="admin-content-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
