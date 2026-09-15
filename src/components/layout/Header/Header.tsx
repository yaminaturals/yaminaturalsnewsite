import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { Container } from '../../ui/Container/Container';
import { Button } from '../../ui/Button/Button';
import { siteConfig } from '../../../config/siteConfig';
import { categoryService } from '../../../services/CategoryService';
import { productService } from '../../../services/ProductService';
import { ProductCategory, Product } from '../../../types';
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
  const navigate = useNavigate();

  // Cross-category live product search state
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Load all products for instant client-side search across all categories
  useEffect(() => {
    productService.getProducts().then((prods) => {
      setAllProducts(prods);
    });
  }, []);

  // Filter products when search query changes
  useEffect(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      setSearchResults([]);
      return;
    }
    const filtered = allProducts.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.botanicalName.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q) ||
      (p.categoryName && p.categoryName.toLowerCase().includes(q)) ||
      p.applications.some(app => app.toLowerCase().includes(q))
    );
    setSearchResults(filtered);
  }, [searchQuery, allProducts]);

  // Handle outside clicks to close search dropdown
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Handle search submission to product catalogue
  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearchOpen(false);
    navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleSelectProduct = (slug: string) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    navigate(`/products/${slug}`);
  };

  // Subscribe to dynamic categories from CategoryService
  useEffect(() => {
    const unsubscribe = categoryService.subscribe((cats) => {
      setCategories(cats);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // Close mega-menu on route change unless testMenu is active
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('testMenu') === 'products') {
      setIsProductsOpen(true);
    } else {
      setIsProductsOpen(false);
    }

    const testSearchParam = params.get('testSearch');
    if (testSearchParam !== null) {
      setIsSearchOpen(true);
      if (testSearchParam !== 'true' && testSearchParam !== '') {
        setSearchQuery(testSearchParam);
      }
    }
  }, [location.pathname, location.search]);

  // Handle sticky header scroll elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle clicks outside and escape key for the mega-menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProductsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsProductsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleEscape);
    };
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
                <span>Certified and Natural Ingredients Manufacturer and Supplier</span>
              </span>
              <span className="header-top-divider">•</span>
              <span className="header-top-tag">
                <span>Direct B2B & B2C Supplier</span>
              </span>
            </div>
            <div className="header-top-right">
              {/* Product Search across all categories */}
              <div className="header-top-search-wrap" ref={searchContainerRef}>
                <form
                  onSubmit={handleSearchSubmit}
                  className={`header-top-search-form ${isSearchOpen ? 'active' : ''}`}
                  role="search"
                  aria-label="Search all products"
                >
                  <svg
                    className="header-top-search-icon"
                    width="14"
                    height="14"
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
                    ref={searchInputRef}
                    type="search"
                    className="header-top-search-input"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setIsSearchOpen(true);
                    }}
                    onFocus={() => setIsSearchOpen(true)}
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') {
                        setIsSearchOpen(false);
                        searchInputRef.current?.blur();
                      }
                    }}
                    aria-label="Search product list across all categories"
                    aria-expanded={isSearchOpen}
                    aria-controls="header-search-results"
                    autoComplete="off"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      className="header-top-search-clear"
                      onClick={() => {
                        setSearchQuery('');
                        searchInputRef.current?.focus();
                      }}
                      aria-label="Clear search input"
                    >
                      ✕
                    </button>
                  )}
                </form>

                {/* Instant Search Results Dropdown */}
                {isSearchOpen && (
                  <div
                    id="header-search-results"
                    className="header-search-dropdown"
                    role="region"
                    aria-label="Product Search Results"
                  >
                    {searchQuery.trim() === '' ? (
                      <div className="search-dropdown-suggest">
                        <div className="search-suggest-header">
                          <span className="search-suggest-title">Popular Botanical Searches</span>
                          <span className="search-suggest-badge">All Categories</span>
                        </div>
                        <div className="search-suggest-chips">
                          {['Ashwagandha', 'Curcumin 95%', 'Moringa Powder', 'Spirulina', 'Herbal Extracts', 'Natural Oils', 'Cosmetic Clays'].map(
                            (term) => (
                              <button
                                key={term}
                                type="button"
                                className="search-suggest-chip"
                                onClick={() => {
                                  setSearchQuery(term);
                                  setIsSearchOpen(true);
                                }}
                              >
                                {term}
                              </button>
                            )
                          )}
                        </div>
                      </div>
                    ) : searchResults.length > 0 ? (
                      <div className="search-results-list">
                        <div className="search-results-header">
                          <span>
                            Found <strong>{searchResults.length}</strong> product{searchResults.length > 1 ? 's' : ''} across all categories
                          </span>
                        </div>
                        <div className="search-results-items">
                          {searchResults.slice(0, 6).map((item) => (
                            <button
                              key={item.id}
                              type="button"
                              className="search-result-item"
                              onClick={() => handleSelectProduct(item.slug)}
                            >
                              <div className="search-item-leaf-icon">🌿</div>
                              <div className="search-item-info">
                                <div className="search-item-row">
                                  <span className="search-item-name">{item.name}</span>
                                  {item.categoryName && (
                                    <span className="search-item-cat">{item.categoryName}</span>
                                  )}
                                </div>
                                <span className="search-item-botanical">{item.botanicalName}</span>
                                <span className="search-item-desc">{item.shortDescription}</span>
                              </div>
                              <span className="search-item-arrow" aria-hidden="true">→</span>
                            </button>
                          ))}
                        </div>
                        <div className="search-results-footer">
                          <button
                            type="button"
                            className="search-view-all-btn"
                            onClick={() => handleSearchSubmit()}
                          >
                            <span>Explore all {searchResults.length} matching products in catalogue</span>
                            <span aria-hidden="true">→</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="search-empty-state">
                        <p className="search-empty-text">
                          No products found matching &ldquo;<strong>{searchQuery}</strong>&rdquo;.
                        </p>
                        <p className="search-empty-sub">
                          Looking for a specialized extraction ratio, custom mesh size, or rare botanical?
                        </p>
                        <Link
                          to="/submit-requirement"
                          className="search-empty-link"
                          onClick={() => setIsSearchOpen(false)}
                        >
                          Submit Custom Procurement Requirement →
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>

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
                  width="210"
                  height="58"
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

              {/* Products / Brochure Item with Dropdown / Mega-Menu */}
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
                  <span>PRODUCT CATALOGUE</span>
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
                        <span className="eyebrow">Natural Catalog &amp; Specification Dossiers</span>
                        <p className="mega-menu-title">Botanical &amp; Herbal Categories</p>
                        <p className="mega-menu-subtitle">
                          Botanical whole powders, herbal extracts, natural oils, cosmetic clays, and dietary ingredients.
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
                        📄 Need our full commercial catalog &amp; technical specification dossier?
                      </span>
                      <Link
                        to="/submit-requirement"
                        className="mega-menu-footer-cta"
                        onClick={() => setIsProductsOpen(false)}
                      >
                        Request Complete Product Brochure →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <NavLink
                to="/partnership"
                className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}
              >
                PARTNERSHIP
              </NavLink>

              <NavLink
                to="/private-labelling"
                className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}
              >
                PRIVATE LABELLING
              </NavLink>

              <NavLink
                to="/why-yami-naturals"
                className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}
              >
                WHY YAMI NATURALS
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}
              >
                ABOUT
              </NavLink>

              <NavLink
                to="/career"
                className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}
              >
                CAREER
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
