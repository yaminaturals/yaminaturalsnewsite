import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card/Card';
import { requirementService } from '../../services/RequirementService';
import { productService } from '../../services/ProductService';
import { visitorCounterService } from '../../services/VisitorCounterService';
import { leadService } from '../../services/LeadService';
import { CustomerRequirement, Product } from '../../types';

export const AdminAnalytics: React.FC = () => {
  const [visitorCount, setVisitorCount] = useState<number>(0);
  const [requirements, setRequirements] = useState<CustomerRequirement[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [leadCount, setLeadCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      visitorCounterService.fetchLatestCount(),
      requirementService.getRequirements(),
      productService.getProducts(),
      leadService.getLeads()
    ]).then(([visitors, reqs, prods, leads]) => {
      setVisitorCount(visitors);
      setRequirements(reqs);
      setProducts(prods);
      setLeadCount(leads.length);
      setLoading(false);
    });
  }, []);

  const b2bCount = requirements.filter(r => r.customerType === 'b2b').length;
  const b2cCount = requirements.filter(r => r.customerType === 'b2c').length;
  const totalReqs = requirements.length;
  const b2bPercent = totalReqs > 0 ? Math.round((b2bCount / totalReqs) * 100) : 0;
  const b2cPercent = totalReqs > 0 ? 100 - b2bPercent : 0;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ borderBottom: '1px solid #E5E7EB', paddingBottom: '1rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#111827', margin: 0 }}>Operational Analytics</h1>
        <p style={{ fontSize: '0.875rem', color: '#6B7280', margin: '0.25rem 0 0' }}>
          Data-driven intelligence on customer inquiry volumes, category demand, and procurement metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 tablet-grid-cols-4 gap-5">
        <Card variant="surface" padding="md">
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#6B7280' }}>Total Inbound RFQs</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0D5C3A', margin: '0.25rem 0' }}>
            {loading ? '...' : totalReqs}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>Live customer requests</div>
        </Card>

        <Card variant="surface" padding="md">
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#6B7280' }}>Live Unique Visitors</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#111827', margin: '0.25rem 0' }}>
            {loading ? '...' : visitorCount.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 500 }}>Tracked web sessions</div>
        </Card>

        <Card variant="surface" padding="md">
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#6B7280' }}>Published Materials</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0D5C3A', margin: '0.25rem 0' }}>
            {loading ? '...' : products.length}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>Active catalog items</div>
        </Card>

        <Card variant="surface" padding="md">
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#6B7280' }}>Contact Inquiries</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#111827', margin: '0.25rem 0' }}>
            {loading ? '...' : leadCount}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>General leads</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 tablet-grid-cols-2 gap-6">
        <Card variant="surface" padding="lg">
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 1rem 0' }}>Inquiry Distribution by Channel</h3>
          {totalReqs === 0 ? (
            <p style={{ fontSize: '0.85rem', color: '#6B7280' }}>No RFQs recorded yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span>B2B Wholesale / Industrial Importers</span>
                  <strong>{b2bPercent}% ({b2bCount})</strong>
                </div>
                <div style={{ height: '8px', backgroundColor: '#E5E7EB', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${b2bPercent}%`, height: '100%', backgroundColor: '#0D5C3A' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span>B2C Direct / Retail Formulation</span>
                  <strong>{b2cPercent}% ({b2cCount})</strong>
                </div>
                <div style={{ height: '8px', backgroundColor: '#E5E7EB', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${b2cPercent}%`, height: '100%', backgroundColor: '#4ADE80' }} />
                </div>
              </div>
            </div>
          )}
        </Card>

        <Card variant="surface" padding="lg">
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 1rem 0' }}>Catalog Botanical Ingredients</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem' }}>
            {products.slice(0, 5).map((p, idx) => (
              <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: idx < 4 ? '1px solid #F3F4F6' : 'none' }}>
                <span>{idx + 1}. {p.name}</span>
                <strong style={{ color: '#0D5C3A' }}>{p.categoryName || 'Botanical'}</strong>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
