import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Button } from '../../ui/Button/Button';
import { siteConfig } from '../../../config/siteConfig';
import { categoryService } from '../../../services/CategoryService';
import { ProductCategory } from '../../../types';
import './MobileNav.css';

export interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const [isProductsExpanded, setIsProductsExpanded] = useState(false);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  // Subscribe to dynamic categories from CategoryService
  useEffect(() => {
    const unsubscribe = categoryService.subscribe((cats) => {
      setCategories(cats);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // Open accordion if current route is within products or testDrawer is active
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (location.pathname.startsWith('/products') || params.get('testDrawer') === 'true') {
      setIsProductsExpanded(true);
    }
  }, [location.pathname, location.search]);

  // Lock background scroll when drawer is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      // Focus close button on open
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  // Handle ESC key to dismiss drawer
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
      {/* Dimmed Backdrop */}
      <div
        className={`mobile-nav-backdrop ${isOpen ? 'open' : ''}`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      {/* Slide-in Navigation Drawer */}
      <aside
        className={`mobile-nav-drawer ${isOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
        aria-hidden={!isOpen}
      >
        {/* Drawer Header */}
        <div className="mobile-nav-header">
          <Link to="/" onClick={onClose} aria-label="Yami Naturals Home">
            <img
              src={siteConfig.brand.logoPath}
              alt="Yami Naturals"
              className="mobile-nav-logo"
              width="150"
              height="38"
            />
          </Link>
          <button
            ref={closeButtonRef}
            type="button"
            className="mobile-nav-close touch-target"
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Navigation Links with Products Accordion */}
        <nav className="mobile-nav-body" aria-label="Mobile Menu Links">
          <NavLink
            to="/"
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            onClick={onClose}
            end
          >
            <span>Home</span>
            <span className="mobile-nav-arrow" aria-hidden="true">→</span>
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            onClick={onClose}
          >
            <span>About</span>
            <span className="mobile-nav-arrow" aria-hidden="true">→</span>
          </NavLink>

          {/* Accessible Products Accordion Item */}
          <div className="mobile-accordion-group">
            <button
              type="button"
              className={`mobile-nav-link mobile-accordion-trigger ${
                isProductsExpanded ? 'expanded' : ''
              }`}
              onClick={() => setIsProductsExpanded(!isProductsExpanded)}
              aria-expanded={isProductsExpanded}
              aria-controls="mobile-products-accordion"
            >
              <span className="mobile-accordion-title">Products</span>
              <span className="mobile-accordion-indicator" aria-hidden="true">
                {isProductsExpanded ? '−' : '+'}
              </span>
            </button>

            {/* Expandable Accordion Panel */}
            <div
              id="mobile-products-accordion"
              className={`mobile-accordion-content ${isProductsExpanded ? 'open' : ''}`}
              role="region"
              aria-label="Products Subcategories"
            >
              <div className="mobile-accordion-inner">
                <Link
                  to="/products"
                  className="mobile-sublink mobile-sublink-all"
                  onClick={onClose}
                >
                  <span>🌿 View All Products</span>
                  <span className="mobile-sublink-arrow">→</span>
                </Link>

                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/products?category=${cat.slug}`}
                    className="mobile-sublink"
                    onClick={onClose}
                  >
                    <span>{cat.name}</span>
                    <span className="mobile-sublink-count">({cat.productCount})</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <NavLink
            to="/services"
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            onClick={onClose}
          >
            <span>Services</span>
            <span className="mobile-nav-arrow" aria-hidden="true">→</span>
          </NavLink>

          <NavLink
            to="/b2b-solutions"
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            onClick={onClose}
          >
            <span>B2B Solutions</span>
            <span className="mobile-nav-arrow" aria-hidden="true">→</span>
          </NavLink>

          <NavLink
            to="/b2c-solutions"
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            onClick={onClose}
          >
            <span>B2C Solutions</span>
            <span className="mobile-nav-arrow" aria-hidden="true">→</span>
          </NavLink>

          <NavLink
            to="/how-it-works"
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            onClick={onClose}
          >
            <span>How It Works</span>
            <span className="mobile-nav-arrow" aria-hidden="true">→</span>
          </NavLink>

          <NavLink
            to="/faq"
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            onClick={onClose}
          >
            <span>FAQ</span>
            <span className="mobile-nav-arrow" aria-hidden="true">→</span>
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            onClick={onClose}
          >
            <span>Contact</span>
            <span className="mobile-nav-arrow" aria-hidden="true">→</span>
          </NavLink>
        </nav>

        {/* Drawer CTAs & Metadata */}
        <div className="mobile-nav-footer">
          <div className="mobile-nav-cta-stack">
            <Button
              to="/submit-requirement"
              variant="primary"
              fullWidth
              size="lg"
              onClick={onClose}
              iconRight={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              }
            >
              Submit Your Requirement
            </Button>

            <Button
              to="/products"
              variant="secondary"
              fullWidth
              size="md"
              onClick={onClose}
            >
              Explore Products
            </Button>
          </div>

          <div className="mobile-nav-contact-meta">
            <div className="mobile-meta-item">
              <span className="mobile-meta-label">Procurement Desk:</span>
              <span className="mobile-meta-value">{siteConfig.contact.email}</span>
            </div>
            <div className="mobile-meta-item">
              <span className="mobile-meta-label">Support Line:</span>
              <span className="mobile-meta-value">{siteConfig.contact.phone}</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
