import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card/Card';
import { Badge } from '../../components/ui/Badge/Badge';
import { Button } from '../../components/ui/Button/Button';
import { requirementService } from '../../services/RequirementService';
import { CustomerRequirement, RequirementStatus } from '../../types';

export const AdminRequirements: React.FC = () => {
  const [requirements, setRequirements] = useState<CustomerRequirement[]>([]);
  const [selectedReq, setSelectedReq] = useState<CustomerRequirement | null>(null);
  const [filterStatus, setFilterStatus] = useState<RequirementStatus | 'all'>('all');
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(true);

  const loadRequirements = () => {
    setLoading(true);
    requirementService.getRequirements(filterStatus === 'all' ? undefined : filterStatus).then((res) => {
      setRequirements(res);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadRequirements();
  }, [filterStatus]);

  const handleStatusChange = async (reqId: string, status: RequirementStatus) => {
    await requirementService.updateStatus(reqId, status);
    loadRequirements();
    if (selectedReq && selectedReq.id === reqId) {
      setSelectedReq({ ...selectedReq, status });
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReq || !newNote.trim()) return;

    await requirementService.updateStatus(selectedReq.id, selectedReq.status, newNote.trim());
    setNewNote('');
    loadRequirements();
    const updated = await requirementService.getRequirementById(selectedReq.id);
    setSelectedReq(updated);
  };

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <div>
          <h2>Customer Requirement Submissions</h2>
          <p className="text-sm text-muted">Review incoming material requests, customer specifications, and update proposal status.</p>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          {(['all', 'new', 'in-review', 'quoted', 'fulfilled', 'archived'] as const).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setFilterStatus(st)}
              style={{
                padding: '0.35rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                fontSize: 'var(--font-size-xs)',
                fontWeight: 600,
                border: '1px solid var(--color-border-medium)',
                backgroundColor: filterStatus === st ? 'var(--color-primary-600)' : '#ffffff',
                color: filterStatus === st ? '#ffffff' : 'var(--color-text-body)',
                cursor: 'pointer'
              }}
            >
              {st.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 tablet-grid-cols-2 gap-6" style={{ alignItems: 'start' }}>
        {/* Table of Submissions */}
        <Card variant="surface" padding="md">
          {loading ? (
            <p className="text-muted">Loading submissions...</p>
          ) : requirements.length === 0 ? (
            <p className="text-muted">No requirements found matching current filter.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {requirements.map((req) => (
                <div
                  key={req.id}
                  onClick={() => setSelectedReq(req)}
                  style={{
                    padding: 'var(--space-3)',
                    borderRadius: 'var(--radius-sm)',
                    border: `1.5px solid ${selectedReq?.id === req.id ? 'var(--color-primary-600)' : 'var(--color-border-subtle)'}`,
                    backgroundColor: selectedReq?.id === req.id ? 'var(--color-primary-50)' : '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-1)' }}>
                    <span style={{ fontWeight: 700, fontSize: 'var(--font-size-sm)' }}>{req.referenceNumber}</span>
                    <Badge variant={req.status === 'new' ? 'warning' : 'primary'}>{req.status}</Badge>
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 'var(--font-size-sm)', color: 'var(--color-primary-900)' }}>
                    {req.productName} ({req.requiredQuantity} {req.quantityUnit})
                  </div>
                  <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginTop: 'var(--space-1)' }}>
                    Client: {req.contact.fullName} {req.contact.companyName ? `• ${req.contact.companyName}` : ''}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Selected Requirement Detail Inspector */}
        <Card variant="surface" padding="lg">
          {selectedReq ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-4)', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: 'var(--space-3)' }}>
                <div>
                  <h3 style={{ margin: 0 }}>{selectedReq.referenceNumber}</h3>
                  <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                    Submitted on {new Date(selectedReq.createdAt).toLocaleString()}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                  <Badge variant={selectedReq.customerType === 'b2b' ? 'neutral' : 'accent'}>
                    {selectedReq.customerType.toUpperCase()}
                  </Badge>
                  <Badge variant="primary">{selectedReq.requirementType}</Badge>
                </div>
              </div>

              {/* Status Updater */}
              <div style={{ marginBottom: 'var(--space-4)', padding: 'var(--space-3)', backgroundColor: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
                <label style={{ display: 'block', fontSize: 'var(--font-size-xs)', fontWeight: 600, marginBottom: 'var(--space-1)' }}>
                  Change Workflow Status:
                </label>
                <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                  {(['new', 'in-review', 'quoted', 'fulfilled', 'archived'] as const).map(st => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleStatusChange(selectedReq.id, st)}
                      style={{
                        padding: '0.25rem 0.55rem',
                        fontSize: 'var(--font-size-xs)',
                        borderRadius: 'var(--radius-xs)',
                        border: '1px solid var(--color-border-medium)',
                        backgroundColor: selectedReq.status === st ? 'var(--color-primary-600)' : '#ffffff',
                        color: selectedReq.status === st ? '#ffffff' : 'inherit',
                        cursor: 'pointer'
                      }}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Detail fields */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', fontSize: 'var(--font-size-sm)' }}>
                <div>
                  <strong>Target Material:</strong> {selectedReq.productName}
                </div>
                <div>
                  <strong>Required Volume:</strong> {selectedReq.requiredQuantity} {selectedReq.quantityUnit}
                </div>
                <div>
                  <strong>Intended Application:</strong> {selectedReq.applicationUse}
                </div>
                {selectedReq.specificationStandard && (
                  <div>
                    <strong>Specification Standard:</strong> {selectedReq.specificationStandard}
                  </div>
                )}
                {selectedReq.packagingPreference && (
                  <div>
                    <strong>Packaging Preference:</strong> {selectedReq.packagingPreference}
                  </div>
                )}

                <div style={{ borderTop: '1px solid var(--color-border-subtle)', paddingTop: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
                  <h5 style={{ marginBottom: 'var(--space-2)' }}>Contact & Delivery</h5>
                  <div><strong>Name:</strong> {selectedReq.contact.fullName}</div>
                  {selectedReq.contact.companyName && <div><strong>Company:</strong> {selectedReq.contact.companyName}</div>}
                  <div><strong>Email:</strong> {selectedReq.contact.email}</div>
                  <div><strong>Phone:</strong> {selectedReq.contact.phone}</div>
                  <div><strong>Country / Port:</strong> {selectedReq.contact.country} {selectedReq.contact.cityOrPort ? `(${selectedReq.contact.cityOrPort})` : ''}</div>
                </div>

                {selectedReq.additionalNotes && (
                  <div style={{ borderTop: '1px solid var(--color-border-subtle)', paddingTop: 'var(--space-3)' }}>
                    <strong>Client Notes:</strong>
                    <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-body)', marginTop: 'var(--space-1)' }}>
                      {selectedReq.additionalNotes}
                    </p>
                  </div>
                )}

                {/* Attached Documents */}
                <div style={{ borderTop: '1px solid var(--color-border-subtle)', paddingTop: 'var(--space-3)' }}>
                  <strong>Attached Documents ({selectedReq.documents.length}):</strong>
                  {selectedReq.documents.length === 0 ? (
                    <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>No files attached.</div>
                  ) : (
                    selectedReq.documents.map(d => (
                      <div key={d.id} style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--space-2)', backgroundColor: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-xs)', marginTop: 'var(--space-2)', fontSize: 'var(--font-size-xs)' }}>
                        <span>📎 {d.name} ({(d.sizeBytes / 1024).toFixed(1)} KB)</span>
                        {d.previewUrl && (
                          <a href={d.previewUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--color-primary-600)', fontWeight: 600 }}>
                            Inspect File
                          </a>
                        )}
                      </div>
                    ))
                  )}
                </div>

                {/* Internal Admin Notes */}
                <div style={{ borderTop: '1px solid var(--color-border-subtle)', paddingTop: 'var(--space-3)' }}>
                  <strong>Internal Operational Notes:</strong>
                  {selectedReq.adminNotes && selectedReq.adminNotes.length > 0 ? (
                    <ul style={{ paddingLeft: 'var(--space-4)', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-body)', marginTop: 'var(--space-2)' }}>
                      {selectedReq.adminNotes.map((n, idx) => (
                        <li key={idx}>{n}</li>
                      ))}
                    </ul>
                  ) : (
                    <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginTop: 'var(--space-1)' }}>
                      No internal notes recorded.
                    </div>
                  )}

                  <form onSubmit={handleAddNote} style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-3)' }}>
                    <input
                      type="text"
                      placeholder="Add an internal log note..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      style={{ flex: 1, padding: '0.45rem 0.65rem', fontSize: 'var(--font-size-xs)', border: '1px solid var(--color-border-medium)', borderRadius: 'var(--radius-xs)' }}
                    />
                    <Button type="submit" variant="primary" size="sm">
                      Add Note
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: 'var(--space-12) 0', color: 'var(--color-text-muted)' }}>
              Select a requirement submission from the list on the left to inspect complete specifications, attached files, and adjust workflow status.
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
