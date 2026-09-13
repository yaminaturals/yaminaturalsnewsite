import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Container } from '../../ui/Container/Container';
import { Button } from '../../ui/Button/Button';
import { siteConfig } from '../../../config/siteConfig';
import { categoryService } from '../../../services/CategoryService';
import { ProductCategory } from '../../../types';
import './Header.css';

export interface HeaderProps {
  onOpenMobileNav: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileNav }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();

  // Load categories dynamically from CategoryService
  useEffect(() => {
    let isMounted = true;
    categoryService.getCategories().then((cats) => {
      if (isMounted) {
        setCategories(cats);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Close mega-menu on route change
  useEffect(() => {
    setIsProductsOpen(false);
  }, [location.pathname]);

  // Handle sticky header scroll elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle clicks outside the mega-menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProductsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Hover handlers with debounce to prevent flickering
  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsProductsOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsProductsOpen(false);
    }, 200);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsProductsOpen(false);
    }
  };

  // Category botanical icon renderer
  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case 'herbal-powders':
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 2a10 10 0 0 1 10 10c0 5.5-4.5 10-10 10S2 17.5 2 12A10 10 0 0 1 12 2z" />
            <path d="M12 6v12" />
            <path d="M8 10c2-2 6-2 8 0" />
            <path d="M8 14c2 2 6 2 8 0" />
          </svg>
        );
      case 'herbal-extracts':
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M10 2v7.31a2 2 0 0 1-.59 1.41L4.7 15.42A3 3 0 0 0 4 17.55V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1.45a3 3 0 0 0-.7-2.13l-4.71-4.7A2 2 0 0 1 14 9.31V2" />
            <line x1="8.5" y1="2" x2="15.5" y2="2" />
            <line x1="8" y1="14" x2="16" y2="14" />
          </svg>
        );
      case 'natural-oils':
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
          </svg>
        );
      case 'cosmetic-clay-powders':
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9" />
            <path d="M3 12h18" />
            <path d="M12 3v3" />
            <path d="M8 5l1.5 2" />
            <path d="M16 5l-1.5 2" />
          </svg>
        );
      case 'nutraceutical-ingredients':
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
        );
      case 'formula-capsules':
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M13.5 6.5l4 4a4.95 4.95 0 0 1 0 7 4.95 4.95 0 0 1-7 0l-4-4a4.95 4.95 0 0 1 0-7 4.95 4.95 0 0 1 7 0z" />
            <line x1="8.5" y1="11.5" x2="12.5" y2="15.5" />
          </svg>
        );
      default:
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        );
    }
  };

  return (
    <header
      className={`site-header ${isScrolled ? 'site-header-scrolled' : ''}`}
      onKeyDown={handleKeyDown}
    >
      {/* Top Utility Announcement Bar */}
      <div className="header-top-bar">
        <Container size="default">
          <div className="header-top-inner">
            <div className="header-top-left">
              <span className="header-top-tag">
                <span className="header-top-leaf">🌿</span>
                <span>Certified Botanical & Natural Procurement Support</span>
              </span>
              <span className="header-top-divider">•</span>
              <span className="header-top-tag">
                <span>Direct B2B & B2C Sourcing Desk</span>
              </span>
            </div>
            <div className="header-top-right">
              <Link to="/faq" className="header-top-link">
                Procurement FAQ
              </Link>
              <span className="header-top-bullet">•</span>
              <Link to="/contact" className="header-top-link">
                Contact Desk
              </Link>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Sticky Header */}
      <div className="header-main-bar">
        <Container size="default">
          <div className="header-main-inner">
            {/* LEFT: Yami Naturals Brand Logo */}
            <div className="header-brand-wrap">
              <Link to="/" className="brand-logo-link" aria-label="Yami Naturals - Home">
                <img
                  src={siteConfig.brand.logoPath}
                  alt="Yami Naturals"
                  className="brand-logo-img"
                  width="180"
                  height="48"
                  loading="eager"
                />
              </Link>
            </div>

            {/* CENTER: Desktop Navigation */}
            <nav className="desktop-nav" aria-label="Main Navigation">
              <NavLink
                to="/"
                className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}
                end
              >
                HOME
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}
              >
                ABOUT
              </NavLink>

              {/* Products Item with Dropdown / Mega-Menu */}
              <div
                className={`nav-dropdown-wrapper ${isProductsOpen ? 'is-open' : ''}`}
                ref={dropdownRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  className={`nav-item-link nav-dropdown-trigger ${
                    location.pathname.startsWith('/products') ? 'active' : ''
                  }`}
                  aria-expanded={isProductsOpen}
                  aria-haspopup="true"
                  aria-controls="products-mega-menu"
                  onClick={() => setIsProductsOpen(!isProductsOpen)}
                >
                  <span>PRODUCTS</span>
                  <svg
                    className={`nav-dropdown-chevron ${isProductsOpen ? 'rotate' : ''}`}
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {/* Products Mega-Menu Dropdown Panel */}
                <div
                  id="products-mega-menu"
                  className={`mega-menu-panel ${isProductsOpen ? 'visible' : ''}`}
                  role="region"
                  aria-label="Products Categories Mega Menu"
                >
                  <div className="mega-menu-inner">
                    <div className="mega-menu-header">
                      <div>
                        <span className="eyebrow">Natural Catalog</span>
                        <h4 className="mega-menu-title">Botanical & Herbal Categories</h4>
                        <p className="mega-menu-subtitle">
                          Verified whole powders, standardized extracts, cold-pressed oils, mineral clays, and dietary ingredients.
                        </p>
                      </div>
                      <Link
                        to="/products"
                        className="mega-menu-view-all"
                        onClick={() => setIsProductsOpen(false)}
                      >
                        <span>View All Products</span>
                        <span className="arrow-icon">→</span>
                      </Link>
                    </div>

                    <div className="mega-menu-grid">
                      {categories.map((cat) => (
                        <Link
                          key={cat.id}
                          to={`/products?category=${cat.slug}`}
                          className="mega-menu-card"
                          onClick={() => setIsProductsOpen(false)}
                        >
                          <div className="mega-menu-icon-wrap">
                            {getCategoryIcon(cat.slug)}
                          </div>
                          <div className="mega-menu-card-text">
                            <span className="mega-menu-card-name">{cat.name}</span>
                            <span className="mega-menu-card-desc">{cat.shortDescription}</span>
                          </div>
                        </Link>
                      ))}
                    </div>

                    <div className="mega-menu-footer">
                      <span className="mega-menu-footer-hint">
                        💡 Looking for a custom mesh size, marker specification, or private formulation?
                      </span>
                      <Link
                        to="/submit-requirement"
                        className="mega-menu-footer-cta"
                        onClick={() => setIsProductsOpen(false)}
                      >
                        Submit Custom Specification →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <NavLink
                to="/services"
                className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}
              >
                SERVICES
              </NavLink>

              <NavLink
                to="/b2b-solutions"
                className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}
              >
                B2B
              </NavLink>

              <NavLink
                to="/b2c-solutions"
                className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}
              >
                B2C
              </NavLink>

              <NavLink
                to="/how-it-works"
                className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}
              >
                HOW IT WORKS
              </NavLink>

              <NavLink
                to="/contact"
                className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}
              >
                CONTACT
              </NavLink>
            </nav>

            {/* RIGHT: Action CTAs & Mobile Trigger */}
            <div className="header-actions">
              <Button
                to="/products"
                variant="secondary"
                size="sm"
                className="header-cta-secondary hide-tablet"
              >
                Explore Products
              </Button>

              <Button
                to="/submit-requirement"
                variant="primary"
                size="sm"
                className="header-cta-primary"
                iconRight={
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                }
              >
                Submit Your Requirement
              </Button>

              {/* Mobile Menu Hamburger Trigger */}
              <button
                type="button"
                className="mobile-menu-trigger"
                onClick={onOpenMobileNav}
                aria-label="Open navigation drawer"
                aria-expanded="false"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};
