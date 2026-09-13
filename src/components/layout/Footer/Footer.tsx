import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../ui/Container/Container';
import { siteConfig } from '../../../config/siteConfig';
import './Footer.css';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <Container size="wide">
        <div className="footer-grid">
          {/* Brand & Purpose */}
          <div className="footer-brand-col">
            <Link to="/" aria-label="Yami Naturals Home">
              <img
                src={siteConfig.brand.logoPath}
                alt="Yami Naturals"
                className="footer-logo"
              />
            </Link>
            <p className="footer-tagline">
              Dedicated procurement and product-support platform for herbal powders, standardized extracts, carrier oils, cosmetic clays, and custom formulation capsules.
            </p>
            <div className="footer-placeholder-note">
              * Non-commercial procurement portal — no online payments or checkout.
            </div>
          </div>

          {/* Product Categories */}
          <div>
            <h4 className="footer-col-title">Categories</h4>
            <ul className="footer-links-list">
              <li><Link to="/products" className="footer-link">Herbal Powders</Link></li>
              <li><Link to="/products" className="footer-link">Herbal Extracts</Link></li>
              <li><Link to="/products" className="footer-link">Natural & Essential Oils</Link></li>
              <li><Link to="/products" className="footer-link">Cosmetic Clay Powders</Link></li>
              <li><Link to="/products" className="footer-link">Nutraceutical Ingredients</Link></li>
              <li><Link to="/products" className="footer-link">Formula Capsules</Link></li>
            </ul>
          </div>

          {/* Sourcing & Solutions */}
          <div>
            <h4 className="footer-col-title">Sourcing</h4>
            <ul className="footer-links-list">
              <li><Link to="/b2b-solutions" className="footer-link">B2B Procurement</Link></li>
              <li><Link to="/b2c-solutions" className="footer-link">B2C Retail Supply</Link></li>
              <li><Link to="/services" className="footer-link">Formulation Services</Link></li>
              <li><Link to="/how-it-works" className="footer-link">How It Works</Link></li>
              <li><Link to="/submit-requirement" className="footer-link">Submit Requirement</Link></li>
              <li><Link to="/faq" className="footer-link">Procurement FAQ</Link></li>
            </ul>
          </div>

          {/* Contact & Inquiries */}
          <div>
            <h4 className="footer-col-title">Direct Procurement</h4>
            <div className="footer-contact-box">
              <div className="footer-contact-item">
                <span className="footer-contact-label">Inquiry Email</span>
                <span>{siteConfig.contact.email}</span>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-label">Telephone</span>
                <span>{siteConfig.contact.phone}</span>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-label">Warehouse / Office</span>
                <span>{siteConfig.contact.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-bottom-inner">
            <div>
              © {currentYear} {siteConfig.brand.name}. All rights reserved.
            </div>
            <div className="footer-legal-links">
              <Link to="/privacy-policy" className="footer-link">Privacy Policy</Link>
              <span>•</span>
              <Link to="/terms-conditions" className="footer-link">Terms & Conditions</Link>
              <span>•</span>
              <Link to="/admin/login" className="footer-link">Admin Access</Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};
