import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card/Card';
import { Badge } from '../../components/ui/Badge/Badge';
import { leadService } from '../../services/LeadService';
import { CustomerLead } from '../../types';

export const AdminLeads: React.FC = () => {
  const [leads, setLeads] = useState<CustomerLead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    leadService.getLeads().then((res) => {
      setLeads(res);
      setLoading(false);
    });
  }, []);

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h2>Contact Leads & General Inquiries</h2>
        <p className="text-sm text-muted">General contact form messages and inquiries submitted through the public website.</p>
      </div>

      <Card variant="surface" padding="lg">
        {loading ? (
          <p className="text-muted">Loading inquiries...</p>
        ) : leads.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
            <h4>No contact leads recorded yet.</h4>
            <p className="text-sm text-muted">Inquiries sent through the /contact page will appear here immediately.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {leads.map((lead) => (
              <div key={lead.id} style={{ padding: 'var(--space-4)', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-sm)', backgroundColor: '#ffffff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                  <div>
                    <strong>{lead.fullName}</strong> ({lead.email}) {lead.phone ? `• ${lead.phone}` : ''}
                  </div>
                  <Badge variant="primary">{lead.status}</Badge>
                </div>
                <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--color-primary-800)', marginBottom: 'var(--space-1)' }}>
                  {lead.subject}
                </div>
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-body)', margin: 0 }}>
                  {lead.message}
                </p>
                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-subtle)', marginTop: 'var(--space-2)' }}>
                  Received on {new Date(lead.createdAt).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};
