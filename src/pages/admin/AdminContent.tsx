import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card/Card';
import { Badge } from '../../components/ui/Badge/Badge';
import { Button } from '../../components/ui/Button/Button';
import { categoryService } from '../../services/CategoryService';
import { ProductCategory } from '../../types';

export const AdminContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'categories-order' | 'hero-announcements' | 'certifications' | 'faqs'>('categories-order');
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [announcementText, setAnnouncementText] = useState(
    'Leading Exporter & Bulk Supplier of 100% Pure Botanical Extracts, Herbal Powders, and Essential Oils.'
  );
  const [heroHeading, setHeroHeading] = useState('Standardized Botanical Extracts & Pure Herbal Powders');
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    categoryService.getCategories().then(setCategories);
  }, []);

  const handleOrderChange = (id: string, newOrder: number) => {
    const updated = categories.map(c => c.id === id ? { ...c, displayOrder: newOrder } : c);
    setCategories(updated.sort((a, b) => a.displayOrder - b.displayOrder));
  };

  const handleSaveCategoriesOrder = async () => {
    await categoryService.saveCategories(categories);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleSaveContent = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1000px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid #E5E7EB', paddingBottom: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#111827', margin: 0 }}>Website Manager</h1>
          <p style={{ fontSize: '0.875rem', color: '#6B7280', margin: '0.25rem 0 0' }}>
            Manage category display priority, homepage copy, banner announcements, and certifications.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {[
            { id: 'categories-order', label: '📁 Category Priority' },
            { id: 'hero-announcements', label: '📝 Hero & Banner' },
            { id: 'certifications', label: '✓ Certifications' },
            { id: 'faqs', label: '❓ FAQs' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '0.45rem 0.85rem',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 600,
                border: '1px solid #E5E7EB',
                backgroundColor: activeTab === tab.id ? '#0D5C3A' : '#FFFFFF',
                color: activeTab === tab.id ? '#FFFFFF' : '#374151',
                cursor: 'pointer'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {saveSuccess && (
        <div style={{ padding: '0.85rem 1.25rem', backgroundColor: '#DCFCE7', color: '#15803D', borderRadius: '8px', fontSize: '0.875rem', fontWeight: 600, border: '1px solid #86EFAC' }}>
          ✓ Website configurations updated successfully!
        </div>
      )}

      {/* 1. Category Priority & Order Tab */}
      {activeTab === 'categories-order' && (
        <Card variant="surface" padding="lg">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0, color: '#0D5C3A' }}>
                Category Priority & Navigation Order
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#6B7280', margin: '0.25rem 0 0' }}>
                Set display order number (1 = First, 2 = Second...) to determine which categories appear first on the public website.
              </p>
            </div>

            <Button type="button" variant="primary" size="sm" onClick={handleSaveCategoriesOrder}>
              Save Category Order
            </Button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ textAlign: 'left', color: '#6B7280', borderBottom: '1px solid #E5E7EB', fontSize: '0.8rem' }}>
                  <th style={{ padding: '0.65rem 0.5rem' }}>Priority Position</th>
                  <th style={{ padding: '0.65rem 0.5rem' }}>Category Name</th>
                  <th style={{ padding: '0.65rem 0.5rem' }}>Slug</th>
                  <th style={{ padding: '0.65rem 0.5rem' }}>Active Products</th>
                  <th style={{ padding: '0.65rem 0.5rem', textAlign: 'right' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((c, idx) => (
                  <tr key={c.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                    <td style={{ padding: '0.65rem 0.5rem' }}>
                      <input
                        type="number"
                        min={1}
                        max={99}
                        value={c.displayOrder || idx + 1}
                        onChange={(e) => handleOrderChange(c.id, parseInt(e.target.value) || 1)}
                        style={{
                          width: '60px',
                          padding: '0.35rem 0.5rem',
                          borderRadius: '6px',
                          border: '1px solid #D1D5DB',
                          fontSize: '0.85rem',
                          fontWeight: 700,
                          textAlign: 'center'
                        }}
                      />
                    </td>
                    <td style={{ padding: '0.65rem 0.5rem', fontWeight: 700, color: '#111827' }}>
                      {c.name}
                    </td>
                    <td style={{ padding: '0.65rem 0.5rem', fontFamily: 'monospace', fontSize: '0.8rem', color: '#6B7280' }}>
                      {c.slug}
                    </td>
                    <td style={{ padding: '0.65rem 0.5rem' }}>
                      <Badge variant="primary">{c.productCount} Materials</Badge>
                    </td>
                    <td style={{ padding: '0.65rem 0.5rem', textAlign: 'right' }}>
                      <Badge variant="success">Visible</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* 2. Hero & Banner Text */}
      {activeTab === 'hero-announcements' && (
        <Card variant="surface" padding="lg">
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 1rem 0', color: '#0D5C3A' }}>
            Homepage Hero Headline & Top Banner
          </h3>
          <form onSubmit={handleSaveContent} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>
                Main Hero Headline:
              </label>
              <input
                type="text"
                value={heroHeading}
                onChange={(e) => setHeroHeading(e.target.value)}
                style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.875rem', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>
                Announcement Strip Text:
              </label>
              <textarea
                rows={3}
                value={announcementText}
                onChange={(e) => setAnnouncementText(e.target.value)}
                style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.875rem', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button type="submit" variant="primary">
                Save Hero & Banner
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* 3. Certifications */}
      {activeTab === 'certifications' && (
        <Card variant="surface" padding="lg">
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 1rem 0', color: '#0D5C3A' }}>
            Published Quality Certifications
          </h3>
          <div className="grid grid-cols-1 tablet-grid-cols-3 gap-4">
            {[
              'ISO 9001:2015 Quality Management',
              'GMP Certified Manufacturing Facility',
              'HACCP Food Safety Certified',
              'USDA Organic Certified Sources',
              'Halal & Kosher Compliance',
              'FSSAI Licensed Facility'
            ].map((cert, idx) => (
              <div key={idx} style={{ padding: '1rem', border: '1px solid #E5E7EB', borderRadius: '8px', backgroundColor: '#F9FAFB' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0D5C3A' }}>✓ Certified</span>
                  <Badge variant="success">Active</Badge>
                </div>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#111827' }}>{cert}</div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* 4. FAQs */}
      {activeTab === 'faqs' && (
        <Card variant="surface" padding="lg">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0, color: '#0D5C3A' }}>
              Public Procurement FAQs
            </h3>
            <a href="/faq" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.8rem', color: '#0D5C3A', fontWeight: 600 }}>
              View Public FAQ Page ↗
            </a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ padding: '0.85rem', border: '1px solid #E5E7EB', borderRadius: '8px', backgroundColor: '#FFFFFF' }}>
              <strong>What is the typical Minimum Order Quantity (MOQ)?</strong>
              <p style={{ fontSize: '0.82rem', color: '#6B7280', margin: '0.35rem 0 0' }}>
                Standard MOQ for standardized extracts is 25 kg in fiber drums. Custom pilot test batches are available from 1 kg.
              </p>
            </div>
            <div style={{ padding: '0.85rem', border: '1px solid #E5E7EB', borderRadius: '8px', backgroundColor: '#FFFFFF' }}>
              <strong>Do you provide batch-specific Certificate of Analysis (CoA)?</strong>
              <p style={{ fontSize: '0.82rem', color: '#6B7280', margin: '0.35rem 0 0' }}>
                Yes, every single export consignment is dispatched with a verified HPLC/GC-MS Certificate of Analysis, heavy metals screen, and microbiological analysis.
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
