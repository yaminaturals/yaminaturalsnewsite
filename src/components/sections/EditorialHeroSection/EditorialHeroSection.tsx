import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../ui/Container/Container';
import { Button } from '../../ui/Button/Button';
import './EditorialHeroSection.css';

export const EditorialHeroSection: React.FC = () => {
  return (
    <section className="editorial-hero-section" aria-label="Editorial Introduction">
      {/* Background Subtle Botanical Atmosphere */}
      <div className="editorial-hero-bg" aria-hidden="true">
        <div className="editorial-bg-gradient" />
        <svg
          className="editorial-bg-leaf-pattern"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50 350 C 120 180, 220 80, 380 20 C 320 160, 220 280, 50 350 Z"
            stroke="rgba(13, 92, 58, 0.05)"
            strokeWidth="1.5"
            fill="rgba(232, 245, 238, 0.4)"
          />
          <path
            d="M50 350 Q 215 185 380 20"
            stroke="rgba(201, 138, 30, 0.18)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        </svg>
      </div>

      <Container size="default" className="editorial-hero-container">
        <div className="editorial-hero-grid">
          {/* LEFT COLUMN: Editorial Content */}
          <div className="editorial-hero-content">
            {/* Refined Eyebrow with subtle amber accent — Not a pill */}
            <div className="editorial-eyebrow-container animate-fade-up">
              <span className="editorial-eyebrow-bar" aria-hidden="true" />
              <span className="editorial-eyebrow">HERBAL • NUTRACEUTICAL • NATURAL</span>
            </div>

            {/* Primary H1 Headline */}
            <h1 className="editorial-hero-heading animate-fade-up delay-1">
              <span className="editorial-heading-line">Natural Ingredients.</span>
              <span className="editorial-heading-line editorial-heading-line-split">
                Real <span className="editorial-heading-highlight">Possibilities.</span>
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="editorial-hero-description animate-fade-up delay-2">
              From herbal powders and extracts to oils, cosmetic clays and nutraceutical products, Yami Naturals helps you find the right product solution for your requirements.
            </p>

            {/* CTA Group: Primary solid dark-green button & Secondary editorial text-link */}
            <div className="editorial-hero-actions animate-fade-up delay-3">
              <Button
                to="/submit-requirement"
                variant="primary"
                size="lg"
                className="editorial-primary-btn"
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

              <Link
                to="/products"
                className="editorial-secondary-link"
                aria-label="Explore Products Catalog"
              >
                <span>Explore Products</span>
                <svg
                  className="editorial-link-arrow"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>

            {/* Honest Sourcing Desk Microcopy */}
            <p className="editorial-microcopy animate-fade-up delay-4">
              * Dedicated requirement submission and specialized natural ingredients sourcing desk — direct volume supply and custom specifications.
            </p>
          </div>

          {/* RIGHT COLUMN: Asymmetric Botanical Visual Composition */}
          <div className="editorial-hero-visual animate-scale-in delay-2">
            <div className="editorial-visual-stage">
              {/* Organic Decorative Ambient Layers */}
              <div className="editorial-backdrop-aura" aria-hidden="true" />
              <div className="editorial-gold-ring" aria-hidden="true" />

              {/* Primary Architectural Arch Frame */}
              <div className="editorial-arch-frame">
                <img
                  src="/images/categories/herbal-extracts.jpg"
                  alt="Standardized botanical extract liquid with dropper and herbal raw ingredients"
                  className="editorial-arch-image"
                  width="540"
                  height="640"
                  loading="eager"
                  fetchPriority="high"
                />
                <div className="editorial-arch-glare" aria-hidden="true" />
              </div>

              {/* Secondary Circular Offset Botanical Detail */}
              <div className="editorial-circle-frame" aria-hidden="true">
                <img
                  src="/images/categories/natural-oils.jpg"
                  alt="Pure cold-pressed botanical oil dropper"
                  className="editorial-circle-image"
                  width="200"
                  height="200"
                  loading="lazy"
                />
              </div>

              {/* Floating Botanical Verification Tag */}
              <div className="editorial-floating-tag" aria-hidden="true">
                <div className="editorial-tag-icon">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <polyline points="9 12 11 14 15 10" />
                  </svg>
                </div>
                <div className="editorial-tag-content">
                  <span className="editorial-tag-title">Requirement-Based Desk</span>
                  <span className="editorial-tag-desc">Direct Botanical Supply</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
