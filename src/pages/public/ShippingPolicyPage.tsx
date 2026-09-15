import React from 'react';
import { SEO } from '../../components/common/SEO';
import { generateBreadcrumbSchema } from '../../utils/seoSchemas';
import { Container } from '../../components/ui/Container/Container';
import { Card } from '../../components/ui/Card/Card';

export const ShippingPolicyPage: React.FC = () => {
  return (
    <div style={{ padding: 'clamp(2.5rem, 5vw, 5rem) 0' }}>
      <SEO
        title="Shipping & Dispatch Policy | Yami Naturals"
        description="Shipping, sample dispatch, domestic transport, and international export logistics policy for botanical extracts and herbal ingredients."
        canonicalPath="/shipping-policy"
        structuredData={generateBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Shipping Policy', url: '/shipping-policy' },
        ])}
      />
      <Container size="narrow">
        <h1>Shipping & Dispatch Policy</h1>
        <p className="text-muted" style={{ marginBottom: 'var(--space-6)' }}>
          Last updated: September 2026
        </p>

        <Card variant="surface" padding="lg">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', fontSize: 'var(--font-size-sm)', lineHeight: 'var(--line-height-relaxed)', color: 'var(--color-text-main)' }}>
            <div>
              <h4 style={{ color: 'var(--color-primary-800)', marginBottom: 'var(--space-2)' }}>1. Scope & Fulfillment Workflow</h4>
              <p>
                Yami Naturals coordinates domestic and international dispatch for herbal powders, standardized extracts, essential oils, cosmetic clays, and custom formulation batches. Every consignment is dispatched in compliance with agreed commercial specifications and required regulatory documentation.
              </p>
            </div>

            <div>
              <h4 style={{ color: 'var(--color-primary-800)', marginBottom: 'var(--space-2)' }}>2. Sample Dispatch</h4>
              <p>
                Evaluation samples (typically 50g to 500g depending on material classification) are packed in airtight, tamper-evident barrier pouches and dispatched via priority express courier services accompanied by corresponding batch Certificates of Analysis (COA).
              </p>
            </div>

            <div>
              <h4 style={{ color: 'var(--color-primary-800)', marginBottom: 'var(--space-2)' }}>3. Commercial Bulk Shipments & Packaging</h4>
              <p>
                Bulk orders are securely packed in food-grade, moisture-barrier multi-layer poly inner bags within sealed fiber drums (25 kg standard MOQ) or customized heavy-duty corrugated cartons on heat-treated pallets suitable for long-distance transit.
              </p>
            </div>

            <div>
              <h4 style={{ color: 'var(--color-primary-800)', marginBottom: 'var(--space-2)' }}>4. Domestic Logistics</h4>
              <p>
                Domestic consignments across India are handled via dedicated surface transport, express cargo, or full-truckload (FTL) logistics partners based on order volume, destination transit time, and customer delivery requirements.
              </p>
            </div>

            <div>
              <h4 style={{ color: 'var(--color-primary-800)', marginBottom: 'var(--space-2)' }}>5. International Export & Incoterms</h4>
              <p>
                Export consignments are coordinated under standard international commercial terms (Incoterms 2020) including FOB (Free on Board), CIF (Cost, Insurance and Freight), CFR (Cost and Freight), and Ex-Works (EXW). We facilitate air cargo and ocean container freight with comprehensive shipping dossiers (Phytosanitary Certificates, Certificate of Origin, Packing Lists, Commercial Invoices, and SDS/MSDS).
              </p>
            </div>

            <div>
              <h4 style={{ color: 'var(--color-primary-800)', marginBottom: 'var(--space-2)' }}>6. Order Tracking & Technical Support</h4>
              <p>
                Upon dispatch, our logistics desk provides detailed consignment tracking numbers, air waybills (AWB), or bill of lading (BL) documents directly to your registered business email and WhatsApp contact.
              </p>
            </div>

            <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--color-primary-600)' }}>
              <p className="text-muted" style={{ margin: 0, fontStyle: 'italic', fontSize: 'var(--font-size-xs)' }}>
                [Note: For specific destination port customs requirements or specialized container handling, please specify within your commercial requirement submission or contact our sourcing desk directly.]
              </p>
            </div>
          </div>
        </Card>
      </Container>
    </div>
  );
};
