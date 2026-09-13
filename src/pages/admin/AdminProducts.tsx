import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card/Card';
import { Button } from '../../components/ui/Button/Button';
import { Badge } from '../../components/ui/Badge/Badge';
import { productService } from '../../services/ProductService';
import { Product } from '../../types';

export const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = () => {
    setLoading(true);
    productService.getProducts().then((res) => {
      setProducts(res);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from the catalogue?`)) {
      await productService.deleteProduct(id);
      loadProducts();
    }
  };

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <div>
          <h2>Product & Material Catalog</h2>
          <p className="text-sm text-muted">Manage herbal powders, standardized extracts, carrier oils, and capsules.</p>
        </div>
        <Button to="/admin/products/add" variant="primary">
          + Add New Product
        </Button>
      </div>

      <Card variant="surface" padding="lg">
        {loading ? (
          <p className="text-muted">Loading products from repository...</p>
        ) : products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
            <h4>No products found in the catalog.</h4>
            <p className="text-sm text-muted" style={{ marginBottom: 'var(--space-4)' }}>Click the button below to add your first botanical item.</p>
            <Button to="/admin/products/add" variant="primary">
              Add Product
            </Button>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', fontSize: 'var(--font-size-sm)' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-border-subtle)', textAlign: 'left', color: 'var(--color-text-muted)' }}>
                  <th style={{ padding: '0.65rem' }}>Name & Botanical</th>
                  <th style={{ padding: '0.65rem' }}>Category</th>
                  <th style={{ padding: '0.65rem' }}>Active / Mesh</th>
                  <th style={{ padding: '0.65rem' }}>Channels</th>
                  <th style={{ padding: '0.65rem' }}>Status</th>
                  <th style={{ padding: '0.65rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                    <td style={{ padding: '0.65rem' }}>
                      <div style={{ fontWeight: 600 }}>{p.name}</div>
                      <div style={{ fontSize: 'var(--font-size-xs)', fontStyle: 'italic', color: 'var(--color-text-muted)' }}>
                        {p.botanicalName}
                      </div>
                    </td>
                    <td style={{ padding: '0.65rem' }}>
                      <Badge variant="primary">{p.categoryName || 'Herbal'}</Badge>
                    </td>
                    <td style={{ padding: '0.65rem', fontSize: 'var(--font-size-xs)' }}>
                      <div>{p.specifications.activeCompound || '-'}</div>
                      <div style={{ color: 'var(--color-text-muted)' }}>{p.specifications.meshSize || ''}</div>
                    </td>
                    <td style={{ padding: '0.65rem' }}>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        {p.b2bAvailable && <Badge variant="neutral">B2B</Badge>}
                        {p.b2cAvailable && <Badge variant="accent">B2C</Badge>}
                      </div>
                    </td>
                    <td style={{ padding: '0.65rem' }}>
                      <Badge variant="success">{p.availability}</Badge>
                    </td>
                    <td style={{ padding: '0.65rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: 'var(--space-2)', justifyContent: 'flex-end' }}>
                        <Link to={`/products/${p.slug}`} target="_blank" style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-primary-600)', padding: '0.2rem 0.5rem' }}>
                          View
                        </Link>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(p.id, p.name)}
                          style={{ color: 'var(--color-error)' }}
                        >
                          Delete
                        </Button>
                      </div>
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
