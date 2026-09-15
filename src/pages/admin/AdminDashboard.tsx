import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card/Card';
import { Badge } from '../../components/ui/Badge/Badge';
import { Button } from '../../components/ui/Button/Button';
import { productService } from '../../services/ProductService';
import { categoryService } from '../../services/CategoryService';
import { requirementService } from '../../services/RequirementService';
import { leadService } from '../../services/LeadService';
import { visitorCounterService } from '../../services/VisitorCounterService';
import { CustomerRequirement, CustomerLead, Product, ProductCategory } from '../../types';

export const AdminDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [requirements, setRequirements] = useState<CustomerRequirement[]>([]);
  const [leads, setLeads] = useState<CustomerLead[]>([]);
  const [visitorCount, setVisitorCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [prods, cats, reqs, contactLeads, visitors] = await Promise.all([
        productService.getProducts(),
        categoryService.getCategories(),
        requirementService.getRequirements(),
        leadService.getLeads(),
        visitorCounterService.fetchLatestCount()
      ]);
      setProducts(prods);
      setCategories(cats);
      setRequirements(reqs);
      setLeads(contactLeads);
      setVisitorCount(visitors);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const pendingRequirements = requirements.filter(r => r.status === 'new' || r.status === 'in-review');
  const newRequirementsCount = requirements.filter(r => r.status === 'new').length;
  const newLeadsCount = leads.filter(l => l.status === 'new').length;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Header & Quick Action Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-4)', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: 'var(--space-4)' }}>
        <div>
          <h2 style={{ margin: 0, color: 'var(--color-primary-900)' }}>Executive Operations Dashboard</h2>
          <p className="text-sm text-muted" style={{ margin: 'var(--space-1) 0 0' }}>
            Live procurement requests, botanical catalog management, and website traffic performance.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          <Button to="/admin/products/add" variant="primary" size="sm">
            + Add Botanical Product
          </Button>
          <Button to="/admin/requirements" variant="secondary" size="sm">
            Review RFQs ({pendingRequirements.length})
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={fetchDashboardData}>
            🔄 Refresh Data
          </Button>
        </div>
      </div>

      {/* Primary KPI Metrics Grid */}
      <div className="grid grid-cols-1 tablet-grid-cols-2 desktop-grid-cols-4 gap-4">
        {/* KPI 1: Live Traffic */}
        <Card variant="surface" padding="md" style={{ borderTop: '3px solid var(--color-primary-600)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Unique Website Visits
            </span>
            <span style={{ fontSize: '1.1rem' }}>🌐</span>
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-primary-900)', margin: 'var(--space-2) 0 var(--space-1)' }}>
            {loading ? '...' : visitorCount.toLocaleString()}
          </div>
          <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
            Live tracked customer sessions
          </div>
        </Card>

        {/* KPI 2: Pending RFQs */}
        <Card variant="surface" padding="md" style={{ borderTop: '3px solid var(--color-accent-600)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Pending RFQ Submissions
            </span>
            {newRequirementsCount > 0 && <Badge variant="warning">{newRequirementsCount} New</Badge>}
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-accent-700)', margin: 'var(--space-2) 0 var(--space-1)' }}>
            {loading ? '...' : pendingRequirements.length}
          </div>
          <Link to="/admin/requirements" style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-accent-700)', fontWeight: 600 }}>
            Inspect pending quotes →
          </Link>
        </Card>

        {/* KPI 3: Inbound Contact Leads */}
        <Card variant="surface" padding="md" style={{ borderTop: '3px solid var(--color-primary-500)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Contact Inquiries
            </span>
            {newLeadsCount > 0 && <Badge variant="primary">{newLeadsCount} New</Badge>}
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-primary-800)', margin: 'var(--space-2) 0 var(--space-1)' }}>
            {loading ? '...' : leads.length}
          </div>
          <Link to="/admin/leads" style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-primary-600)', fontWeight: 600 }}>
            View message inbox →
          </Link>
        </Card>

        {/* KPI 4: Active Botanical Catalog */}
        <Card variant="surface" padding="md" style={{ borderTop: '3px solid var(--color-success)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Catalog Materials
            </span>
            <span style={{ fontSize: '1.1rem' }}>🌿</span>
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-primary-900)', margin: 'var(--space-2) 0 var(--space-1)' }}>
            {loading ? '...' : products.length}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link to="/admin/products" style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-primary-600)', fontWeight: 600 }}>
              Manage catalog →
            </Link>
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
              {categories.length} Categories
            </span>
          </div>
        </Card>
      </div>

      {/* Website Fast-Link Portal Bar */}
      <Card variant="surface" padding="md" style={{ backgroundColor: 'var(--color-primary-900)', color: '#ffffff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 'var(--font-size-sm)', color: '#ffffff' }}>
              🔗 Public Website Quick Access
            </div>
            <div style={{ fontSize: 'var(--font-size-xs)', color: 'rgba(255, 255, 255, 0.75)' }}>
              Verify live customer touchpoints, procurement intake forms, and published botanical monographs.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '0.35rem 0.75rem',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                borderRadius: 'var(--radius-xs)',
                fontSize: 'var(--font-size-xs)',
                fontWeight: 600,
                textDecoration: 'none'
              }}
            >
              🏠 Homepage ↗
            </a>
            <a
              href="/products"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '0.35rem 0.75rem',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                borderRadius: 'var(--radius-xs)',
                fontSize: 'var(--font-size-xs)',
                fontWeight: 600,
                textDecoration: 'none'
              }}
            >
              🌿 Products Catalog ↗
            </a>
            <a
              href="/submit-requirement"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '0.35rem 0.75rem',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                borderRadius: 'var(--radius-xs)',
                fontSize: 'var(--font-size-xs)',
                fontWeight: 600,
                textDecoration: 'none'
              }}
            >
              📋 Submit RFQ ↗
            </a>
            <a
              href="/contact"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '0.35rem 0.75rem',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                borderRadius: 'var(--radius-xs)',
                fontSize: 'var(--font-size-xs)',
                fontWeight: 600,
                textDecoration: 'none'
              }}
            >
              📩 Contact Desk ↗
            </a>
          </div>
        </div>
      </Card>

      {/* Main Grid: Recent RFQs & Inbound Inquiries */}
      <div className="grid grid-cols-1 desktop-grid-cols-3 gap-6" style={{ alignItems: 'start' }}>
        {/* Recent Customer Requirements (2 Columns) */}
        <div style={{ gridColumn: 'span 2' }}>
          <Card variant="surface" padding="lg">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
              <div>
                <h4 style={{ margin: 0 }}>Recent Customer Requirements (RFQs)</h4>
                <p className="text-xs text-muted" style={{ margin: 'var(--space-1) 0 0' }}>
                  Inbound customer specifications requiring quote formulation.
                </p>
              </div>
              <Link to="/admin/requirements" style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-primary-600)', fontWeight: 600 }}>
                View All ({requirements.length}) →
              </Link>
            </div>

            {requirements.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 'var(--space-6)', color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
                No requirement submissions received yet. Customer submissions via <code>/submit-requirement</code> will appear here automatically.
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', fontSize: 'var(--font-size-sm)', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--color-border-subtle)', textAlign: 'left', color: 'var(--color-text-muted)', fontSize: 'var(--font-size-xs)' }}>
                      <th style={{ padding: '0.65rem' }}>Ref #</th>
                      <th style={{ padding: '0.65rem' }}>Client / Organization</th>
                      <th style={{ padding: '0.65rem' }}>Material</th>
                      <th style={{ padding: '0.65rem' }}>Volume</th>
                      <th style={{ padding: '0.65rem' }}>Status</th>
                      <th style={{ padding: '0.65rem', textAlign: 'right' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requirements.slice(0, 6).map((req) => (
                      <tr key={req.id} style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                        <td style={{ padding: '0.65rem', fontWeight: 700, color: 'var(--color-primary-900)' }}>
                          {req.referenceNumber}
                        </td>
                        <td style={{ padding: '0.65rem' }}>
                          <div style={{ fontWeight: 600 }}>{req.contact.fullName}</div>
                          <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                            {req.contact.companyName || req.contact.email}
                          </div>
                        </td>
                        <td style={{ padding: '0.65rem', fontWeight: 500 }}>
                          {req.productName}
                        </td>
                        <td style={{ padding: '0.65rem', whiteSpace: 'nowrap' }}>
                          {req.requiredQuantity} {req.quantityUnit}
                        </td>
                        <td style={{ padding: '0.65rem' }}>
                          <Badge variant={req.status === 'new' ? 'warning' : req.status === 'fulfilled' ? 'success' : 'primary'}>
                            {req.status.toUpperCase()}
                          </Badge>
                        </td>
                        <td style={{ padding: '0.65rem', textAlign: 'right' }}>
                          <Button to="/admin/requirements" variant="outline" size="sm">
                            Inspect
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>

        {/* Inbound Contact Messages (1 Column) */}
        <div>
          <Card variant="surface" padding="lg">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
              <div>
                <h4 style={{ margin: 0 }}>Contact Inquiries</h4>
                <p className="text-xs text-muted" style={{ margin: 'var(--space-1) 0 0' }}>
                  Direct messages via <code>/contact</code>.
                </p>
              </div>
              <Link to="/admin/leads" style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-primary-600)', fontWeight: 600 }}>
                View All →
              </Link>
            </div>

            {leads.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 'var(--space-6)', color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
                No contact form submissions recorded yet.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {leads.slice(0, 4).map((lead) => (
                  <div
                    key={lead.id}
                    style={{
                      padding: 'var(--space-3)',
                      backgroundColor: 'var(--color-bg-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      borderLeft: '3px solid var(--color-primary-600)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-1)' }}>
                      <strong style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-primary-900)' }}>
                        {lead.fullName}
                      </strong>
                      <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--color-text-body)', marginBottom: 'var(--space-1)' }}>
                      {lead.subject}
                    </div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {lead.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
