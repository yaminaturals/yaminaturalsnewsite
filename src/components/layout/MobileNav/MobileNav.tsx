import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../../ui/Button/Button';
import { siteConfig } from '../../../config/siteConfig';
import { categoryService } from '../../../services/CategoryService';
import { productService } from '../../../services/ProductService';
import { ProductCategory, Product } from '../../../types';
import './MobileNav.css';

export interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const [isProductsExpanded, setIsProductsExpanded] = useState(false);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [mobileSearchQuery, setMobileSearchQuery] = useState('');
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchSectionRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Load all products for live cross-category search
  useEffect(() => {
    productService.getProducts().then((prods) => {
      setAllProducts(prods);
    });
  }, []);

  // Filter products across all categories when query changes
  useEffect(() => {
    const q = mobileSearchQuery.trim().toLowerCase();
    if (!q) {
      setSearchResults([]);
      return;
    }
    const filtered = allProducts.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      p.botanicalName.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q) ||
      (p.categoryName && p.categoryName.toLowerCase().includes(q)) ||
      p.applications.some((app) => app.toLowerCase().includes(q))
    );
    setSearchResults(filtered);
  }, [mobileSearchQuery, allProducts]);

  // Subscribe to dynamic categories from CategoryService
  useEffect(() => {
    const unsubscribe = categoryService.subscribe((cats) => {
      setCategories(cats);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const prevIsOpen = useRef(isOpen);

  // Open accordion or populate search if URL parameters are set
  useEffect(() => {
    if (isOpen) {
      const params = new URLSearchParams(location.search);
      if (location.pathname.startsWith('/products') || params.get('testProducts') === 'true') {
        setIsProductsExpanded(true);
      }
      const testSearch = params.get('testMobileSearch');
      if (testSearch) {
        setMobileSearchQuery(testSearch);
        setIsSearchFocused(true);
      }
    }
  }, [isOpen, location.pathname, location.search]);

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

  // Close search suggestions when clicking outside search section
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (searchSectionRef.current && !searchSectionRef.current.contains(e.target as Node)) {
        if (!mobileSearchQuery.trim()) {
          setIsSearchFocused(false);
        }
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [mobileSearchQuery]);

  // Reset search state when drawer closes
  useEffect(() => {
    if (prevIsOpen.current && !isOpen) {
      setMobileSearchQuery('');
      setSearchResults([]);
      setIsSearchFocused(false);
    }
    prevIsOpen.current = isOpen;
  }, [isOpen]);

  const handleSelectProduct = (slug: string) => {
    onClose();
    setMobileSearchQuery('');
    navigate(`/products/${slug}`);
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (mobileSearchQuery.trim()) {
      onClose();
      navigate(`/products?search=${encodeURIComponent(mobileSearchQuery.trim())}`);
    }
  };

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
              width="170"
              height="44"
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

        {/* Mobile Search Bar across all categories */}
        <div className="mobile-nav-search-section" ref={searchSectionRef}>
          <form
            onSubmit={handleSearchSubmit}
            className={`mobile-nav-search-form ${mobileSearchQuery ? 'has-query' : ''}`}
            role="search"
            aria-label="Search all products"
          >
            <svg
              className="mobile-nav-search-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="search"
              className="mobile-nav-search-input"
              placeholder="Search all botanical products..."
              value={mobileSearchQuery}
              onChange={(e) => {
                setMobileSearchQuery(e.target.value);
                setIsSearchFocused(true);
              }}
              onFocus={() => setIsSearchFocused(true)}
              aria-label="Search all products across categories"
              autoComplete="off"
            />
            {mobileSearchQuery && (
              <button
                type="button"
                className="mobile-nav-search-clear"
                onClick={() => {
                  setMobileSearchQuery('');
                  setSearchResults([]);
                }}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </form>

          {/* Live Mobile Search Results List (Below Input while typing or focused) */}
          {(mobileSearchQuery.trim() !== '' || isSearchFocused) && (
            <div className="mobile-search-results-panel" role="region" aria-label="Search Results">
              {mobileSearchQuery.trim() === '' ? (
                <div className="mobile-search-suggest">
                  <div className="mobile-search-suggest-header">
                    <span>Popular Botanical Searches</span>
                    <span className="mobile-search-badge">Quick Tap</span>
                  </div>
                  <div className="mobile-search-chips">
                    {['Ashwagandha', 'Curcumin 95%', 'Moringa Powder', 'Spirulina', 'Natural Oils', 'Extracts'].map((term) => (
                      <button
                        key={term}
                        type="button"
                        className="mobile-search-chip"
                        onClick={() => {
                          setMobileSearchQuery(term);
                        }}
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              ) : searchResults.length > 0 ? (
                <>
                  <div className="mobile-search-header">
                    <span>
                      Found <strong>{searchResults.length}</strong> product{searchResults.length > 1 ? 's' : ''}
                    </span>
                    <span className="mobile-search-badge">All Categories</span>
                  </div>

                  <div className="mobile-search-list">
                    {searchResults.slice(0, 8).map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        className="mobile-search-item"
                        onClick={() => handleSelectProduct(item.slug)}
                      >
                        <div className="mobile-search-item-leaf">🌿</div>
                        <div className="mobile-search-item-details">
                          <div className="mobile-search-item-top">
                            <span className="mobile-search-item-name">{item.name}</span>
                            {item.categoryName && (
                              <span className="mobile-search-item-category">{item.categoryName}</span>
                            )}
                          </div>
                          <span className="mobile-search-item-botanical">{item.botanicalName}</span>
                          <span className="mobile-search-item-desc">{item.shortDescription}</span>
                        </div>
                        <span className="mobile-search-item-arrow" aria-hidden="true">→</span>
                      </button>
                    ))}
                  </div>

                  <div className="mobile-search-footer">
                    <button
                      type="button"
                      className="mobile-search-all-btn"
                      onClick={() => handleSearchSubmit()}
                    >
                      <span>Explore all {searchResults.length} matching products</span>
                      <span aria-hidden="true">→</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="mobile-search-empty">
                  <p className="mobile-search-empty-title">
                    No products found for &ldquo;<strong>{mobileSearchQuery}</strong>&rdquo;
                  </p>
                  <p className="mobile-search-empty-text">
                    Looking for a custom ratio, mesh size, or rare botanical?
                  </p>
                  <Link
                    to="/submit-requirement"
                    className="mobile-search-empty-link"
                    onClick={onClose}
                  >
                    Submit Custom Requirement →
                  </Link>
                </div>
              )}
            </div>
          )}
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

          {/* Accessible Products / Brochure Accordion Item */}
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
              <span className="mobile-accordion-title">Products / Brochure</span>
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

                <Link
                  to="/submit-requirement"
                  className="mobile-sublink mobile-sublink-brochure"
                  onClick={onClose}
                >
                  <span>📄 Request Product Brochure (PDF)</span>
                  <span className="mobile-sublink-arrow">→</span>
                </Link>
              </div>
            </div>
          </div>

          <NavLink
            to="/partnership"
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            onClick={onClose}
          >
            <span>Partnership</span>
            <span className="mobile-nav-arrow" aria-hidden="true">→</span>
          </NavLink>

          <NavLink
            to="/why-yami-naturals"
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            onClick={onClose}
          >
            <span>Why Yami Naturals</span>
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
