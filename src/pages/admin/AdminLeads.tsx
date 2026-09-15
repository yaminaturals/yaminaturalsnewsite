import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card/Card';
import { Badge } from '../../components/ui/Badge/Badge';
import { Button } from '../../components/ui/Button/Button';
import { leadService } from '../../services/LeadService';
import { CustomerLead } from '../../types';

export const AdminLeads: React.FC = () => {
  const [leads, setLeads] = useState<CustomerLead[]>([]);
  const [loading, setLoading] = useState(true);

  const loadLeads = () => {
    setLoading(true);
    leadService.getLeads().then((res) => {
      setLeads(res);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadLeads();
  }, []);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-4)', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: 'var(--space-4)' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#111827', margin: 0 }}>Direct Leads</h1>
          <p style={{ fontSize: '0.875rem', color: '#6B7280', margin: '0.25rem 0 0' }}>
            Inbound customer inquiries submitted through the public website <code>/contact</code> form.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <a
            href="/contact"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '0.45rem 0.85rem',
              backgroundColor: 'var(--color-primary-50)',
              color: 'var(--color-primary-800)',
              borderRadius: 'var(--radius-xs)',
              fontSize: 'var(--font-size-xs)',
              fontWeight: 600,
              textDecoration: 'none',
              border: '1px solid var(--color-primary-200)'
            }}
          >
            🌐 Public Contact Desk ↗
          </a>
          <Button type="button" variant="outline" size="sm" onClick={loadLeads}>
            🔄 Refresh
          </Button>
        </div>
      </div>

      <Card variant="surface" padding="lg">
        {loading ? (
          <p className="text-muted">Loading inquiries...</p>
        ) : leads.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
            <h4>No contact leads recorded yet.</h4>
            <p className="text-sm text-muted">Customer messages sent through the <code>/contact</code> page will appear here immediately.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {leads.map((lead) => (
              <div
                key={lead.id}
                style={{
                  padding: 'var(--space-4)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: '#ffffff',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                  <div>
                    <strong style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-primary-900)' }}>
                      {lead.fullName}
                    </strong>{' '}
                    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                      • {lead.email} {lead.phone ? `• 📞 ${lead.phone}` : ''}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <Badge variant={lead.status === 'new' ? 'warning' : 'primary'}>{lead.status.toUpperCase()}</Badge>
                    <a
                      href={`mailto:${lead.email}?subject=Re: ${encodeURIComponent(lead.subject)} - Yami Naturals`}
                      style={{
                        fontSize: 'var(--font-size-xs)',
                        padding: '0.25rem 0.55rem',
                        backgroundColor: 'var(--color-primary-600)',
                        color: '#ffffff',
                        borderRadius: 'var(--radius-xs)',
                        textDecoration: 'none',
                        fontWeight: 600
                      }}
                    >
                      ✉ Reply via Email
                    </a>
                  </div>
                </div>

                <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--color-primary-800)', marginBottom: 'var(--space-2)' }}>
                  Subject: {lead.subject}
                </div>

                <div
                  style={{
                    fontSize: 'var(--font-size-xs)',
                    color: 'var(--color-text-body)',
                    backgroundColor: 'var(--color-bg-subtle)',
                    padding: 'var(--space-3)',
                    borderRadius: 'var(--radius-xs)',
                    lineHeight: 1.5,
                    whiteSpace: 'pre-wrap'
                  }}
                >
                  {lead.message}
                </div>

                <div style={{ fontSize: '0.72rem', color: 'var(--color-text-subtle)', marginTop: 'var(--space-2)' }}>
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
