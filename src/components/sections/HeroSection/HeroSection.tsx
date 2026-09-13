import React from 'react';
import { Container } from '../../ui/Container/Container';
import { Button } from '../../ui/Button/Button';
import { ParallaxLayer } from '../../ui/ParallaxLayer/ParallaxLayer';
import './HeroSection.css';

export const HeroSection: React.FC = () => {
  return (
    <section className="hero-section" aria-label="Hero Introduction">
      {/* Background Organic Parallax Elements */}
      <div className="hero-background-parallax" aria-hidden="true">
        <ParallaxLayer speed={0.12} className="hero-parallax-element-1">
          <svg
            className="hero-bg-leaf-motif hero-bg-leaf-motif-1"
            viewBox="0 0 100 100"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M10 90 Q 30 20 90 10 Q 70 80 10 90 Z"
              fill="currentColor"
            />
            <path
              d="M10 90 Q 50 50 90 10"
              stroke="currentColor"
              strokeWidth="0.8"
            />
          </svg>
        </ParallaxLayer>

        <ParallaxLayer speed={-0.08} className="hero-parallax-element-2">
          <svg
            className="hero-bg-leaf-motif hero-bg-leaf-motif-2"
            viewBox="0 0 100 100"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="50"
              cy="50"
              r="44"
              stroke="currentColor"
              strokeWidth="0.7"
              strokeDasharray="2.5 2.5"
            />
            <path
              d="M50 15 C 65 30, 65 70, 50 85 C 35 70, 35 30, 50 15 Z"
              fill="currentColor"
            />
          </svg>
        </ParallaxLayer>
      </div>

      <Container size="default" className="hero-container">
        <div className="hero-grid">
          {/* LEFT COLUMN: Editorial Copy & Conversion CTAs */}
          <div className="hero-text-content">
            {/* Eyebrow badge */}
            <div className="hero-eyebrow-wrapper animate-fade-up">
              <span className="hero-eyebrow eyebrow-text">
                <svg
                  className="hero-eyebrow-icon"
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 2a10 10 0 0 1 10 10c0 5.5-4.5 10-10 10S2 17.5 2 12A10 10 0 0 1 12 2z" />
                  <path d="M12 6v12" />
                  <path d="M8 10c2-2 6-2 8 0" />
                </svg>
                HERBAL • NUTRACEUTICAL • NATURAL
              </span>
            </div>

            {/* Main H1 Heading */}
            <h1 className="hero-heading animate-fade-up delay-1">
              Natural Ingredients.
              <span className="hero-heading-break"> Real Possibilities.</span>
            </h1>

            {/* Supporting Paragraph */}
            <p className="hero-description text-lead animate-fade-up delay-2">
              From herbal powders and extracts to oils, cosmetic clays and nutraceutical products, Yami Naturals helps you find the right product solution for your requirements.
            </p>

            {/* Conversion CTA Button Group */}
            <div className="hero-actions animate-fade-up delay-3">
              <Button
                to="/submit-requirement"
                variant="primary"
                size="lg"
                className="hero-btn-primary"
                iconRight={
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                }
              >
                Submit Your Requirement
              </Button>

              <Button
                to="/products"
                variant="outline"
                size="lg"
                className="hero-btn-secondary"
              >
                Explore Products
              </Button>
            </div>

            {/* Honest Procurement Note */}
            <p className="hero-procurement-note text-xs text-muted animate-fade-up delay-4">
              * Dedicated requirement submission and specialized natural ingredients sourcing desk — direct volume supply and custom specifications.
            </p>
          </div>

          {/* RIGHT COLUMN: Premium Botanical Visual Composition */}
          <div className="hero-visual-wrapper animate-scale-in delay-2">
            <div className="hero-card-frame">
              <div className="hero-image-container">
                <img
                  src="/images/hero-botanicals.jpg"
                  alt="Curated natural botanical ingredients, herbal powders in ceramic bowls, cold-pressed golden oil dropper bottle, and fresh medicinal leaves in an editorial procurement setting"
                  className="hero-image"
                  width="800"
                  height="600"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>

              {/* Floating Botanical Specification Badge */}
              <div className="hero-floating-badge animate-float" aria-hidden="true">
                <div className="floating-badge-icon">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <polyline points="9 12 11 14 15 10" />
                  </svg>
                </div>
                <div className="floating-badge-text">
                  <span className="floating-badge-title">Requirement-Based</span>
                  <span className="floating-badge-sub">Sourcing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
