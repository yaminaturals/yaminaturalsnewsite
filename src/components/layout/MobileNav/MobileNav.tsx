import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '../../ui/Button/Button';
import { siteConfig } from '../../../config/siteConfig';
import './MobileNav.css';

export interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`mobile-nav-backdrop ${isOpen ? 'open' : ''}`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      {/* Drawer Panel */}
      <aside
        className={`mobile-nav-drawer ${isOpen ? 'open' : ''}`}
        aria-label="Mobile Navigation"
        aria-hidden={!isOpen}
      >
        <div className="mobile-nav-header">
          <img
            src={siteConfig.brand.logoPath}
            alt="Yami Naturals"
            className="mobile-nav-logo"
          />
          <button
            type="button"
            className="mobile-nav-close"
            onClick={onClose}
            aria-label="Close navigation"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="mobile-nav-body">
          <NavLink to="/" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} onClick={onClose} end>
            <span>Home</span>
            <span>→</span>
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} onClick={onClose}>
            <span>About Yami Naturals</span>
            <span>→</span>
          </NavLink>
          <NavLink to="/products" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} onClick={onClose}>
            <span>Explore Products</span>
            <span>→</span>
          </NavLink>
          <NavLink to="/services" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} onClick={onClose}>
            <span>Services & Sourcing</span>
            <span>→</span>
          </NavLink>
          <NavLink to="/b2b-solutions" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} onClick={onClose}>
            <span>B2B Solutions</span>
            <span>→</span>
          </NavLink>
          <NavLink to="/b2c-solutions" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} onClick={onClose}>
            <span>B2C Solutions</span>
            <span>→</span>
          </NavLink>
          <NavLink to="/how-it-works" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} onClick={onClose}>
            <span>How It Works</span>
            <span>→</span>
          </NavLink>
          <NavLink to="/faq" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} onClick={onClose}>
            <span>Procurement FAQ</span>
            <span>→</span>
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} onClick={onClose}>
            <span>Contact</span>
            <span>→</span>
          </NavLink>

          <div className="mobile-nav-divider" />

          <NavLink to="/admin/login" className="mobile-nav-link" onClick={onClose}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              🔒 <span>Admin Portal</span>
            </span>
            <span>→</span>
          </NavLink>
        </div>

        <div className="mobile-nav-footer">
          <Button
            to="/submit-requirement"
            variant="primary"
            fullWidth
            size="lg"
            onClick={onClose}
          >
            Submit Your Requirement
          </Button>

          <div className="mobile-nav-contact-meta">
            <div><strong>Email:</strong> {siteConfig.contact.email}</div>
            <div><strong>Phone:</strong> {siteConfig.contact.phone}</div>
          </div>
        </div>
      </aside>
    </>
  );
};
