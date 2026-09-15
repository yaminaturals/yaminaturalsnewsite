import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card/Card';
import { Badge } from '../../components/ui/Badge/Badge';
import { categoryService } from '../../services/CategoryService';
import { ProductCategory } from '../../types';

export const AdminCategories: React.FC = () => {
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    categoryService.getCategories().then((cats) => {
      setCategories(cats);
      setLoading(false);
    });
  }, []);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-4)', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: 'var(--space-4)' }}>
        <div>
          <h2 style={{ margin: 0, color: 'var(--color-primary-900)' }}>Product Categories & Taxonomy</h2>
          <p className="text-sm text-muted" style={{ margin: 'var(--space-1) 0 0' }}>
            Botanical classifications across herbal powders, extracts, cold-pressed oils, and clays.
          </p>
        </div>
        <a
          href="/products"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: '0.45rem 0.85rem',
            backgroundColor: 'var(--color-primary-50)',
            color: 'var(--color-primary-800)',
            borderRadius: 'var(--radius-xs)',
            fontSize: 'var(--font-size-xs)',
            fontWeight: 600,
            textDecoration: 'none',
            border: '1px solid var(--color-primary-200)'
          }}
        >
          🌐 View Public Category Grid ↗
        </a>
      </div>

      <Card variant="surface" padding="lg">
        {loading ? (
          <p className="text-muted">Loading categories...</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', fontSize: 'var(--font-size-sm)', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-border-subtle)', textAlign: 'left', color: 'var(--color-text-muted)', fontSize: 'var(--font-size-xs)' }}>
                  <th style={{ padding: '0.65rem' }}>Order</th>
                  <th style={{ padding: '0.65rem' }}>Category Name</th>
                  <th style={{ padding: '0.65rem' }}>URL Slug</th>
                  <th style={{ padding: '0.65rem' }}>Catalog Items</th>
                  <th style={{ padding: '0.65rem' }}>Status</th>
                  <th style={{ padding: '0.65rem', textAlign: 'right' }}>Website Link</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((c) => (
                  <tr key={c.id} style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                    <td style={{ padding: '0.65rem', fontWeight: 600 }}>{c.displayOrder}</td>
                    <td style={{ padding: '0.65rem', fontWeight: 600, color: 'var(--color-primary-900)' }}>{c.name}</td>
                    <td style={{ padding: '0.65rem', fontFamily: 'var(--font-mono)', fontSize: 'var(--font-size-xs)' }}>{c.slug}</td>
                    <td style={{ padding: '0.65rem' }}>
                      <Badge variant="primary">{c.productCount} Active Materials</Badge>
                    </td>
                    <td style={{ padding: '0.65rem' }}>
                      <Badge variant="success">Active</Badge>
                    </td>
                    <td style={{ padding: '0.65rem', textAlign: 'right' }}>
                      <a
                        href={`/products?category=${c.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-primary-600)', fontWeight: 600 }}
                      >
                        Explore Category ↗
                      </a>
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
