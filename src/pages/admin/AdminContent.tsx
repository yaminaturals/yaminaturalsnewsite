import React, { useState } from 'react';
import { Card } from '../../components/ui/Card/Card';
import { Badge } from '../../components/ui/Badge/Badge';
import { Button } from '../../components/ui/Button/Button';

export const AdminContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'announcements' | 'certifications' | 'faqs'>('announcements');
  const [announcementText, setAnnouncementText] = useState(
    'Leading Exporter & Bulk Supplier of 100% Pure Botanical Extracts, Herbal Powders, and Essential Oils.'
  );
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid #E5E7EB', paddingBottom: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#111827', margin: 0 }}>Content Management</h1>
          <p style={{ fontSize: '0.875rem', color: '#6B7280', margin: '0.25rem 0 0' }}>
            Manage public website highlights, certifications, and editorial content without altering source code.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {(['announcements', 'certifications', 'faqs'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '0.45rem 0.85rem',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 600,
                border: '1px solid #E5E7EB',
                backgroundColor: activeTab === tab ? '#0D5C3A' : '#FFFFFF',
                color: activeTab === tab ? '#FFFFFF' : '#374151',
                cursor: 'pointer',
                textTransform: 'capitalize'
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {saveSuccess && (
        <div style={{ padding: '0.75rem 1rem', backgroundColor: '#DCFCE7', color: '#15803D', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600 }}>
          ✓ Content changes saved successfully and synced with the public website.
        </div>
      )}

      {activeTab === 'announcements' && (
        <Card variant="surface" padding="lg">
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 1rem 0' }}>Homepage Highlights & Hero Subheading</h3>
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>
                Primary Value Proposition Banner:
              </label>
              <textarea
                rows={3}
                value={announcementText}
                onChange={(e) => setAnnouncementText(e.target.value)}
                style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.875rem', outline: 'none' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <Button type="submit" variant="primary" size="sm">
                Save Content
              </Button>
            </div>
          </form>
        </Card>
      )}

      {activeTab === 'certifications' && (
        <Card variant="surface" padding="lg">
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 1rem 0' }}>Published Quality Certifications</h3>
          <div className="grid grid-cols-1 tablet-grid-cols-3 gap-4">
            {['ISO 9001:2015 Quality Management', 'GMP Certified Manufacturing', 'HACCP Food Safety Certified', 'USDA Organic Compliance', 'Halal & Kosher Verified', 'FSSAI Licensed Facility'].map((cert, idx) => (
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

      {activeTab === 'faqs' && (
        <Card variant="surface" padding="lg">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>Public Procurement FAQs</h3>
            <a href="/faq" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.8rem', color: '#0D5C3A', fontWeight: 600 }}>
              View Public FAQ Page ↗
            </a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ padding: '0.85rem', border: '1px solid #E5E7EB', borderRadius: '8px' }}>
              <strong>What is the typical Minimum Order Quantity (MOQ)?</strong>
              <p style={{ fontSize: '0.82rem', color: '#6B7280', margin: '0.35rem 0 0' }}>
                Standard MOQ for standardized extracts is 25 kg in fiber drums. Custom pilot test batches are available from 1 kg.
              </p>
            </div>
            <div style={{ padding: '0.85rem', border: '1px solid #E5E7EB', borderRadius: '8px' }}>
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
