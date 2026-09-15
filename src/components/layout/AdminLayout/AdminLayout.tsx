import React, { useEffect, useState, useRef } from 'react';
import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom';
import { SEO } from '../../common/SEO';
import { siteConfig } from '../../../config/siteConfig';
import { authService, AUTHORIZED_ADMIN_EMAIL } from '../../../services/AuthService';
import { productService } from '../../../services/ProductService';
import { categoryService } from '../../../services/CategoryService';
import { requirementService } from '../../../services/RequirementService';
import { leadService } from '../../../services/LeadService';
import { AdminUser, Product, ProductCategory, CustomerRequirement, CustomerLead } from '../../../types';
import { BackToTop } from '../../common/BackToTop';
import {
  IconDashboard,
  IconProducts,
  IconCategories,
  IconEnquiries,
  IconUsers,
  IconContent,
  IconMedia,
  IconOrders,
  IconAnalytics,
  IconSEO,
  IconSettings,
  IconSearch,
  IconBell,
  IconChevronDown
} from '../../admin/AdminIcons';
import './AdminLayout.css';

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState<number>(0);

  // Global Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{
    products: Product[];
    categories: ProductCategory[];
    requirements: CustomerRequirement[];
    leads: CustomerLead[];
  }>({ products: [], categories: [], requirements: [], leads: [] });
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/admin/login', { replace: true });
      return;
    }

    authService.getSession().then((session) => {
      if (!session.isAuthenticated || !session.user || session.user.email.toLowerCase().trim() !== AUTHORIZED_ADMIN_EMAIL) {
        navigate('/admin/login', { replace: true });
      } else {
        setCurrentUser(session.user);
      }
    });

    // Load active notification count (new RFQs + new leads)
    Promise.all([
      requirementService.getRequirements('new'),
      leadService.getLeads()
    ]).then(([newReqs, leads]) => {
      const newLeads = leads.filter(l => l.status === 'new');
      setNotificationCount(newReqs.length + newLeads.length);
    });
  }, [navigate]);

  // Handle outside click to close search & profile dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearching(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Real-time Global Search Execution
  useEffect(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      setSearchResults({ products: [], categories: [], requirements: [], leads: [] });
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    Promise.all([
      productService.getProducts({ searchQuery: query }),
      categoryService.getCategories(),
      requirementService.getRequirements(),
      leadService.getLeads()
    ]).then(([prods, cats, reqs, leads]) => {
      const matchedCats = cats.filter(c => c.name.toLowerCase().includes(query) || c.slug.toLowerCase().includes(query));
      const matchedReqs = reqs.filter(r => 
        r.referenceNumber.toLowerCase().includes(query) || 
        r.productName.toLowerCase().includes(query) ||
        r.contact.fullName.toLowerCase().includes(query) ||
        (r.contact.companyName && r.contact.companyName.toLowerCase().includes(query))
      );
      const matchedLeads = leads.filter(l => 
        l.fullName.toLowerCase().includes(query) ||
        l.email.toLowerCase().includes(query) ||
        l.subject.toLowerCase().includes(query)
      );

      setSearchResults({
        products: prods.slice(0, 4),
        categories: matchedCats.slice(0, 3),
        requirements: matchedReqs.slice(0, 4),
        leads: matchedLeads.slice(0, 3)
      });
    });
  }, [searchQuery]);

  const handleLogout = async () => {
    await authService.logout();
    navigate('/admin/login', { replace: true });
  };

  const closeSidebarOnMobile = () => {
    setSidebarOpen(false);
  };

  const totalSearchResults = searchResults.products.length + searchResults.categories.length + searchResults.requirements.length + searchResults.leads.length;

  return (
    <div className="admin-shell">
      <SEO title="Admin Panel | Yami Naturals" noindex={true} />

      {/* Mobile Backdrop */}
      {sidebarOpen && <div className="admin-sidebar-backdrop" onClick={closeSidebarOnMobile} />}

      {/* Left Fixed Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`} aria-label="Admin Navigation">
        {/* Brand Header */}
        <div className="admin-sidebar-brand">
          <Link to="/admin/dashboard" className="admin-sidebar-logo-container" onClick={closeSidebarOnMobile}>
            <img
              src={siteConfig.brand.logoPath}
              alt="Yami Naturals"
              className="admin-sidebar-logo"
            />
          </Link>
          <div className="admin-sidebar-brand-subtitle">Admin Panel</div>
        </div>

        {/* Navigation Menu */}
        <nav className="admin-sidebar-nav">
          <NavLink to="/admin/dashboard" end className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`} onClick={closeSidebarOnMobile}>
            <span className="admin-nav-icon"><IconDashboard size={18} /></span>
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/admin/products" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`} onClick={closeSidebarOnMobile}>
            <span className="admin-nav-icon"><IconProducts size={18} /></span>
            <span>Product Management</span>
          </NavLink>

          <NavLink to="/admin/categories" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`} onClick={closeSidebarOnMobile}>
            <span className="admin-nav-icon"><IconCategories size={18} /></span>
            <span>Categories</span>
          </NavLink>

          <NavLink to="/admin/requirements" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`} onClick={closeSidebarOnMobile}>
            <span className="admin-nav-icon"><IconEnquiries size={18} /></span>
            <span>RFQ / Enquiries</span>
            {notificationCount > 0 && <span className="admin-nav-badge">{notificationCount}</span>}
          </NavLink>

          <NavLink to="/admin/leads" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`} onClick={closeSidebarOnMobile}>
            <span className="admin-nav-icon"><IconUsers size={18} /></span>
            <span>Users & Leads</span>
          </NavLink>

          <NavLink to="/admin/content" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`} onClick={closeSidebarOnMobile}>
            <span className="admin-nav-icon"><IconContent size={18} /></span>
            <span>Content Management</span>
          </NavLink>

          <NavLink to="/admin/media" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`} onClick={closeSidebarOnMobile}>
            <span className="admin-nav-icon"><IconMedia size={18} /></span>
            <span>Media Library</span>
          </NavLink>

          <NavLink to="/admin/orders" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`} onClick={closeSidebarOnMobile}>
            <span className="admin-nav-icon"><IconOrders size={18} /></span>
            <span>Orders & Sourcing</span>
          </NavLink>

          <NavLink to="/admin/analytics" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`} onClick={closeSidebarOnMobile}>
            <span className="admin-nav-icon"><IconAnalytics size={18} /></span>
            <span>Analytics</span>
          </NavLink>

          <NavLink to="/admin/seo" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`} onClick={closeSidebarOnMobile}>
            <span className="admin-nav-icon"><IconSEO size={18} /></span>
            <span>SEO Tools</span>
          </NavLink>

          <NavLink to="/admin/settings" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`} onClick={closeSidebarOnMobile}>
            <span className="admin-nav-icon"><IconSettings size={18} /></span>
            <span>Settings</span>
          </NavLink>
        </nav>

        {/* Botanical Quote Card at bottom of sidebar */}
        <div className="admin-sidebar-quote-card">
          <div className="admin-sidebar-quote-text">
            “Natural Ingredients. Real Possibilities.”
          </div>
          <div className="admin-sidebar-quote-line" />
          <div className="admin-sidebar-quote-bg-leaf">🌿</div>
        </div>
      </aside>

      {/* Main Viewport Shell */}
      <div className="admin-main">
        {/* Top Header Bar */}
        <header className="admin-top-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
            {/* Mobile Toggle */}
            <button
              type="button"
              className="admin-mobile-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle navigation menu"
            >
              ☰
            </button>

            {/* Functional Real-Time Global Search */}
            <div className="admin-search-container" ref={searchRef}>
              <span className="admin-search-icon">
                <IconSearch size={16} />
              </span>
              <input
                type="text"
                className="admin-search-input"
                placeholder="Search products, enquiries, users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  if (searchQuery.trim()) setIsSearching(true);
                }}
              />

              {/* Live Global Search Dropdown Overlay */}
              {isSearching && searchQuery.trim() && (
                <div className="admin-search-results-overlay">
                  {totalSearchResults === 0 ? (
                    <div style={{ padding: '0.75rem', fontSize: '0.85rem', color: '#6B7280', textAlign: 'center' }}>
                      No results found for "{searchQuery}"
                    </div>
                  ) : (
                    <>
                      {searchResults.products.length > 0 && (
                        <div>
                          <div className="admin-search-result-group-title">🌿 Products ({searchResults.products.length})</div>
                          {searchResults.products.map(p => (
                            <Link
                              key={p.id}
                              to={`/admin/products`}
                              className="admin-search-result-item"
                              onClick={() => { setIsSearching(false); setSearchQuery(''); }}
                            >
                              <span><strong>{p.name}</strong> <small style={{ color: '#6B7280' }}>({p.botanicalName})</small></span>
                              <span style={{ fontSize: '0.75rem', color: '#0D5C3A' }}>Catalog →</span>
                            </Link>
                          ))}
                        </div>
                      )}

                      {searchResults.requirements.length > 0 && (
                        <div>
                          <div className="admin-search-result-group-title">📋 Enquiries / RFQs ({searchResults.requirements.length})</div>
                          {searchResults.requirements.map(r => (
                            <Link
                              key={r.id}
                              to="/admin/requirements"
                              className="admin-search-result-item"
                              onClick={() => { setIsSearching(false); setSearchQuery(''); }}
                            >
                              <span><strong>{r.referenceNumber}</strong>: {r.productName} ({r.contact.fullName})</span>
                              <span style={{ fontSize: '0.75rem', color: '#C98A1E' }}>{r.status} →</span>
                            </Link>
                          ))}
                        </div>
                      )}

                      {searchResults.categories.length > 0 && (
                        <div>
                          <div className="admin-search-result-group-title">📁 Categories ({searchResults.categories.length})</div>
                          {searchResults.categories.map(c => (
                            <Link
                              key={c.id}
                              to="/admin/categories"
                              className="admin-search-result-item"
                              onClick={() => { setIsSearching(false); setSearchQuery(''); }}
                            >
                              <span><strong>{c.name}</strong></span>
                              <span style={{ fontSize: '0.75rem', color: '#0D5C3A' }}>View →</span>
                            </Link>
                          ))}
                        </div>
                      )}

                      {searchResults.leads.length > 0 && (
                        <div>
                          <div className="admin-search-result-group-title">📩 Leads & Inquiries ({searchResults.leads.length})</div>
                          {searchResults.leads.map(l => (
                            <Link
                              key={l.id}
                              to="/admin/leads"
                              className="admin-search-result-item"
                              onClick={() => { setIsSearching(false); setSearchQuery(''); }}
                            >
                              <span><strong>{l.fullName}</strong>: {l.subject}</span>
                              <span style={{ fontSize: '0.75rem', color: '#0D5C3A' }}>Inbox →</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Action Icons & Admin Profile */}
          <div className="admin-top-actions">
            {/* Notification Bell */}
            <Link to="/admin/requirements" className="admin-notification-btn" aria-label="Notifications" title="Pending Customer RFQs">
              <IconBell size={20} />
              {notificationCount > 0 && (
                <span className="admin-notification-badge">{notificationCount}</span>
              )}
            </Link>

            {/* Profile Dropdown */}
            <div className="admin-profile-menu" ref={profileRef}>
              <button
                type="button"
                className="admin-profile-trigger"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                aria-expanded={profileDropdownOpen}
              >
                {currentUser?.photoURL ? (
                  <img src={currentUser.photoURL} alt="Admin Profile" className="admin-avatar" />
                ) : (
                  <div className="admin-avatar">A</div>
                )}
                <div className="admin-profile-info">
                  <span className="admin-profile-name">{currentUser?.name || 'Admin User'}</span>
                  <span className="admin-profile-role">Administrator</span>
                </div>
                <IconChevronDown size={14} color="#6B7280" />
              </button>

              {profileDropdownOpen && (
                <div className="admin-dropdown-menu">
                  <div style={{ padding: '0.6rem 1rem', fontSize: '0.75rem', color: '#6B7280', borderBottom: '1px solid #E5E7EB' }}>
                    Signed in as<br />
                    <strong style={{ color: '#111827' }}>{currentUser?.email || AUTHORIZED_ADMIN_EMAIL}</strong>
                  </div>
                  <a
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="admin-dropdown-item"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    <span>🌐</span> View Public Website
                  </a>
                  <Link
                    to="/admin/settings"
                    className="admin-dropdown-item"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    <span>⚙️</span> Portal Settings
                  </Link>
                  <div className="admin-dropdown-divider" />
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="admin-dropdown-item"
                    style={{ color: '#DC2626' }}
                  >
                    <span>🚪</span> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Nested Route Viewport */}
        <main className="admin-content-area">
          <Outlet />
        </main>
        <BackToTop />
      </div>
    </div>
  );
};
