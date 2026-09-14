import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../components/ui/Container/Container';
import { Button } from '../../components/ui/Button/Button';
import { Badge } from '../../components/ui/Badge/Badge';
import { Card } from '../../components/ui/Card/Card';
import { WhyYamiSection } from '../../components/sections/WhyYamiSection/WhyYamiSection';
import './WhyYamiNaturalsPage.css';

export const WhyYamiNaturalsPage: React.FC = () => {
  return (
    <div className="why-yami-page animate-fade-in">
      {/* Hero Section */}
      <section className="why-hero-section">
        <Container size="default">
          <div className="why-hero-inner">
            <nav className="why-breadcrumbs" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <span aria-current="page">Why Yami Naturals</span>
            </nav>

            <div className="why-badge-wrap">
              <Badge variant="primary">Botanical Quality &amp; Integrity</Badge>
            </div>

            <h1 className="why-hero-title">
              Why Global Brands Choose Yami Naturals
            </h1>

            <p className="why-hero-subtitle">
              We bridge botanical farms with international formulators. Through verified extraction,
              rigorous assay testing, and transparent documentation, we eliminate supply chain risks
              for high-integrity dietary and wellness products.
            </p>

            <div className="why-hero-actions">
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
                Submit Your Requirement
              </Button>
              <Button
                to="/products"
                variant="secondary"
                size="lg"
              >
                Explore Product Catalog
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Embedded WhyYami Core Principle Section */}
      <WhyYamiSection />

      {/* 6 Standards of Excellence */}
      <section className="standards-section">
        <Container size="default">
          <div className="section-header text-center">
            <span className="section-eyebrow">Our Quality Pillars</span>
            <h2 className="section-title">The 6 Standards of Yami Naturals Sourcing</h2>
            <p className="section-subtitle">
              How our procurement architecture guarantees safety, potency, and repeatability from harvest to shipment.
            </p>
          </div>

          <div className="standards-grid">
            <Card variant="surface" hoverable padding="lg" className="standard-card">
              <div className="standard-icon">🔬</div>
              <h3>1. Assay-Verified Potency</h3>
              <p>
                Every standardized extract is validated using High-Performance Liquid Chromatography (HPLC) or GC-MS to confirm declared active compound concentrations.
              </p>
            </Card>

            <Card variant="surface" hoverable padding="lg" className="standard-card">
              <div className="standard-icon">🌱</div>
              <h3>2. Direct Origin Integrity</h3>
              <p>
                Direct cultivation ties prevent species misidentification, fraudulent bulk blending, or unverified wild substitutions commonly found in secondary broker markets.
              </p>
            </Card>

            <Card variant="surface" hoverable padding="lg" className="standard-card">
              <div className="standard-icon">🛡️</div>
              <h3>3. Contaminant Screening</h3>
              <p>
                Rigorous testing panels for heavy metals (Lead, Arsenic, Cadmium, Mercury via ICP-MS), residual pesticide screens, aflatoxins, and microbial pathogens.
              </p>
            </Card>

            <Card variant="surface" hoverable padding="lg" className="standard-card">
              <div className="standard-icon">📑</div>
              <h3>4. Transparent Technical Dossiers</h3>
              <p>
                Every lot includes authentic Certificates of Analysis (CoA), Technical Data Sheets (TDS), Allergen Declarations, and Material Safety Data Sheets (MSDS).
              </p>
            </Card>

            <Card variant="surface" hoverable padding="lg" className="standard-card">
              <div className="standard-icon">⚖️</div>
              <h3>5. Scalable MOQs</h3>
              <p>
                We support growing brands from initial 1 kg R&amp;D proof-of-concept testing through to multi-ton institutional production runs without quality deviation.
              </p>
            </Card>

            <Card variant="surface" hoverable padding="lg" className="standard-card">
              <div className="standard-icon">✈️</div>
              <h3>6. Global Export Readiness</h3>
              <p>
                Temperature-managed packaging, compliant phytosanitary certification, and air/ocean freight coordination with door-to-door tracking for global customs ease.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      {/* CTA Bottom Box */}
      <section className="why-cta-section">
        <Container size="default">
          <div className="why-cta-banner">
            <div>
              <span className="why-cta-tag">Direct Sourcing Desk</span>
              <h2>Have a Specific Botanical Specification?</h2>
              <p>
                Connect directly with our procurement team to discuss your mesh size, extraction ratio, or target botanical lot.
              </p>
            </div>
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
              Submit Your Requirement
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
};
