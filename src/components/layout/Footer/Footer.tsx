import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../ui/Container/Container';
import { siteConfig } from '../../../config/siteConfig';
import { categoryService } from '../../../services/CategoryService';
import { ProductCategory } from '../../../types';
import { initialCategories } from '../../../data/categories.data';
import { visitorCounterService } from '../../../services/VisitorCounterService';
import './Footer.css';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [categories, setCategories] = useState<ProductCategory[]>(initialCategories);
  const [visitorCount, setVisitorCount] = useState<number>(1);

  useEffect(() => {
    // Record real visit on mount
    const count = visitorCounterService.recordVisit();
    setVisitorCount(count);

    // Load dynamic categories
    const loadCategories = async () => {
      try {
        const fetched = await categoryService.getCategories();
        if (fetched && fetched.length > 0) {
          setCategories(fetched);
        }
      } catch {
        setCategories(initialCategories);
      }
    };
    loadCategories();
  }, []);

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
                width="220"
                height="65"
                loading="lazy"
              />
            </Link>
            <p className="footer-tagline">
              Yami Naturals manufactures herbal and natural products while connecting businesses and individuals with the solutions they need. We bridge the journey from your requirement to its fulfillment, with a focus on finding the right product and sourcing path.
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
              <li><Link to="/products" className="footer-link">Product Catalogue</Link></li>
              <li><Link to="/partnership" className="footer-link">Partnership</Link></li>
              <li><Link to="/private-labelling" className="footer-link">Private Labelling</Link></li>
              <li><Link to="/why-yami-naturals" className="footer-link">Why Yami Naturals</Link></li>
              <li><Link to="/about" className="footer-link">About</Link></li>
              <li><Link to="/career" className="footer-link">Career</Link></li>
              <li><Link to="/contact" className="footer-link">Contact</Link></li>
            </ul>
          </div>

          {/* Product Categories */}
          <div className="footer-col">
            <p className="footer-col-title">Product Categories</p>
            <ul className="footer-links-list">
              {categories.map((cat) => (
                <li key={cat.id || cat.slug}>
                  <Link to={`/products?category=${cat.slug}`} className="footer-link">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="footer-col">
            <p className="footer-col-title">Support</p>
            <ul className="footer-links-list">
              <li><Link to="/submit-requirement" className="footer-link">Submit Requirement</Link></li>
              <li><Link to="/faq" className="footer-link">FAQ</Link></li>
              <li><Link to="/privacy-policy" className="footer-link">Privacy Policy</Link></li>
              <li><Link to="/terms-conditions" className="footer-link">Terms & Conditions</Link></li>
              <li><Link to="/shipping-policy" className="footer-link">Shipping Policy</Link></li>
              <li><Link to="/admin/login" className="footer-link footer-admin-link">🔒 Admin Login</Link></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="footer-col footer-contact-col">
            <p className="footer-col-title">Contact</p>
            <div className="footer-contact-box">
              <div className="footer-contact-item">
                <span className="footer-contact-label">Company Name:</span>
                <span className="footer-contact-val">{siteConfig.contact.companyName || 'Yami Naturals'}</span>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-label">Email Id:</span>
                <a href={`mailto:${siteConfig.contact.email}`} className="footer-contact-val footer-contact-link">
                  {siteConfig.contact.email}
                </a>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-label">Address:</span>
                <span className="footer-contact-val">{siteConfig.contact.address}</span>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-label">Google Map Link:</span>
                <a 
                  href={siteConfig.contact.googleMapsUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="footer-contact-val footer-map-link"
                >
                  📍 View Location on Google Maps ↗
                </a>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-label">Working Hours:</span>
                <span className="footer-contact-val">{siteConfig.contact.businessHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Real Visitor Counter */}
        <div className="footer-bottom-bar">
          <div className="footer-bottom-inner">
            <div className="footer-copyright">
              © {currentYear} {siteConfig.brand.name}. All rights reserved.
            </div>
            
            {/* Actual Real Visitor Counter */}
            <div className="footer-visitor-counter" title="Actual visitor sessions counted on this website">
              <span className="visitor-pulse-dot" />
              <span className="visitor-counter-label">Visitor Counter:</span>
              <span className="visitor-counter-badge">
                {String(visitorCount).padStart(5, '0')}
              </span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

