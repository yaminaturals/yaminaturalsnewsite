import React, { useState } from 'react';
import { Container } from '../../components/ui/Container/Container';
import { Card } from '../../components/ui/Card/Card';
import { Button } from '../../components/ui/Button/Button';
import { siteConfig } from '../../config/siteConfig';
import { leadService } from '../../services/LeadService';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setIsSubmitting(true);
    try {
      await leadService.captureLead({
        fullName: name,
        email,
        subject: subject || 'General Sourcing Inquiry',
        message,
        sourceUrl: window.location.href
      });
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page animate-fade-in" style={{ padding: 'clamp(2.5rem, 5vw, 5rem) 0' }}>
      <Container size="default">
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto var(--space-10)' }}>
          <span className="eyebrow">Connect With Us</span>
          <h1>Contact Yami Naturals</h1>
          <p className="text-muted">
            Have questions about sourcing capabilities, specific botanical assays, or partnership opportunities? Reach our team directly.
          </p>
        </div>

        <div className="grid grid-cols-1 tablet-grid-cols-2 gap-8">
          {/* Sourcing Desk Contact Details */}
          <div>
            <Card variant="surface" padding="lg">
              <h3 style={{ marginBottom: 'var(--space-4)' }}>Procurement Desk</h3>
              <p className="text-sm text-muted" style={{ marginBottom: 'var(--space-6)' }}>
                Direct contact channels for suppliers, compounders, and clients.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', fontSize: 'var(--font-size-sm)' }}>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--color-primary-800)', marginBottom: 'var(--space-1)' }}>
                    ✉ Official Inquiry Email
                  </div>
                  <div style={{ color: 'var(--color-text-body)' }}>{siteConfig.contact.email}</div>
                </div>

                <div>
                  <div style={{ fontWeight: 600, color: 'var(--color-primary-800)', marginBottom: 'var(--space-1)' }}>
                    📞 Telephone Support
                  </div>
                  <div style={{ color: 'var(--color-text-body)' }}>{siteConfig.contact.phone}</div>
                </div>

                <div>
                  <div style={{ fontWeight: 600, color: 'var(--color-primary-800)', marginBottom: 'var(--space-1)' }}>
                    📍 Registered Office / Facility
                  </div>
                  <div style={{ color: 'var(--color-text-body)' }}>{siteConfig.contact.address}</div>
                </div>

                <div>
                  <div style={{ fontWeight: 600, color: 'var(--color-primary-800)', marginBottom: 'var(--space-1)' }}>
                    🕒 Operational Hours
                  </div>
                  <div style={{ color: 'var(--color-text-body)' }}>{siteConfig.contact.businessHours}</div>
                </div>
              </div>

              <div style={{ marginTop: 'var(--space-8)', padding: 'var(--space-4)', backgroundColor: 'var(--color-bg-tinted)', borderRadius: 'var(--radius-sm)', fontSize: 'var(--font-size-xs)' }}>
                💡 <strong>Looking for a formal price quotation?</strong> For volume requests with analytical specifications, submitting via our dedicated <a href="/submit-requirement" style={{ color: 'var(--color-primary-700)', fontWeight: 'bold' }}>Requirement Wizard</a> provides faster technical matching.
              </div>
            </Card>
          </div>

          {/* Quick Inquiry Form */}
          <div>
            <Card variant="surface" padding="lg">
              <h3 style={{ marginBottom: 'var(--space-4)' }}>Send a Direct Message</h3>

              {submitted ? (
                <div style={{ textAlign: 'center', padding: 'var(--space-8) 0' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-2)' }}>✉️</div>
                  <h4>Message Dispatched</h4>
                  <p className="text-sm text-muted">
                    Thank you. Your inquiry has been routed to our sourcing desk.
                  </p>
                  <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 'var(--font-size-xs)', fontWeight: 600, marginBottom: 'var(--space-1)' }}>
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{ width: '100%', padding: '0.65rem 0.85rem', border: '1px solid var(--color-border-medium)', borderRadius: 'var(--radius-sm)', minHeight: '44px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 'var(--font-size-xs)', fontWeight: 600, marginBottom: 'var(--space-1)' }}>
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ width: '100%', padding: '0.65rem 0.85rem', border: '1px solid var(--color-border-medium)', borderRadius: 'var(--radius-sm)', minHeight: '44px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 'var(--font-size-xs)', fontWeight: 600, marginBottom: 'var(--space-1)' }}>
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Bulk Ashwagandha inquiry, testing query..."
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      style={{ width: '100%', padding: '0.65rem 0.85rem', border: '1px solid var(--color-border-medium)', borderRadius: 'var(--radius-sm)', minHeight: '44px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 'var(--font-size-xs)', fontWeight: 600, marginBottom: 'var(--space-1)' }}>
                      Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      style={{ width: '100%', padding: '0.65rem 0.85rem', border: '1px solid var(--color-border-medium)', borderRadius: 'var(--radius-sm)' }}
                    />
                  </div>

                  <Button type="submit" variant="primary" size="lg" isLoading={isSubmitting}>
                    Send Inquiry
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};
