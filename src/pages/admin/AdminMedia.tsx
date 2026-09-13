import React from 'react';
import { Card } from '../../components/ui/Card/Card';

export const AdminMedia: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h2>Media & Document Asset Library</h2>
        <p className="text-sm text-muted">Manage product botanical photography, packaging diagrams, and Certificate of Analysis (CoA) PDF assets.</p>
      </div>

      <Card variant="surface" padding="lg">
        <div style={{ textAlign: 'center', padding: 'var(--space-8) 0' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-2)' }}>🖼️</div>
          <h4>Media Library Interface</h4>
          <p className="text-sm text-muted" style={{ maxWidth: '500px', margin: '0 auto' }}>
            Document and image asset storage module wired to the FileStorageService abstraction. Ready for cloud bucket synchronization.
          </p>
        </div>
      </Card>
    </div>
  );
};
