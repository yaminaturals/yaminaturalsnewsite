import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../ui/Container/Container';
import { siteConfig } from '../../../config/siteConfig';
import './Footer.css';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer" role="contentinfo">
      <Container size="default">
        <div className="footer-grid">
          {/* Brand & Neutral Mission Description */}
          <div className="footer-brand-col">
            <Link to="/" className="footer-logo-link" aria-label="Yami Naturals Home">
              <img
                src={siteConfig.brand.logoPath}
                alt="Yami Naturals"
                className="footer-logo"
                width="160"
                height="42"
                loading="lazy"
              />
            </Link>
            <p className="footer-tagline">
              Specialized procurement and product-support platform for herbal powders, standardized extracts, natural carrier oils, cosmetic clays, and custom formulation ingredients.
            </p>
            <div className="footer-neutral-badge">
              * Dedicated requirement submission & direct sourcing platform — no online shopping cart or direct payment processing.
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <p className="footer-col-title">Quick Links</p>
            <ul className="footer-links-list">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/products" className="footer-link">Products / Brochure</Link></li>
              <li><Link to="/partnership" className="footer-link">Partnership</Link></li>
              <li><Link to="/why-yami-naturals" className="footer-link">Why Yami Naturals</Link></li>
              <li><Link to="/about" className="footer-link">About</Link></li>
              <li><Link to="/contact" className="footer-link">Contact</Link></li>
            </ul>
          </div>

          {/* Products */}
          <div className="footer-col">
            <p className="footer-col-title">Products</p>
            <ul className="footer-links-list">
              <li><Link to="/products?category=herbal-powders" className="footer-link">Herbal Powders</Link></li>
              <li><Link to="/products?category=herbal-extracts" className="footer-link">Herbal Extracts</Link></li>
              <li><Link to="/products?category=natural-oils" className="footer-link">Natural Oils</Link></li>
              <li><Link to="/products?category=cosmetic-clay-powders" className="footer-link">Cosmetic Clays</Link></li>
              <li><Link to="/products?category=nutraceutical-ingredients" className="footer-link">Nutraceutical Ingredients</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-col">
            <p className="footer-col-title">Support</p>
            <ul className="footer-links-list">
              <li><Link to="/submit-requirement" className="footer-link">Submit Requirement</Link></li>
              <li><Link to="/faq" className="footer-link">FAQ</Link></li>
              <li><Link to="/privacy-policy" className="footer-link">Privacy Policy</Link></li>
              <li><Link to="/terms-conditions" className="footer-link">Terms</Link></li>
              <li><Link to="/admin/login" className="footer-link footer-admin-link">🔒 Admin Portal</Link></li>
            </ul>
          </div>

          {/* Contact Section with Neutral Placeholders */}
          <div className="footer-col footer-contact-col">
            <p className="footer-col-title">Contact</p>
            <div className="footer-contact-box">
              <div className="footer-contact-item">
                <span className="footer-contact-label">Procurement Email</span>
                <span className="footer-contact-val">{siteConfig.contact.email}</span>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-label">Telephone</span>
                <span className="footer-contact-val">{siteConfig.contact.phone}</span>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-label">Facility / Office</span>
                <span className="footer-contact-val">{siteConfig.contact.address}</span>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-label">Working Hours</span>
                <span className="footer-contact-val">{siteConfig.contact.businessHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-bottom-inner">
            <div className="footer-copyright">
              © {currentYear} {siteConfig.brand.name}. All rights reserved.
            </div>
            <div className="footer-legal-links">
              <Link to="/privacy-policy" className="footer-legal-link">Privacy Policy</Link>
              <span className="footer-legal-divider">•</span>
              <Link to="/terms-conditions" className="footer-legal-link">Terms of Service</Link>
              <span className="footer-legal-divider">•</span>
              <span className="footer-legal-note">Sourcing & Evaluation Purposes Only</span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};
