import React, { useState } from 'react';
import { Card } from '../../components/ui/Card/Card';
import { Button } from '../../components/ui/Button/Button';
import { Badge } from '../../components/ui/Badge/Badge';

export const AdminSEO: React.FC = () => {
  const [saveStatus, setSaveStatus] = useState(false);

  const pages = [
    {
      title: 'Home | Pure Botanical Extracts & Herbal Powders',
      path: '/',
      metaDesc: 'Leading Exporter & Bulk Supplier of 100% Pure Botanical Extracts, Herbal Powders, and Essential Oils. Certified ISO & GMP manufacturing facility in India.',
      indexed: true
    },
    {
      title: 'Botanical Products & Raw Materials Catalog',
      path: '/products',
      metaDesc: 'Explore our complete catalog of certified standardized herbal extracts, micro-milled powders, cold-pressed oils, and cosmetic clays.',
      indexed: true
    },
    {
      title: 'Submit Custom Material Requirement & RFQ',
      path: '/submit-requirement',
      metaDesc: 'Request direct B2B pricing, custom mesh sizes, standardized extract specifications, and batch Certificate of Analysis (CoA).',
      indexed: true
    },
    {
      title: 'B2B Sourcing Solutions & Private Labelling',
      path: '/b2b-solutions',
      metaDesc: 'Comprehensive OEM private labelling, contract manufacturing, custom formulation blending, and international export logistics.',
      indexed: true
    }
  ];

  const handleSave = () => {
    setSaveStatus(true);
    setTimeout(() => setSaveStatus(false), 3000);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid #E5E7EB', paddingBottom: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#111827', margin: 0 }}>Search Engine Optimization (SEO)</h1>
          <p style={{ fontSize: '0.875rem', color: '#6B7280', margin: '0.25rem 0 0' }}>
            Monitor and calibrate metadata, canonical URLs, and OpenGraph tags across public website routes.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={handleSave}>
          Save SEO Meta
        </Button>
      </div>

      {saveStatus && (
        <div style={{ padding: '0.75rem 1rem', backgroundColor: '#DCFCE7', color: '#15803D', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600 }}>
          ✓ Meta tags verified and saved.
        </div>
      )}

      <Card variant="surface" padding="lg">
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 1.25rem 0' }}>Public Indexing Configuration</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {pages.map((p, idx) => (
            <div key={idx} style={{ padding: '1rem', border: '1px solid #E5E7EB', borderRadius: '8px', backgroundColor: '#FAFAFA' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0D5C3A' }}>{p.path}</span>
                <Badge variant="success">Index: True</Badge>
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#111827', marginBottom: '0.25rem' }}>
                {p.title}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#6B7280', lineHeight: 1.4 }}>
                {p.metaDesc}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
