import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../components/ui/Container/Container';
import { Button } from '../../components/ui/Button/Button';
import { Badge } from '../../components/ui/Badge/Badge';
import { Card } from '../../components/ui/Card/Card';
import './PartnershipPage.css';

export const PartnershipPage: React.FC = () => {
  return (
    <div className="partnership-page animate-fade-in">
      {/* Hero Section */}
      <section className="partnership-hero">
        <Container size="default">
          <div className="partnership-hero-content">
            <nav className="partnership-breadcrumbs" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <span aria-current="page">Partnership</span>
            </nav>

            <div className="partnership-badge-wrap">
              <Badge variant="primary">Global B2B & Supply Alliances</Badge>
            </div>

            <h1 className="partnership-title">
              Strategic Procurement &amp; Supply Partnerships
            </h1>

            <p className="partnership-subtitle">
              Partner with Yami Naturals for certified botanical ingredients, standardized extracts,
              and contract manufacturing support. We bridge verified growers and extraction laboratories
              with global brands, formulators, and healthcare enterprises.
            </p>

            <div className="partnership-hero-actions">
              <Button
                to="/submit-requirement"
                variant="primary"
                size="lg"
                iconRight={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                }
              >
                Submit Partnership Requirement
              </Button>
              <Button
                to="/contact"
                variant="secondary"
                size="lg"
              >
                Speak with Partnership Desk
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Partnership Models Grid */}
      <section className="partnership-models-section">
        <Container size="default">
          <div className="section-header text-center">
            <span className="section-eyebrow">Collaboration Frameworks</span>
            <h2 className="section-title">Partnership Models Tailored to Your Scale</h2>
            <p className="section-subtitle">
              Whether you are an emerging brand developing pilot formulas or a multinational manufacturer managing continuous supply lines, our procurement desk adapts to your operating requirements.
            </p>
          </div>

          <div className="partnership-models-grid">
            <Card variant="surface" hoverable padding="lg" className="model-card">
              <div className="model-icon">📦</div>
              <h3 className="model-title">Bulk &amp; Institutional Supply</h3>
              <p className="model-desc">
                High-volume contracts for standardized herbal extracts, raw botanical powders, natural oils, and clays with guaranteed assay levels, consistent batch-to-batch profiles, and price stability agreements.
              </p>
              <ul className="model-features">
                <li>✓ Batch-specific HPLC &amp; GC-MS verification</li>
                <li>✓ Flexible delivery schedules (spot buy or annual draw-downs)</li>
                <li>✓ Multi-ton containerized export capacity</li>
              </ul>
            </Card>

            <Card variant="surface" hoverable padding="lg" className="model-card">
              <div className="model-icon">⚙️</div>
              <h3 className="model-title">Contract Processing &amp; Custom Extraction</h3>
              <p className="model-desc">
                Need a specific withanolide ratio, custom mesh size, or solvent-free aqueous extraction? We work directly with certified extraction units to manufacture to your exact formulation monographs.
              </p>
              <ul className="model-features">
                <li>✓ Custom mesh pulverization (60 to 120 mesh)</li>
                <li>✓ Tailored extraction ratios (5:1, 10:1, 20:1 up to 95% isolates)</li>
                <li>✓ Spray-drying, micronization &amp; custom blending</li>
              </ul>
            </Card>

            <Card variant="surface" hoverable padding="lg" className="model-card">
              <div className="model-icon">🏷️</div>
              <h3 className="model-title">Private Label &amp; Formulation Sourcing</h3>
              <p className="model-desc">
                Complete white-label and contract compounding assistance for wellness brands, cosmetic creators, and dietary supplement innovators seeking clean, verified raw materials.
              </p>
              <ul className="model-features">
                <li>✓ Pre-portioned bulk packing (1 kg, 5 kg, 25 kg fiber drums)</li>
                <li>✓ Technical dossier for regulatory filing</li>
                <li>✓ Low initial MOQs for pilot formulation validation</li>
              </ul>
            </Card>

            <Card variant="surface" hoverable padding="lg" className="model-card">
              <div className="model-icon">🌐</div>
              <h3 className="model-title">Global Export &amp; Distribution Alliances</h3>
              <p className="model-desc">
                International partners benefit from our export documentation desk, ensuring seamless customs clearance and compliance across North America, Europe, Middle East, and Asia-Pacific.
              </p>
              <ul className="model-features">
                <li>✓ Certificates of Analysis (CoA) &amp; Technical Data Sheets (TDS)</li>
                <li>✓ Phytosanitary clearance &amp; Certificate of Origin</li>
                <li>✓ Air freight and sea freight container logistics</li>
              </ul>
            </Card>
          </div>
        </Container>
      </section>

      {/* Why Partner Section */}
      <section className="partnership-benefits-section">
        <Container size="default">
          <div className="benefits-layout">
            <div className="benefits-intro">
              <span className="section-eyebrow">The Partner Advantage</span>
              <h2>Why Leading Enterprises Rely on Yami Naturals</h2>
              <p>
                In the botanical industry, supply chain integrity is paramount. Adulteration, inconsistent active compounds, and documentation gaps can derail production. Yami Naturals eliminates these vulnerabilities.
              </p>

              <div className="benefits-stat-stack">
                <div className="benefit-stat-item">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">Assay &amp; Identity Tested Lots</span>
                </div>
                <div className="benefit-stat-item">
                  <span className="stat-number">24h</span>
                  <span className="stat-label">Rapid Procurement Quoting</span>
                </div>
                <div className="benefit-stat-item">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">Standardized Botanical Monographs</span>
                </div>
              </div>
            </div>

            <div className="benefits-list">
              <div className="benefit-item">
                <div className="benefit-badge">01</div>
                <div>
                  <h4>Direct Source-to-Lab Traceability</h4>
                  <p>Direct alignment with cultivated estates and certified extraction facilities removes speculative intermediaries and guarantees raw material origin.</p>
                </div>
              </div>

              <div className="benefit-item">
                <div className="benefit-badge">02</div>
                <div>
                  <h4>Standardized Quality Dossiers</h4>
                  <p>Every shipment is accompanied by complete test panels: HPLC assay, moisture content, heavy metal limits (ICP-MS), and microbial screening.</p>
                </div>
              </div>

              <div className="benefit-item">
                <div className="benefit-badge">03</div>
                <div>
                  <h4>Dedicated Key Account Officer</h4>
                  <p>Your team receives direct point-of-contact support from botanical procurement specialists who understand formulation science and international freight.</p>
                </div>
              </div>

              <div className="benefit-item">
                <div className="benefit-badge">04</div>
                <div>
                  <h4>Agile Commercial Terms</h4>
                  <p>From initial R&amp;D sample batches to continuous annual delivery schedules, we structure commercial terms that fit your inventory cycle.</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 4-Step Partnership Journey */}
      <section className="partnership-steps-section">
        <Container size="default">
          <div className="section-header text-center">
            <span className="section-eyebrow">How It Works</span>
            <h2 className="section-title">Our 4-Step Partnership Onboarding</h2>
            <p className="section-subtitle">
              From requirement definition to delivery at your formulation facility.
            </p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <span className="step-num">Step 1</span>
              <h4>Requirement &amp; Spec Intake</h4>
              <p>Share target botanical name, extraction ratio, active marker percentage, mesh size, packaging, and volume needs.</p>
            </div>
            <div className="step-card">
              <span className="step-num">Step 2</span>
              <h4>Technical Validation &amp; Samples</h4>
              <p>We provide lot-specific Certificates of Analysis (CoA) and sample batches for internal R&amp;D and assay confirmation.</p>
            </div>
            <div className="step-card">
              <span className="step-num">Step 3</span>
              <h4>Commercial Agreement</h4>
              <p>We finalize competitive volume pricing, production timelines, packaging specifications, and delivery logistics.</p>
            </div>
            <div className="step-card">
              <span className="step-num">Step 4</span>
              <h4>Quality Release &amp; Dispatch</h4>
              <p>Batch quality sign-off, full technical dossier release, and insured multi-modal dispatch to your destination facility.</p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Bottom Banner */}
      <section className="partnership-cta-banner">
        <Container size="default">
          <div className="partnership-cta-box">
            <div className="cta-box-text">
              <span className="cta-eyebrow">Begin Your Collaboration</span>
              <h2>Ready to Discuss a Supply Partnership?</h2>
              <p>
                Submit your ingredient specifications or schedule an introductory procurement consultation with our supply team today.
              </p>
            </div>
            <div className="cta-box-buttons">
              <Button
                to="/submit-requirement"
                variant="primary"
                size="lg"
                iconRight={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                }
              >
                Submit Requirement
              </Button>
              <Button
                to="/contact"
                variant="secondary"
                size="lg"
              >
                Contact Desk
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
