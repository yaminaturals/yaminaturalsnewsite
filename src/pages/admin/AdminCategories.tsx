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
    <div className="animate-fade-in">
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h2>Product Categories Management</h2>
        <p className="text-sm text-muted">Manage product taxonomy classifications across whole powders, extracts, oils, and clays.</p>
      </div>

      <Card variant="surface" padding="lg">
        {loading ? (
          <p className="text-muted">Loading categories...</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', fontSize: 'var(--font-size-sm)' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-border-subtle)', textAlign: 'left', color: 'var(--color-text-muted)' }}>
                  <th style={{ padding: '0.65rem' }}>Order</th>
                  <th style={{ padding: '0.65rem' }}>Category Name</th>
                  <th style={{ padding: '0.65rem' }}>Slug</th>
                  <th style={{ padding: '0.65rem' }}>Materials</th>
                  <th style={{ padding: '0.65rem' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((c) => (
                  <tr key={c.id} style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                    <td style={{ padding: '0.65rem', fontWeight: 600 }}>{c.displayOrder}</td>
                    <td style={{ padding: '0.65rem', fontWeight: 600 }}>{c.name}</td>
                    <td style={{ padding: '0.65rem', fontFamily: 'var(--font-mono)', fontSize: 'var(--font-size-xs)' }}>{c.slug}</td>
                    <td style={{ padding: '0.65rem' }}>
                      <Badge variant="primary">{c.productCount} Active</Badge>
                    </td>
                    <td style={{ padding: '0.65rem' }}>
                      <Badge variant="success">Active</Badge>
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
