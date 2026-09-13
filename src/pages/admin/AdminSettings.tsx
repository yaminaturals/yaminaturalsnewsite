import React from 'react';
import { Card } from '../../components/ui/Card/Card';
import { siteConfig } from '../../config/siteConfig';

export const AdminSettings: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h2>Procurement Portal Settings</h2>
        <p className="text-sm text-muted">Manage global contact channels, notification recipients, and administrative preferences.</p>
      </div>

      <Card variant="surface" padding="lg">
        <h4 style={{ marginBottom: 'var(--space-4)' }}>Contact Information & Placeholders</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', fontSize: 'var(--font-size-sm)' }}>
          <div><strong>Registered Brand:</strong> {siteConfig.brand.name}</div>
          <div><strong>Official Email:</strong> {siteConfig.contact.email}</div>
          <div><strong>Contact Telephone:</strong> {siteConfig.contact.phone}</div>
          <div><strong>Primary Physical Address:</strong> {siteConfig.contact.address}</div>
        </div>

        <div style={{ marginTop: 'var(--space-8)', padding: 'var(--space-4)', backgroundColor: 'var(--color-primary-50)', borderRadius: 'var(--radius-sm)', fontSize: 'var(--font-size-xs)' }}>
          🔒 <strong>Production Authentication Reminder:</strong> Before deploying to public infrastructure, configure an official server-validated OAuth or JWT token provider in <code>AuthService.ts</code>.
        </div>
      </Card>
    </div>
  );
};
