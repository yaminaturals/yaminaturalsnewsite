import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card/Card';
import { Button } from '../../components/ui/Button/Button';
import { productService } from '../../services/ProductService';
import { categoryService } from '../../services/CategoryService';
import { ProductCategory } from '../../types';

export const AdminProductAdd: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Form fields
  const [name, setName] = useState('');
  const [botanicalName, setBotanicalName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [activeCompound, setActiveCompound] = useState('');
  const [meshSize, setMeshSize] = useState('80 Mesh');
  const [shelfLife, setShelfLife] = useState('24 Months');
  const [storageInstructions, setStorageInstructions] = useState('Store in cool, dry place');
  const [packaging, setPackaging] = useState('25 kg Fiber Drums');
  const [moq, setMoq] = useState('25 kg');
  const [b2bAvailable, setB2bAvailable] = useState(true);
  const [b2cAvailable, setB2cAvailable] = useState(false);

  useEffect(() => {
    categoryService.getCategories().then((cats) => {
      setCategories(cats);
      if (cats.length > 0) setCategoryId(cats[0].id);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !categoryId) {
      setError('Please provide the product name and select a category.');
      return;
    }

    setIsSubmitting(true);

    try {
      const selectedCat = categories.find(c => c.id === categoryId);
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

      await productService.createProduct({
        name,
        slug,
        botanicalName,
        categoryId,
        categoryName: selectedCat?.name || 'Herbal',
        shortDescription,
        fullDescription: fullDescription || shortDescription,
        primaryImage: '/images/products/placeholder.jpg',
        images: ['/images/products/placeholder.jpg'],
        applications: ['Formulation Ingredient', 'Botanical Sourcing'],
        specifications: {
          appearance: 'Standard botanical specification',
          botanicalName,
          activeCompound,
          meshSize,
          shelfLife,
          storageInstructions
        },
        packagingOptions: [packaging],
        documents: [],
        availability: 'in-stock',
        featured: false,
        b2bAvailable,
        b2cAvailable,
        minimumOrderQuantity: moq,
        seo: {
          title: `${name} | Yami Naturals Sourcing`,
          description: shortDescription,
          keywords: [name, botanicalName]
        }
      });

      navigate('/admin/products');
    } catch {
      setError('Failed to create product in repository.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <Link to="/admin/products" style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-primary-600)' }}>
          ← Back to Product List
        </Link>
        <h2 style={{ marginTop: 'var(--space-2)' }}>Add New Botanical Product</h2>
        <p className="text-sm text-muted">Create a new entry in the persistent botanical repository.</p>
      </div>

      <Card variant="surface" padding="lg">
        {error && (
          <div style={{ backgroundColor: 'var(--color-error-bg)', color: 'var(--color-error)', padding: 'var(--space-3)', borderRadius: 'var(--radius-sm)', marginBottom: 'var(--space-4)', fontSize: 'var(--font-size-xs)' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
            <div>
              <label style={{ display: 'block', fontSize: 'var(--font-size-xs)', fontWeight: 600, marginBottom: 'var(--space-1)' }}>
                Product / Ingredient Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Shatavari Root Extract"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: '100%', padding: '0.65rem 0.85rem', border: '1px solid var(--color-border-medium)', borderRadius: 'var(--radius-sm)' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 'var(--font-size-xs)', fontWeight: 600, marginBottom: 'var(--space-1)' }}>
                Botanical / INCI Name
              </label>
              <input
                type="text"
                placeholder="e.g. Asparagus racemosus"
                value={botanicalName}
                onChange={(e) => setBotanicalName(e.target.value)}
                style={{ width: '100%', padding: '0.65rem 0.85rem', border: '1px solid var(--color-border-medium)', borderRadius: 'var(--radius-sm)' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 'var(--font-size-xs)', fontWeight: 600, marginBottom: 'var(--space-1)' }}>
              Category *
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              style={{ width: '100%', padding: '0.65rem 0.85rem', border: '1px solid var(--color-border-medium)', borderRadius: 'var(--radius-sm)', backgroundColor: '#ffffff' }}
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 'var(--font-size-xs)', fontWeight: 600, marginBottom: 'var(--space-1)' }}>
              Short Description (Card Summary) *
            </label>
            <textarea
              required
              rows={2}
              placeholder="Brief summary for product catalogue cards..."
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              style={{ width: '100%', padding: '0.65rem 0.85rem', border: '1px solid var(--color-border-medium)', borderRadius: 'var(--radius-sm)' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 'var(--font-size-xs)', fontWeight: 600, marginBottom: 'var(--space-1)' }}>
              Detailed Description / Technical Monograph
            </label>
            <textarea
              rows={3}
              placeholder="Comprehensive botanical source and processing description..."
              value={fullDescription}
              onChange={(e) => setFullDescription(e.target.value)}
              style={{ width: '100%', padding: '0.65rem 0.85rem', border: '1px solid var(--color-border-medium)', borderRadius: 'var(--radius-sm)' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
            <div>
              <label style={{ display: 'block', fontSize: 'var(--font-size-xs)', fontWeight: 600, marginBottom: 'var(--space-1)' }}>
                Active Compound / Standardization
              </label>
              <input
                type="text"
                placeholder="e.g. Saponins ≥ 20%"
                value={activeCompound}
                onChange={(e) => setActiveCompound(e.target.value)}
                style={{ width: '100%', padding: '0.65rem 0.85rem', border: '1px solid var(--color-border-medium)', borderRadius: 'var(--radius-sm)' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 'var(--font-size-xs)', fontWeight: 600, marginBottom: 'var(--space-1)' }}>
                Mesh Size
              </label>
              <input
                type="text"
                value={meshSize}
                onChange={(e) => setMeshSize(e.target.value)}
                style={{ width: '100%', padding: '0.65rem 0.85rem', border: '1px solid var(--color-border-medium)', borderRadius: 'var(--radius-sm)' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
            <div>
              <label style={{ display: 'block', fontSize: 'var(--font-size-xs)', fontWeight: 600, marginBottom: 'var(--space-1)' }}>
                Shelf Life
              </label>
              <input
                type="text"
                value={shelfLife}
                onChange={(e) => setShelfLife(e.target.value)}
                style={{ width: '100%', padding: '0.65rem 0.85rem', border: '1px solid var(--color-border-medium)', borderRadius: 'var(--radius-sm)' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 'var(--font-size-xs)', fontWeight: 600, marginBottom: 'var(--space-1)' }}>
                Storage Instructions
              </label>
              <input
                type="text"
                value={storageInstructions}
                onChange={(e) => setStorageInstructions(e.target.value)}
                style={{ width: '100%', padding: '0.65rem 0.85rem', border: '1px solid var(--color-border-medium)', borderRadius: 'var(--radius-sm)' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
            <div>
              <label style={{ display: 'block', fontSize: 'var(--font-size-xs)', fontWeight: 600, marginBottom: 'var(--space-1)' }}>
                Minimum Order Quantity (MOQ)
              </label>
              <input
                type="text"
                value={moq}
                onChange={(e) => setMoq(e.target.value)}
                style={{ width: '100%', padding: '0.65rem 0.85rem', border: '1px solid var(--color-border-medium)', borderRadius: 'var(--radius-sm)' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 'var(--font-size-xs)', fontWeight: 600, marginBottom: 'var(--space-1)' }}>
                Packaging Options
              </label>
              <input
                type="text"
                value={packaging}
                onChange={(e) => setPackaging(e.target.value)}
                style={{ width: '100%', padding: '0.65rem 0.85rem', border: '1px solid var(--color-border-medium)', borderRadius: 'var(--radius-sm)' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: 'var(--space-6)', padding: 'var(--space-3) 0' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--font-size-sm)', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={b2bAvailable}
                onChange={(e) => setB2bAvailable(e.target.checked)}
              />
              Available for B2B Wholesale
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--font-size-sm)', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={b2cAvailable}
                onChange={(e) => setB2cAvailable(e.target.checked)}
              />
              Available for B2C Retail
            </label>
          </div>

          <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end', marginTop: 'var(--space-4)' }}>
            <Button to="/admin/products" variant="outline" type="button">
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={isSubmitting}>
              Save Botanical Product
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
