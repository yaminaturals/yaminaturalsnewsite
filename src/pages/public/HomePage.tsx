import React, { useEffect, useState } from 'react';
import { Container } from '../../components/ui/Container/Container';
import { Button } from '../../components/ui/Button/Button';
import { Card } from '../../components/ui/Card/Card';
import { Badge } from '../../components/ui/Badge/Badge';
import { categoryService } from '../../services/CategoryService';
import { ProductCategory } from '../../types';
import { HeroSection } from '../../components/sections/HeroSection/HeroSection';
import { CapabilityStrip } from '../../components/sections/CapabilityStrip/CapabilityStrip';
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
      {/* 1. HERO SECTION (Step 5A: Dedicated Editorial Procurement Hero) */}
      <HeroSection />

      {/* 2. CAPABILITY / OFFERING STRIP (Step 5B: Breadth of Natural Offerings) */}
      <CapabilityStrip />

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
