import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container } from '../../components/ui/Container/Container';
import { Button } from '../../components/ui/Button/Button';
import { Card } from '../../components/ui/Card/Card';
import { Badge } from '../../components/ui/Badge/Badge';
import { productService } from '../../services/ProductService';
import { Product } from '../../types';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      productService.getProductBySlug(slug).then(prod => {
        setProduct(prod);
        setLoading(false);
      });
    }
  }, [slug]);

  if (loading) {
    return (
      <div style={{ padding: 'var(--space-20) 0', textAlign: 'center' }}>
        <Container size="default">
          <p className="text-muted">Loading technical monograph...</p>
        </Container>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ padding: 'var(--space-20) 0', textAlign: 'center' }}>
        <Container size="default">
          <h2>Product Not Found</h2>
          <p className="text-muted" style={{ marginBottom: 'var(--space-4)' }}>
            The requested botanical material could not be located.
          </p>
          <Button to="/products" variant="primary">
            Return to Catalogue
          </Button>
        </Container>
      </div>
    );
  }

  return (
    <div className="product-detail-page animate-fade-in" style={{ padding: 'clamp(2.5rem, 5vw, 5rem) 0' }}>
      <Container size="default">
        {/* Breadcrumb Navigation */}
        <nav style={{ display: 'flex', gap: 'var(--space-2)', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-subtle)', marginBottom: 'var(--space-4)' }}>
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/products">Products</Link>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        {/* Product Overview Header */}
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
            <Badge variant="primary">{product.categoryName || 'Botanical'}</Badge>
            {product.b2bAvailable && <Badge variant="neutral">B2B Bulk Volume</Badge>}
            {product.b2cAvailable && <Badge variant="accent">B2C Packs</Badge>}
          </div>
          <h1>{product.name}</h1>
          <div style={{ fontSize: 'var(--font-size-lg)', fontStyle: 'italic', color: 'var(--color-primary-700)', marginBottom: 'var(--space-4)' }}>
            Botanical: {product.botanicalName}
          </div>
          <p className="text-lead" style={{ maxWidth: '800px' }}>
            {product.fullDescription}
          </p>
        </div>

        {/* Grid layout for Technical Specs and Sourcing Box */}
        <div className="grid grid-cols-1 tablet-grid-cols-2 gap-8" style={{ alignItems: 'start' }}>
          {/* Left: Technical Specification Sheet */}
          <div>
            <Card variant="surface" padding="md">
              <h4 style={{ borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                Technical Specifications (TDS)
              </h4>
              <table style={{ width: '100%', fontSize: 'var(--font-size-sm)' }}>
                <tbody>
                  {Object.entries(product.specifications).map(([key, val]) => (
                    val ? (
                      <tr key={key} style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                        <td style={{ padding: '0.65rem 0', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'capitalize', width: '40%' }}>
                          {key.replace(/([A-Z])/g, ' $1')}
                        </td>
                        <td style={{ padding: '0.65rem 0', color: 'var(--color-text-main)' }}>
                          {val}
                        </td>
                      </tr>
                    ) : null
                  ))}
                </tbody>
              </table>

              {/* Applications */}
              <div style={{ marginTop: 'var(--space-6)' }}>
                <h6 style={{ marginBottom: 'var(--space-2)' }}>Intended Applications:</h6>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                  {product.applications.map((app, i) => (
                    <Badge key={i} variant="neutral">{app}</Badge>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Right: Procurement & Requirement Submission Box */}
          <div>
            <Card variant="tinted" padding="lg">
              <span className="eyebrow">Direct Procurement</span>
              <h3 style={{ marginBottom: 'var(--space-3)' }}>Request Material Specification & Volume Quote</h3>
              <p className="text-sm text-muted" style={{ marginBottom: 'var(--space-4)' }}>
                Yami Naturals coordinates direct verified sourcing for this material. Submit your target volume, grade, or custom formulation specifications.
              </p>

              <div style={{ backgroundColor: '#ffffff', padding: 'var(--space-4)', borderRadius: 'var(--radius-sm)', marginBottom: 'var(--space-6)' }}>
                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>MINIMUM ORDER QUANTITY:</div>
                <div style={{ fontWeight: 'bold', color: 'var(--color-primary-800)', fontSize: 'var(--font-size-md)' }}>
                  {product.minimumOrderQuantity || 'Standard commercial lots'}
                </div>
                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginTop: 'var(--space-2)' }}>
                  PACKAGING OPTIONS:
                </div>
                <ul style={{ fontSize: 'var(--font-size-xs)', paddingLeft: 'var(--space-4)', listStyle: 'disc' }}>
                  {product.packagingOptions.map((pkg, i) => (
                    <li key={i}>{pkg}</li>
                  ))}
                </ul>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <Button
                  to={`/submit-requirement?product=${encodeURIComponent(product.name)}`}
                  variant="primary"
                  size="lg"
                  fullWidth
                >
                  Submit Requirement for this Material
                </Button>
                <Button
                  to="/contact"
                  variant="outline"
                  size="md"
                  fullWidth
                >
                  Ask Procurement Desk a Question
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};
