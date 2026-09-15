import React from 'react';
import { SEO } from '../../components/common/SEO';
import { generateBreadcrumbSchema } from '../../utils/seoSchemas';
import { Container } from '../../components/ui/Container/Container';
import { Card } from '../../components/ui/Card/Card';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div style={{ padding: 'clamp(2.5rem, 5vw, 5rem) 0' }}>
      <SEO
        title="Privacy Policy | Yami Naturals"
        description="Privacy policy and data handling practices for Yami Naturals procurement inquiries and requirement registrations."
        canonicalPath="/privacy-policy"
        structuredData={generateBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Privacy Policy', url: '/privacy-policy' },
        ])}
      />
      <Container size="narrow">
        <h1>Privacy Policy</h1>
        <p className="text-muted" style={{ marginBottom: 'var(--space-6)' }}>
          Last updated: September 2026
        </p>

        <Card variant="surface" padding="lg">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', fontSize: 'var(--font-size-sm)', lineHeight: 'var(--line-height-relaxed)' }}>
            <h4>1. Overview & Procurement Scope</h4>
            <p>
              Yami Naturals operates exclusively as a procurement, sourcing, and product-support platform for natural and botanical raw materials. This platform does not process consumer e-commerce transactions, financial credit card charges, or online payment gateways.
            </p>

            <h4>2. Information Collected via Requirement Submissions</h4>
            <p>
              When you submit a requirement or inquiry through our forms, we collect technical specifications, company name, contact person name, business email, telephone number, destination port/city, and any uploaded reference specification documents or Certificates of Analysis.
            </p>

            <h4>3. Use of Technical Data</h4>
            <p>
              Technical specifications and contact details are used solely to evaluate material availability, calculate quotations, and coordinate fulfillment logistics with verified growers and analytical laboratories.
            </p>

            <h4>4. Policy Updates</h4>
            <p className="text-muted" style={{ fontStyle: 'italic' }}>
              [Client to provide official formal privacy policy document and regulatory jurisdictional disclosures].
            </p>
          </div>
        </Card>
      </Container>
    </div>
  );
};
