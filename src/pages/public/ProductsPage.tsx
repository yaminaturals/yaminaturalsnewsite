import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Container } from '../../components/ui/Container/Container';
import { Card } from '../../components/ui/Card/Card';
import { Badge } from '../../components/ui/Badge/Badge';
import { Button } from '../../components/ui/Button/Button';
import { productService } from '../../services/ProductService';
import { categoryService } from '../../services/CategoryService';
import { Product, ProductCategory } from '../../types';

export const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategorySlug = searchParams.get('category') || '';

  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    categoryService.getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    setLoading(true);
    let categoryId: string | undefined;
    if (activeCategorySlug && categories.length > 0) {
      const match = categories.find(c => c.slug === activeCategorySlug);
      if (match) categoryId = match.id;
    }

    productService.getProducts({
      categoryId,
      searchQuery: searchQuery || undefined
    }).then(res => {
      setProducts(res);
      setLoading(false);
    });
  }, [activeCategorySlug, searchQuery, categories]);

  const handleCategorySelect = (slug: string) => {
    if (slug === activeCategorySlug) {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: slug });
    }
  };

  return (
    <div className="products-page animate-fade-in" style={{ padding: 'clamp(2.5rem, 5vw, 5rem) 0' }}>
      <Container size="wide">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto var(--space-8)' }}>
          <span className="eyebrow">Ingredient Catalogue</span>
          <h1>Explore Botanical Materials</h1>
          <p className="text-muted">
            Search our verified catalogue of herbal powders, standardized extracts, oils, clays, and formulation ingredients.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <div style={{ maxWidth: '480px', margin: '0 auto var(--space-6)' }}>
            <input
              type="text"
              placeholder="Search by ingredient name, botanical name, or use..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1.25rem',
                fontSize: 'var(--font-size-sm)',
                border: '1px solid var(--color-border-medium)',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-bg-surface)',
                outline: 'none'
              }}
            />
          </div>

          {/* Category Chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', justifyContent: 'center' }}>
            <button
              type="button"
              onClick={() => handleCategorySelect('')}
              style={{
                padding: '0.45rem 1rem',
                borderRadius: 'var(--radius-full)',
                fontSize: 'var(--font-size-xs)',
                fontWeight: 600,
                border: '1px solid var(--color-border-medium)',
                backgroundColor: !activeCategorySlug ? 'var(--color-primary-600)' : 'var(--color-bg-surface)',
                color: !activeCategorySlug ? '#ffffff' : 'var(--color-text-body)',
                cursor: 'pointer'
              }}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategorySelect(cat.slug)}
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: 600,
                  border: '1px solid var(--color-border-medium)',
                  backgroundColor: activeCategorySlug === cat.slug ? 'var(--color-primary-600)' : 'var(--color-bg-surface)',
                  color: activeCategorySlug === cat.slug ? '#ffffff' : 'var(--color-text-body)',
                  cursor: 'pointer'
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="text-center" style={{ padding: 'var(--space-12)' }}>
            <p className="text-muted">Loading product specifications...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center" style={{ padding: 'var(--space-12)' }}>
            <h3>No products found matching your search.</h3>
            <p className="text-muted" style={{ marginBottom: 'var(--space-4)' }}>
              Looking for a material not currently displayed? You can submit custom sourcing requirements directly.
            </p>
            <Button to="/submit-requirement" variant="primary">
              Submit Custom Requirement
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 tablet-grid-cols-2 desktop-grid-cols-3 gap-6">
            {products.map((prod) => (
              <Card key={prod.id} variant="surface" hoverable padding="md" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-3)' }}>
                  <Badge variant="primary">{prod.categoryName || 'Botanical'}</Badge>
                  {prod.b2bAvailable && <Badge variant="neutral">B2B Bulk</Badge>}
                </div>

                <h3 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--space-1)' }}>
                  <Link to={`/products/${prod.slug}`} style={{ color: 'inherit' }}>
                    {prod.name}
                  </Link>
                </h3>

                <div style={{ fontSize: 'var(--font-size-xs)', fontStyle: 'italic', color: 'var(--color-primary-700)', marginBottom: 'var(--space-3)' }}>
                  {prod.botanicalName}
                </div>

                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-body)', flex: 1, marginBottom: 'var(--space-4)' }}>
                  {prod.shortDescription}
                </p>

                {/* Technical highlights */}
                <div style={{ backgroundColor: 'var(--color-bg-subtle)', padding: 'var(--space-3)', borderRadius: 'var(--radius-sm)', marginBottom: 'var(--space-4)', fontSize: 'var(--font-size-xs)' }}>
                  {prod.specifications.activeCompound && (
                    <div><strong>Active:</strong> {prod.specifications.activeCompound}</div>
                  )}
                  {prod.specifications.meshSize && (
                    <div><strong>Mesh:</strong> {prod.specifications.meshSize}</div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                  <Button to={`/products/${prod.slug}`} variant="outline" size="sm" fullWidth>
                    View Specs
                  </Button>
                  <Button to={`/submit-requirement?product=${encodeURIComponent(prod.name)}`} variant="primary" size="sm" fullWidth>
                    Inquire / Quote
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};
