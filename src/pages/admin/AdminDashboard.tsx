import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../../services/ProductService';
import { categoryService } from '../../services/CategoryService';
import { requirementService } from '../../services/RequirementService';
import { leadService } from '../../services/LeadService';
import { visitorCounterService } from '../../services/VisitorCounterService';
import { CustomerRequirement, CustomerLead, Product, ProductCategory } from '../../types';
import { EnquiriesChart } from '../../components/admin/EnquiriesChart';
import {
  IconMail,
  IconProducts,
  IconUsers,
  IconAnalytics,
  IconCalendar,
  IconChevronDown
} from '../../components/admin/AdminIcons';

export const AdminDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [requirements, setRequirements] = useState<CustomerRequirement[]>([]);
  const [leads, setLeads] = useState<CustomerLead[]>([]);
  const [visitorCount, setVisitorCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      productService.getProducts(),
      categoryService.getCategories(),
      requirementService.getRequirements(),
      leadService.getLeads(),
      visitorCounterService.fetchLatestCount()
    ]).then(([prods, cats, reqs, contactLeads, visitors]) => {
      setProducts(prods);
      setCategories(cats);
      setRequirements(reqs);
      setLeads(contactLeads);
      setVisitorCount(visitors);
      setLoading(false);
    });
  }, []);

  // Format today's date dynamically (e.g. "Today, 15 Sep 2026")
  const todayFormatted = `Today, ${new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })}`;

  // Helper for Status Badge Styling
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'new':
        return {
          bg: '#E8F5EE',
          color: '#0D5C3A',
          label: 'New'
        };
      case 'in-review':
      case 'in progress':
      case 'in discussion':
        return {
          bg: '#E0F2FE',
          color: '#0284C7',
          label: 'In Progress'
        };
      case 'quoted':
      case 'reviewed':
        return {
          bg: '#FEF3C7',
          color: '#D97706',
          label: 'Reviewed'
        };
      case 'fulfilled':
      case 'completed':
        return {
          bg: '#DCFCE7',
          color: '#15803D',
          label: 'Completed'
        };
      default:
        return {
          bg: '#F3F4F6',
          color: '#4B5563',
          label: status
        };
    }
  };

  // Compute Real Category Distribution from Actual Products
  const categoryPalette = ['#073B24', '#0D5C3A', '#4ADE80', '#A7F3D0', '#E9D5C3', '#CBD5E1', '#F59E0B'];
  const categoryStats = categories.map((cat, idx) => {
    const matchingProducts = products.filter(
      p => p.categoryId === cat.id || (cat.slug && p.categoryId === `cat-${cat.slug}`)
    );
    return {
      name: cat.name,
      count: matchingProducts.length,
      color: categoryPalette[idx % categoryPalette.length]
    };
  });
  const totalCategoryProducts = categoryStats.reduce((sum, item) => sum + item.count, 0);

  // Compute Real Activity Feed from Real Datasets
  const realActivities: Array<{
    id: string;
    type: 'enquiry' | 'product' | 'lead';
    title: string;
    subtitle: string;
    date: string;
  }> = [
    ...requirements.map(r => ({
      id: `act-req-${r.id}`,
      type: 'enquiry' as const,
      title: 'New enquiry received',
      subtitle: `Ref #${r.referenceNumber}: ${r.productName} (${r.contact.fullName})`,
      date: r.createdAt
    })),
    ...leads.map(l => ({
      id: `act-lead-${l.id}`,
      type: 'lead' as const,
      title: 'New contact message',
      subtitle: `${l.fullName}: ${l.subject}`,
      date: l.createdAt
    })),
    ...products.slice(0, 4).map(p => ({
      id: `act-prod-${p.id}`,
      type: 'product' as const,
      title: 'Product catalog item',
      subtitle: `${p.name} (${p.categoryName || 'Botanicals'})`,
      date: p.updatedAt || p.createdAt
    }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

  const formatRelativeTime = (isoString: string) => {
    try {
      const diffMs = Date.now() - new Date(isoString).getTime();
      const diffMins = Math.floor(diffMs / (1000 * 60));
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins} mins ago`;
      if (diffHours < 24) return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
      if (diffDays < 30) return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
      return new Date(isoString).toLocaleDateString();
    } catch {
      return 'Recently';
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* 1. Dashboard Header Area */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#111827', margin: 0, letterSpacing: '-0.02em' }}>
            Dashboard
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#6B7280', margin: '0.25rem 0 0' }}>
            Welcome back! Here's what's happening with your Yami Naturals website.
          </p>
        </div>

        {/* Date Filter Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              padding: '0.45rem 0.85rem',
              fontSize: '0.85rem',
              fontWeight: 500,
              color: '#374151',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)'
            }}
          >
            <IconCalendar size={15} color="#6B7280" />
            <span>{todayFormatted}</span>
            <IconChevronDown size={13} color="#9CA3AF" />
          </div>
        </div>
      </div>

      {/* 2. Four KPI Cards */}
      <div className="grid grid-cols-1 tablet-grid-cols-2 desktop-grid-cols-4 gap-5">
        {/* Card 1: Total Enquiries */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: '12px',
            padding: '1.25rem',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1rem'
          }}
        >
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '10px',
              backgroundColor: '#E8F5EE',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0D5C3A',
              flexShrink: 0
            }}
          >
            <IconMail size={22} color="#0D5C3A" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#6B7280' }}>Total Enquiries</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#111827', lineHeight: 1.2, margin: '2px 0 4px' }}>
              {loading ? '...' : requirements.length}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#0D5C3A', fontWeight: 500 }}>
              <Link to="/admin/requirements" style={{ color: '#0D5C3A', textDecoration: 'none' }}>
                {requirements.filter(r => r.status === 'new').length} pending review →
              </Link>
            </div>
          </div>
        </div>

        {/* Card 2: Total Products */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: '12px',
            padding: '1.25rem',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1rem'
          }}
        >
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '10px',
              backgroundColor: '#E8F5EE',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0D5C3A',
              flexShrink: 0
            }}
          >
            <IconProducts size={22} color="#0D5C3A" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#6B7280' }}>Total Products</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#111827', lineHeight: 1.2, margin: '2px 0 4px' }}>
              {loading ? '...' : products.length}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>
              <Link to="/admin/products" style={{ color: '#0D5C3A', textDecoration: 'none' }}>
                Manage botanical catalog →
              </Link>
            </div>
          </div>
        </div>

        {/* Card 3: Total Users / Leads */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: '12px',
            padding: '1.25rem',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1rem'
          }}
        >
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '10px',
              backgroundColor: '#E8F5EE',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0D5C3A',
              flexShrink: 0
            }}
          >
            <IconUsers size={22} color="#0D5C3A" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#6B7280' }}>Inbound Leads</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#111827', lineHeight: 1.2, margin: '2px 0 4px' }}>
              {loading ? '...' : leads.length}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>
              <Link to="/admin/leads" style={{ color: '#0D5C3A', textDecoration: 'none' }}>
                View message inbox →
              </Link>
            </div>
          </div>
        </div>

        {/* Card 4: Website Views */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: '12px',
            padding: '1.25rem',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1rem'
          }}
        >
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '10px',
              backgroundColor: '#E8F5EE',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0D5C3A',
              flexShrink: 0
            }}
          >
            <IconAnalytics size={22} color="#0D5C3A" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#6B7280' }}>Website Visits</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#111827', lineHeight: 1.2, margin: '2px 0 4px' }}>
              {loading ? '...' : visitorCount.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 500 }}>
              Live unique sessions
            </div>
          </div>
        </div>
      </div>

      {/* 3. Middle Charts Section */}
      <div className="grid grid-cols-1 desktop-grid-cols-3 gap-6">
        {/* Left 2 Columns: Full-Featured Enquiries Overview Spline Chart */}
        <div style={{ gridColumn: 'span 2' }}>
          <EnquiriesChart requirements={requirements} leads={leads} />
        </div>

        {/* Right 1 Column: Enquiries by Category Donut Chart */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-heading, Georgia, serif)',
              fontSize: '1.15rem',
              fontWeight: 700,
              color: '#111827',
              margin: '0 0 1.25rem 0'
            }}
          >
            Products by Category
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.25rem', flex: 1, flexWrap: 'wrap' }}>
            {/* SVG Donut Chart with Center Label */}
            <div style={{ position: 'relative', width: '150px', height: '150px', flexShrink: 0 }}>
              <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                {totalCategoryProducts === 0 ? (
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#E5E7EB" strokeWidth="18" />
                ) : (
                  <>
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#073B24" strokeWidth="18" strokeDasharray="35 65" strokeDashoffset="0" />
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#0D5C3A" strokeWidth="18" strokeDasharray="25 75" strokeDashoffset="-35" />
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#4ADE80" strokeWidth="18" strokeDasharray="18 82" strokeDashoffset="-60" />
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#A7F3D0" strokeWidth="18" strokeDasharray="12 88" strokeDashoffset="-78" />
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#E9D5C3" strokeWidth="18" strokeDasharray="10 90" strokeDashoffset="-90" />
                  </>
                )}
              </svg>

              {/* Center Donut Hole & Count */}
              <div
                style={{
                  position: 'absolute',
                  inset: '24px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '50%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.04)'
                }}
              >
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', lineHeight: 1 }}>{products.length}</span>
                <span style={{ fontSize: '0.68rem', color: '#6B7280', fontWeight: 500, marginTop: '2px' }}>Products</span>
              </div>
            </div>

            {/* Category Breakdown Legend */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', flex: 1, minWidth: '140px' }}>
              {categoryStats.map((item, idx) => {
                const percentage = totalCategoryProducts > 0 ? Math.round((item.count / totalCategoryProducts) * 100) : 0;
                return (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: item.color }} />
                      <span style={{ color: '#4B5563', fontWeight: 500 }}>{item.name}</span>
                    </div>
                    <span style={{ fontWeight: 700, color: '#111827' }}>{item.count > 0 ? `${percentage}%` : `${item.count}`}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Row: Recent Enquiries Table & Recent Activity Feed */}
      <div className="grid grid-cols-1 desktop-grid-cols-3 gap-6" style={{ alignItems: 'start' }}>
        {/* Left 2 Columns: Recent Enquiries Table */}
        <div
          style={{
            gridColumn: 'span 2',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3
              style={{
                fontFamily: 'var(--font-heading, Georgia, serif)',
                fontSize: '1.15rem',
                fontWeight: 700,
                color: '#111827',
                margin: 0
              }}
            >
              Recent Enquiries ({requirements.length})
            </h3>
            <Link
              to="/admin/requirements"
              style={{
                fontSize: '0.82rem',
                fontWeight: 600,
                color: '#0D5C3A',
                textDecoration: 'none'
              }}
            >
              View All
            </Link>
          </div>

          {requirements.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: '#6B7280' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📥</div>
              <strong style={{ fontSize: '0.9rem', color: '#374151' }}>No enquiries submitted yet.</strong>
              <p style={{ fontSize: '0.8rem', color: '#9CA3AF', margin: '0.25rem 0 0' }}>
                When customers submit material quotes via the <code>/submit-requirement</code> page, they will appear here instantly.
              </p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ textAlign: 'left', color: '#6B7280', borderBottom: '1px solid #E5E7EB', fontSize: '0.78rem' }}>
                    <th style={{ padding: '0.65rem 0.5rem', fontWeight: 600 }}>Name</th>
                    <th style={{ padding: '0.65rem 0.5rem', fontWeight: 600 }}>Product Interest</th>
                    <th style={{ padding: '0.65rem 0.5rem', fontWeight: 600 }}>Quantity</th>
                    <th style={{ padding: '0.65rem 0.5rem', fontWeight: 600 }}>Date</th>
                    <th style={{ padding: '0.65rem 0.5rem', fontWeight: 600, textAlign: 'right' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {requirements.slice(0, 6).map((req) => {
                    const clientName = req.contact.companyName || req.contact.fullName;
                    const dateStr = new Date(req.createdAt).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    });
                    const statusInfo = getStatusBadge(req.status);

                    return (
                      <tr key={req.id} style={{ borderBottom: '1px solid #F3F4F6', transition: 'background-color 0.15s' }}>
                        <td style={{ padding: '0.8rem 0.5rem', fontWeight: 600, color: '#111827' }}>
                          <Link to="/admin/requirements" style={{ color: 'inherit', textDecoration: 'none' }}>
                            {clientName}
                          </Link>
                        </td>
                        <td style={{ padding: '0.8rem 0.5rem', color: '#4B5563' }}>
                          {req.productName}
                        </td>
                        <td style={{ padding: '0.8rem 0.5rem', color: '#6B7280' }}>
                          {req.requiredQuantity} {req.quantityUnit}
                        </td>
                        <td style={{ padding: '0.8rem 0.5rem', color: '#6B7280' }}>
                          {dateStr}
                        </td>
                        <td style={{ padding: '0.8rem 0.5rem', textAlign: 'right' }}>
                          <span
                            style={{
                              display: 'inline-block',
                              padding: '0.25rem 0.65rem',
                              borderRadius: '6px',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              backgroundColor: statusInfo.bg,
                              color: statusInfo.color
                            }}
                          >
                            {statusInfo.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right 1 Column: Recent Activity Feed */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3
              style={{
                fontFamily: 'var(--font-heading, Georgia, serif)',
                fontSize: '1.15rem',
                fontWeight: 700,
                color: '#111827',
                margin: 0
              }}
            >
              Recent Activity
            </h3>
            <Link
              to="/admin/analytics"
              style={{
                fontSize: '0.82rem',
                fontWeight: 600,
                color: '#0D5C3A',
                textDecoration: 'none'
              }}
            >
              View All
            </Link>
          </div>

          {realActivities.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem', color: '#6B7280', fontSize: '0.85rem' }}>
              No recent activity.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {realActivities.map((act) => (
                <div key={act.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: act.type === 'enquiry' ? '#E8F5EE' : act.type === 'lead' ? '#E0F2FE' : '#F3F4F6',
                      color: act.type === 'enquiry' ? '#0D5C3A' : act.type === 'lead' ? '#0284C7' : '#4B5563',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      flexShrink: 0
                    }}
                  >
                    {act.type === 'enquiry' ? '+' : act.type === 'lead' ? '✉' : '📦'}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#111827' }}>
                      {act.title}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#6B7280', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {act.subtitle}
                    </div>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#9CA3AF', whiteSpace: 'nowrap' }}>
                    {formatRelativeTime(act.date)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
