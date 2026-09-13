import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card/Card';
import { Badge } from '../../components/ui/Badge/Badge';
import { Button } from '../../components/ui/Button/Button';
import { productService } from '../../services/ProductService';
import { requirementService } from '../../services/RequirementService';
import { CustomerRequirement, Product } from '../../types';

export const AdminDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [requirements, setRequirements] = useState<CustomerRequirement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      productService.getProducts(),
      requirementService.getRequirements()
    ]).then(([prods, reqs]) => {
      setProducts(prods);
      setRequirements(reqs);
      setLoading(false);
    });
  }, []);

  const newRequirementsCount = requirements.filter(r => r.status === 'new').length;

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <div>
          <h2>Procurement Operations Dashboard</h2>
          <p className="text-sm text-muted">Overview of active products, material inquiries, and sourcing submissions.</p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <Button to="/admin/products/add" variant="primary" size="sm">
            + Add New Product
          </Button>
          <Button to="/admin/requirements" variant="secondary" size="sm">
            Review Requirements
          </Button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 tablet-grid-cols-3 gap-6" style={{ marginBottom: 'var(--space-8)' }}>
        <Card variant="surface" padding="md">
          <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
            Active Botanical Products
          </div>
          <div style={{ fontSize: '2.4rem', fontWeight: 700, color: 'var(--color-primary-800)', margin: 'var(--space-2) 0' }}>
            {loading ? '...' : products.length}
          </div>
          <Link to="/admin/products" style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-primary-600)', fontWeight: 600 }}>
            Manage product catalog →
          </Link>
        </Card>

        <Card variant="surface" padding="md">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
              Pending Requirements
            </div>
            {newRequirementsCount > 0 && <Badge variant="warning">{newRequirementsCount} New</Badge>}
          </div>
          <div style={{ fontSize: '2.4rem', fontWeight: 700, color: 'var(--color-accent-600)', margin: 'var(--space-2) 0' }}>
            {loading ? '...' : newRequirementsCount}
          </div>
          <Link to="/admin/requirements" style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-accent-600)', fontWeight: 600 }}>
            Review pending submissions →
          </Link>
        </Card>

        <Card variant="surface" padding="md">
          <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
            Total Procurement Records
          </div>
          <div style={{ fontSize: '2.4rem', fontWeight: 700, color: 'var(--color-primary-700)', margin: 'var(--space-2) 0' }}>
            {loading ? '...' : requirements.length}
          </div>
          <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-subtle)' }}>
            Stored in local prototype repository
          </span>
        </Card>
      </div>

      {/* Recent Submissions Table */}
      <Card variant="surface" padding="lg">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
          <h4>Recent Customer Requirements</h4>
          <Link to="/admin/requirements" style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-primary-600)', fontWeight: 600 }}>
            View All ({requirements.length})
          </Link>
        </div>

        {requirements.length === 0 ? (
          <p className="text-sm text-muted">No requirement records captured yet.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', fontSize: 'var(--font-size-sm)' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-border-subtle)', textAlign: 'left', color: 'var(--color-text-muted)' }}>
                  <th style={{ padding: '0.65rem' }}>Ref #</th>
                  <th style={{ padding: '0.65rem' }}>Client</th>
                  <th style={{ padding: '0.65rem' }}>Type</th>
                  <th style={{ padding: '0.65rem' }}>Material</th>
                  <th style={{ padding: '0.65rem' }}>Quantity</th>
                  <th style={{ padding: '0.65rem' }}>Status</th>
                  <th style={{ padding: '0.65rem' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {requirements.slice(0, 5).map((req) => (
                  <tr key={req.id} style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                    <td style={{ padding: '0.65rem', fontWeight: 600 }}>{req.referenceNumber}</td>
                    <td style={{ padding: '0.65rem' }}>
                      <div>{req.contact.fullName}</div>
                      {req.contact.companyName && (
                        <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                          {req.contact.companyName}
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '0.65rem' }}>
                      <Badge variant={req.customerType === 'b2b' ? 'neutral' : 'accent'}>
                        {req.customerType.toUpperCase()}
                      </Badge>
                    </td>
                    <td style={{ padding: '0.65rem' }}>{req.productName}</td>
                    <td style={{ padding: '0.65rem' }}>{req.requiredQuantity} {req.quantityUnit}</td>
                    <td style={{ padding: '0.65rem' }}>
                      <Badge variant={req.status === 'new' ? 'warning' : 'primary'}>
                        {req.status}
                      </Badge>
                    </td>
                    <td style={{ padding: '0.65rem' }}>
                      <Button to={`/admin/requirements`} variant="outline" size="sm">
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
  );
};
