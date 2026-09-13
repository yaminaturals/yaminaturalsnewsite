import React, { useEffect, useState } from 'react';
import { Container } from '../../components/ui/Container/Container';
import { Button } from '../../components/ui/Button/Button';
import { Card } from '../../components/ui/Card/Card';
import { Badge } from '../../components/ui/Badge/Badge';
import { categoryService } from '../../services/CategoryService';
import { ProductCategory } from '../../types';
import { siteConfig } from '../../config/siteConfig';
import './HomePage.css';

export const HomePage: React.FC = () => {
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    categoryService.getCategories().then((cats) => {
      setCategories(cats);
      setLoading(false);
    });
  }, []);

  return (
    <div className="home-page animate-fade-in">
      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <Container size="default">
          <div className="hero-content text-center">
            <div className="hero-eyebrow">
              <Badge variant="accent" icon="🌿">
                Botanical & Natural Procurement
              </Badge>
            </div>
            <h1 className="hero-title">
              Precision Sourcing for Pure Botanicals, Extracts & Natural Ingredients
            </h1>
            <p className="hero-subtitle text-lead">
              Yami Naturals is a specialized procurement and product-support platform connecting verified herbal sources with B2B formulators and B2C clients worldwide.
            </p>

            {/* Core Conversion CTAs */}
            <div className="hero-actions">
              <Button to="/submit-requirement" variant="primary" size="lg">
                {siteConfig.primaryCTAs.submitRequirement}
              </Button>
              <Button to="/products" variant="secondary" size="lg">
                {siteConfig.primaryCTAs.exploreProducts}
              </Button>
              <Button to="/contact" variant="outline" size="lg">
                {siteConfig.primaryCTAs.talkToUs}
              </Button>
            </div>

            <div className="hero-disclaimer-note">
              * Dedicated requirement submission and direct procurement — no consumer cart or online checkout.
            </div>
          </div>
        </Container>
      </section>

      {/* 2. TRUST & CAPABILITY HIGHLIGHTS */}
      <section className="section-sm bg-warm-subtle">
        <Container size="default">
          <div className="grid grid-cols-1 tablet-grid-cols-2 desktop-grid-cols-4 gap-4">
            <Card variant="surface" padding="sm">
              <div className="trust-card-inner">
                <span className="trust-icon">🔬</span>
                <div>
                  <h6 style={{ margin: 0 }}>Specification-Driven</h6>
                  <p className="text-xs text-muted" style={{ margin: 0 }}>
                    Assay, mesh size & active marker testing
                  </p>
                </div>
              </div>
            </Card>

            <Card variant="surface" padding="sm">
              <div className="trust-card-inner">
                <span className="trust-icon">📦</span>
                <div>
                  <h6 style={{ margin: 0 }}>Flexible Volumes</h6>
                  <p className="text-xs text-muted" style={{ margin: 0 }}>
                    Kilograms to multi-tonne commercial supply
                  </p>
                </div>
              </div>
            </Card>

            <Card variant="surface" padding="sm">
              <div className="trust-card-inner">
                <span className="trust-icon">📋</span>
                <div>
                  <h6 style={{ margin: 0 }}>Documented Quality</h6>
                  <p className="text-xs text-muted" style={{ margin: 0 }}>
                    CoA, TDS & traceability records available
                  </p>
                </div>
              </div>
            </Card>

            <Card variant="surface" padding="sm">
              <div className="trust-card-inner">
                <span className="trust-icon">🤝</span>
                <div>
                  <h6 style={{ margin: 0 }}>B2B & B2C Support</h6>
                  <p className="text-xs text-muted" style={{ margin: 0 }}>
                    Dedicated assistance for every order size
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* 3. PRODUCT CATEGORIES DISCOVERY */}
      <section className="section bg-surface">
        <Container size="default">
          <div className="section-header text-center" style={{ maxWidth: '720px', margin: '0 auto var(--space-10)' }}>
            <span className="eyebrow">Product Catalog</span>
            <h2>Explore Natural & Herbal Categories</h2>
            <p className="text-muted">
              Discover verified pure whole powders, standardized extracts, cold-pressed oils, mineral clays, and dietary capsules.
            </p>
          </div>

          {loading ? (
            <div className="text-center" style={{ padding: 'var(--space-12)' }}>
              <div className="btn-spinner" style={{ display: 'inline-block', position: 'static' }} />
              <p className="text-sm text-muted" style={{ marginTop: 'var(--space-3)' }}>Loading categories...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 tablet-grid-cols-2 desktop-grid-cols-3 gap-6">
              {categories.map((cat) => (
                <Card key={cat.id} variant="surface" hoverable padding="md" className="category-card">
                  <div className="category-card-top">
                    <Badge variant="primary">{cat.productCount} Materials</Badge>
                  </div>
                  <h3>{cat.name}</h3>
                  <p className="text-sm text-muted">{cat.shortDescription}</p>
                  <div style={{ marginTop: 'var(--space-4)' }}>
                    <Button to={`/products?category=${cat.slug}`} variant="outline" size="sm">
                      View Ingredients →
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* 4. HOW PROCUREMENT WORKS */}
      <section className="section bg-botanical-tint">
        <Container size="default">
          <div className="section-header text-center" style={{ maxWidth: '720px', margin: '0 auto var(--space-10)' }}>
            <span className="eyebrow">Streamlined Process</span>
            <h2>How Sourcing with Yami Naturals Works</h2>
            <p className="text-muted">
              From requirement submission to final technical verification and delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 tablet-grid-cols-2 desktop-grid-cols-4 gap-6">
            <Card variant="surface" padding="md">
              <span className="step-num">01</span>
              <h5>Submit Requirement</h5>
              <p className="text-xs text-muted" style={{ margin: 0 }}>
                Specify ingredient name, required volume, standard, and target application.
              </p>
            </Card>

            <Card variant="surface" padding="md">
              <span className="step-num">02</span>
              <h5>Technical Matching</h5>
              <p className="text-xs text-muted" style={{ margin: 0 }}>
                We align your specifications with verified botanical lots and provide CoAs.
              </p>
            </Card>

            <Card variant="surface" padding="md">
              <span className="step-num">03</span>
              <h5>Quote & Sample</h5>
              <p className="text-xs text-muted" style={{ margin: 0 }}>
                Receive transparent pricing, MOQ details, and evaluation samples if required.
              </p>
            </Card>

            <Card variant="surface" padding="md">
              <span className="step-num">04</span>
              <h5>Fulfilment</h5>
              <p className="text-xs text-muted" style={{ margin: 0 }}>
                Secure packaging, batch documentation, and dispatch to your specified destination.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      {/* 5. PRIMARY ACTION CALLOUT */}
      <section className="section bg-dark-forest">
        <Container size="narrow">
          <div className="text-center">
            <span className="eyebrow eyebrow-accent">Ready to Source?</span>
            <h2 style={{ color: '#ffffff' }}>Have a Specific Material or Volume Requirement?</h2>
            <p style={{ color: '#b5cebf', maxWidth: '600px', margin: '0 auto var(--space-6)' }}>
              Whether you require a standard botanical extract or a custom formulated blend, our procurement team is ready to assist.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Button to="/submit-requirement" variant="accent" size="lg">
                Submit Your Requirement Now
              </Button>
              <Button to="/contact" variant="outline" size="lg" style={{ color: '#ffffff', borderColor: '#ffffff' }}>
                Contact Sourcing Desk
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
