import React from 'react';
import { Card } from '../../components/ui/Card/Card';
import { Badge } from '../../components/ui/Badge/Badge';
import { siteConfig } from '../../config/siteConfig';
import { AUTHORIZED_ADMIN_EMAIL } from '../../services/AuthService';

export const AdminSettings: React.FC = () => {
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div style={{ borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: 'var(--space-4)' }}>
        <h2 style={{ margin: 0, color: 'var(--color-primary-900)' }}>Brand & Operational Settings</h2>
        <p className="text-sm text-muted" style={{ margin: 'var(--space-1) 0 0' }}>
          Global brand identity, customer communication endpoints, and administrative access controls.
        </p>
      </div>

      <div className="grid grid-cols-1 tablet-grid-cols-2 gap-6" style={{ alignItems: 'start' }}>
        {/* Brand & Business Details */}
        <Card variant="surface" padding="lg">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
            <h4 style={{ margin: 0 }}>Corporate Identity</h4>
            <Badge variant="success">Active</Badge>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', fontSize: 'var(--font-size-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: 'var(--space-2)' }}>
              <span className="text-muted">Brand Name:</span>
              <strong>{siteConfig.brand.name}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: 'var(--space-2)' }}>
              <span className="text-muted">Legal Entity:</span>
              <strong>{siteConfig.brand.legalName}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: 'var(--space-2)' }}>
              <span className="text-muted">Industry Domain:</span>
              <span>Botanical Extraction & Processing</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: 'var(--space-2)' }}>
              <span className="text-muted">Tagline:</span>
              <span style={{ fontStyle: 'italic', textAlign: 'right' }}>"{siteConfig.brand.tagline}"</span>
            </div>
          </div>
        </Card>

        {/* Inbound Contact Coordinates */}
        <Card variant="surface" padding="lg">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
            <h4 style={{ margin: 0 }}>Inquiry Channels</h4>
            <Badge variant="primary">Verified</Badge>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', fontSize: 'var(--font-size-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: 'var(--space-2)' }}>
              <span className="text-muted">Official Email:</span>
              <a href={`mailto:${siteConfig.contact.email}`} style={{ color: 'var(--color-primary-600)', fontWeight: 600 }}>
                {siteConfig.contact.email}
              </a>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: 'var(--space-2)' }}>
              <span className="text-muted">Telephone / Direct:</span>
              <strong>{siteConfig.contact.phone}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: 'var(--space-2)' }}>
              <span className="text-muted">WhatsApp Business:</span>
              <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>{siteConfig.contact.whatsapp}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: 'var(--space-2)' }}>
              <span className="text-muted">Business Hours:</span>
              <span>{siteConfig.contact.businessHours}</span>
            </div>
            <div style={{ borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: 'var(--space-2)' }}>
              <div className="text-muted" style={{ marginBottom: '4px' }}>Headquarters & Production Facility:</div>
              <div style={{ fontWeight: 500, lineHeight: 1.4 }}>{siteConfig.contact.address}</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Security & Administrative Control */}
      <Card variant="surface" padding="lg">
        <h4 style={{ margin: '0 0 var(--space-3) 0' }}>Security & Authentication Architecture</h4>
        <div className="grid grid-cols-1 tablet-grid-cols-3 gap-4" style={{ marginTop: 'var(--space-4)' }}>
          <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>Authentication Provider</div>
            <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, color: 'var(--color-primary-900)', marginTop: '4px' }}>
              Google OAuth (Firebase)
            </div>
          </div>

          <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>Authorized Administrator</div>
            <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, color: 'var(--color-primary-900)', marginTop: '4px' }}>
              {AUTHORIZED_ADMIN_EMAIL}
            </div>
          </div>

          <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>Session Security</div>
            <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, color: 'var(--color-success)', marginTop: '4px' }}>
              Protected Route Guards Active
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
