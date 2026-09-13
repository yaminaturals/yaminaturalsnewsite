import React from 'react';
import { Card } from '../../components/ui/Card/Card';

export const AdminContent: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h2>Website Content & Editorial Manager</h2>
        <p className="text-sm text-muted">Manage homepage announcement banners, procurement FAQs, and verified laboratory certifications.</p>
      </div>

      <Card variant="surface" padding="lg">
        <div style={{ textAlign: 'center', padding: 'var(--space-8) 0' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-2)' }}>📝</div>
          <h4>Editorial Content Module Active</h4>
          <p className="text-sm text-muted" style={{ maxWidth: '500px', margin: '0 auto' }}>
            This administrative module will allow managing custom FAQs, seasonal harvest updates, and compliance announcements in Phase 2.
          </p>
        </div>
      </Card>
    </div>
  );
};
