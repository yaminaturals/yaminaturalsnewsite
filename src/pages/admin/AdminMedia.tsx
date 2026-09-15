import React, { useState } from 'react';
import { Card } from '../../components/ui/Card/Card';
import { Button } from '../../components/ui/Button/Button';
import { initialProducts } from '../../data/products.data';

export const AdminMedia: React.FC = () => {
  const [filterType, setFilterType] = useState<'all' | 'products' | 'coa'>('all');

  const mediaAssets = initialProducts.map(p => ({
    id: p.id,
    name: p.name,
    imageUrl: p.primaryImage || (p.images && p.images[0]) || '/logo.png',
    category: p.categoryName || 'Botanicals',
    type: 'product'
  }));

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid #E5E7EB', paddingBottom: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#111827', margin: 0 }}>Media & Document Library</h1>
          <p style={{ fontSize: '0.875rem', color: '#6B7280', margin: '0.25rem 0 0' }}>
            Botanical photography, technical specification sheets, and verified CoA assets.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {(['all', 'products', 'coa'] as const).map(tab => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilterType(tab)}
              style={{
                padding: '0.45rem 0.85rem',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 600,
                border: '1px solid #E5E7EB',
                backgroundColor: filterType === tab ? '#0D5C3A' : '#FFFFFF',
                color: filterType === tab ? '#FFFFFF' : '#374151',
                cursor: 'pointer',
                textTransform: 'uppercase'
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <Card variant="surface" padding="lg">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>Active Botanical Images ({mediaAssets.length})</h3>
          <Button variant="outline" size="sm">
            + Upload New Media
          </Button>
        </div>

        <div className="grid grid-cols-2 tablet-grid-cols-4 gap-4">
          {mediaAssets.map((item) => (
            <div
              key={item.id}
              style={{
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: '#FFFFFF',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)'
              }}
            >
              <div style={{ height: '140px', backgroundColor: '#F3F4F6', position: 'relative' }}>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    // Graceful fallback for demo images
                    (e.target as HTMLImageElement).src = '/logo.png';
                  }}
                />
              </div>
              <div style={{ padding: '0.65rem' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {item.name}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#6B7280', marginTop: '2px' }}>
                  {item.category}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
