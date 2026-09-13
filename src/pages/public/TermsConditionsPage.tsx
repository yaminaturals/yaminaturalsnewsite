import React from 'react';
import { Container } from '../../components/ui/Container/Container';
import { Card } from '../../components/ui/Card/Card';

export const TermsConditionsPage: React.FC = () => {
  return (
    <div style={{ padding: 'clamp(2.5rem, 5vw, 5rem) 0' }}>
      <Container size="narrow">
        <h1>Terms & Conditions</h1>
        <p className="text-muted" style={{ marginBottom: 'var(--space-6)' }}>
          Last updated: September 2026
        </p>

        <Card variant="surface" padding="lg">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', fontSize: 'var(--font-size-sm)', lineHeight: 'var(--line-height-relaxed)' }}>
            <h4>1. Nature of the Platform</h4>
            <p>
              Yami Naturals is a business-to-business and consumer procurement facilitation portal. Quotations, technical specifications (TDS), and Certificates of Analysis (CoA) displayed or issued through the portal are intended for technical evaluation and procurement agreements.
            </p>

            <h4>2. Product Specifications & Material Variances</h4>
            <p>
              Because botanicals and natural extracts are agricultural products, active compound assays, moisture percentages, and physical color characteristics may experience seasonal harvest variations within the standardized bounds specified on individual lot CoAs.
            </p>

            <h4>3. Official Sourcing Agreements</h4>
            <p className="text-muted" style={{ fontStyle: 'italic' }}>
              [Client to provide official formal commercial procurement terms, warranty disclaimers, and dispute jurisdiction].
            </p>
          </div>
        </Card>
      </Container>
    </div>
  );
};
