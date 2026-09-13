import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Container } from '../../ui/Container/Container';
import { Button } from '../../ui/Button/Button';
import { siteConfig } from '../../../config/siteConfig';
import './Header.css';

export interface HeaderProps {
  onOpenMobileNav: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileNav }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`site-header ${isScrolled ? 'site-header-scrolled' : ''}`}>
      {/* Top Utility Bar */}
      <div className="header-top-bar">
        <Container size="wide">
          <div className="header-top-inner">
            <div className="header-top-left">
              <span className="header-top-item">
                🌿 Botanical & Herbal Procurement Platform
              </span>
              <span className="header-top-item">
                ✉ {siteConfig.contact.email}
              </span>
            </div>
            <div className="header-top-right">
              <Link to="/faq" className="header-top-link">Sourcing FAQ</Link>
              <span>•</span>
              <Link to="/contact" className="header-top-link">Contact</Link>
              <span>•</span>
              <Link to="/admin/login" className="header-top-link" title="Admin Portal">
                🔒 Admin Area
              </Link>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Header Bar */}
      <div className="header-main-bar">
        <Container size="wide">
          <div className="header-main-inner">
            {/* Logo */}
            <Link to="/" className="brand-logo-link" aria-label="Yami Naturals - Home">
              <img
                src={siteConfig.brand.logoPath}
                alt="Yami Naturals"
                className="brand-logo-img"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="desktop-nav" aria-label="Main Navigation">
              <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
                Home
              </NavLink>
              <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                About
              </NavLink>
              <NavLink to="/products" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Products
              </NavLink>
              <NavLink to="/services" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Services
              </NavLink>
              <NavLink to="/b2b-solutions" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                B2B Solutions
              </NavLink>
              <NavLink to="/b2c-solutions" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                B2C Solutions
              </NavLink>
              <NavLink to="/how-it-works" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                How It Works
              </NavLink>
            </nav>

            {/* Actions & Mobile Trigger */}
            <div className="header-actions">
              <Button to="/products" variant="secondary" size="sm">
                Explore Products
              </Button>
              <Button to="/submit-requirement" variant="primary" size="sm">
                Submit Requirement
              </Button>

              <button
                type="button"
                className="mobile-menu-trigger"
                onClick={onOpenMobileNav}
                aria-label="Open Navigation Menu"
                aria-expanded="false"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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
