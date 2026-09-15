import React from 'react';
import { SEO } from '../../components/common/SEO';
import { Container } from '../../components/ui/Container/Container';
import { Button } from '../../components/ui/Button/Button';
import { generateBreadcrumbSchema } from '../../utils/seoSchemas';
import './PrivateLabellingPage.css';

export const PrivateLabellingPage: React.FC = () => {
  return (
    <div className="private-labelling-page animate-fade-in">
      <SEO
        title="Private Labelling & Contract Formulation | Yami Naturals"
        description="Turnkey private labelling, contract manufacturing, custom botanical extracts, and finished packaging for wellness, skincare, and nutraceutical brands."
        canonicalPath="/private-labelling"
        structuredData={generateBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Private Labelling', url: '/private-labelling' },
        ])}
      />

      {/* Hero Section */}
      <section className="pl-hero">
        <Container size="default">
          <div className="pl-hero-content animate-fade-up">
            <span className="pl-eyebrow">🏷️ TURNKEY CONTRACT SERVICES</span>
            <h1 className="pl-hero-title">
              Private Labelling &amp; Custom Botanical Formulation
            </h1>
            <p className="pl-hero-subtitle">
              Transform premium herbal powders, standardized extracts, essential oils, and cosmetic clays into market-ready, customized product lines backed by complete batch documentation.
            </p>
            <div className="pl-hero-actions">
              <Button to="/submit-requirement" variant="primary" size="lg">
                Submit Private Label Inquiry →
              </Button>
              <Button to="/products" variant="outline" size="lg">
                Explore Raw Ingredients
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Core Capabilities */}
      <section className="pl-capabilities-section">
        <Container size="default">
          <div className="pl-section-header">
            <span className="pl-eyebrow">END-TO-END CAPABILITIES</span>
            <h2 className="pl-section-title">Full Lifecycle Product Development</h2>
            <p className="pl-section-desc">
              From raw botanical sourcing to final packaged retail units, we manage every step with strict quality compliance.
            </p>
          </div>

          <div className="pl-capabilities-grid">
            <div className="pl-cap-card">
              <div className="pl-cap-icon">⚗️</div>
              <h3>Custom Formulation &amp; Blending</h3>
              <p>Tailored botanical blends, micronized powder compounding, standardized active ratios, and functional synergy formulation.</p>
            </div>

            <div className="pl-cap-card">
              <div className="pl-cap-icon">💊</div>
              <h3>Capsule &amp; Dosage Processing</h3>
              <p>Vegetarian (HPMC) and gelatin encapsulation, customized fill weights, blister packing, and bottle filling.</p>
            </div>

            <div className="pl-cap-card">
              <div className="pl-cap-icon">📦</div>
              <h3>Custom Packaging &amp; Labeling</h3>
              <p>Eco-friendly pouches, HDPE bottles, glass amber jars, bulk drums, and custom client branding application.</p>
            </div>

            <div className="pl-cap-card">
              <div className="pl-cap-icon">📑</div>
              <h3>Full Regulatory &amp; CoA Dossier</h3>
              <p>Every private label batch is accompanied by Certificate of Analysis (CoA), TDS, MSDS, and microbial test reports.</p>
            </div>
          </div>
        </Container>
      </section>

      {/* 4-Step Process */}
      <section className="pl-process-section">
        <Container size="default">
          <div className="pl-section-header">
            <span className="pl-eyebrow">HOW IT WORKS</span>
            <h2 className="pl-section-title">Our 4-Step Private Label Workflow</h2>
          </div>

          <div className="pl-process-grid">
            <div className="pl-step-card">
              <div className="pl-step-num">01</div>
              <h3>Requirement &amp; Spec Alignment</h3>
              <p>Define your active ingredient profile, target packaging, label specifications, and batch volume requirements.</p>
            </div>

            <div className="pl-step-card">
              <div className="pl-step-num">02</div>
              <h3>Sourcing &amp; Lab Sampling</h3>
              <p>We source verified raw botanicals, formulate pilot bench samples, and provide laboratory test verification.</p>
            </div>

            <div className="pl-step-card">
              <div className="pl-step-num">03</div>
              <h3>Batch Manufacturing &amp; Packing</h3>
              <p>Commercial compounding under GMP and ISO compliant facility protocols with rigorous in-process quality audits.</p>
            </div>

            <div className="pl-step-card">
              <div className="pl-step-num">04</div>
              <h3>Export Clearance &amp; Delivery</h3>
              <p>Complete export documentation, phytosanitary verification, customs clearance, and global door/port delivery.</p>
            </div>
          </div>

          <div className="pl-bottom-cta">
            <div className="pl-cta-box">
              <h3>Ready to Launch Your Natural Product Line?</h3>
              <p>Connect with our technical formulation team to discuss MOQs, packaging options, and commercial terms.</p>
              <Button to="/submit-requirement" variant="primary" size="md">
                Start Private Label Requirement →
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
