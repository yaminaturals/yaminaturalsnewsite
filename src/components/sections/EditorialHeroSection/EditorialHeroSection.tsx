import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../ui/Container/Container';
import { Button } from '../../ui/Button/Button';
import './EditorialHeroSection.css';

export const EditorialHeroSection: React.FC = () => {
  return (
    <section className="editorial-hero-section" aria-label="Editorial Introduction">
      <Container size="default" className="editorial-hero-container">
        <div className="editorial-hero-grid">
          {/* LEFT COLUMN: Editorial Typography & Actions */}
          <div className="editorial-hero-content">
            {/* Eyebrow with gold accent rule */}
            <div className="editorial-eyebrow-container animate-fade-up">
              <span className="editorial-eyebrow-rule" aria-hidden="true" />
              <span className="editorial-eyebrow">
                YAMI NATURALS PVT. LTD. — HERBAL MANUFACTURER, INDIA
              </span>
            </div>

            {/* 3-Tier Editorial Heading */}
            <h1 className="editorial-hero-heading animate-fade-up delay-1">
              <span className="editorial-heading-line-1">Ancient wisdom,</span>
              <span className="editorial-heading-line-2">modern wellness.</span>
              <span className="editorial-heading-line-3">Manufactured at scale for your brand.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="editorial-hero-description animate-fade-up delay-2">
              We manufacture herbal powders, standardized extracts, cosmetic clays and cold-pressed oils — in bulk, lab-tested and private-label ready. Rooted in nature. Backed by science. Made for you.
            </p>

            {/* CTA Group: Request Bulk Quote & Explore The Catalogue */}
            <div className="editorial-hero-actions animate-fade-up delay-3">
              <Button
                to="/submit-requirement"
                variant="primary"
                size="lg"
                className="editorial-btn-bulk-quote"
                iconRight={
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                }
              >
                REQUEST BULK QUOTE
              </Button>

              <Link
                to="/products"
                className="editorial-link-catalogue"
                aria-label="Explore the catalogue"
              >
                <span>EXPLORE THE CATALOGUE</span>
                <svg
                  className="editorial-catalogue-arrow"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <polyline points="19 12 12 19 5 12" />
                </svg>
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: Arch Frame with Botanical Leaves, Floating Feature Badges & GMP Card */}
          <div className="editorial-hero-visual animate-scale-in delay-2">
            <div className="editorial-visual-canvas">
              {/* Main Architectural Soft Arch Frame */}
              <div className="editorial-leaf-arch">
                <img
                  src="/images/editorial-herbarium-leaves.jpg"
                  alt="Curated fresh botanical herbal plant specimens laid flat on minimalist fine art backdrop"
                  className="editorial-leaf-image"
                  width="620"
                  height="620"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>

              {/* Floating Top-Right Feature Icons Stack */}
              <div className="editorial-floating-icons" aria-hidden="true">
                <div className="editorial-circle-badge editorial-badge-leaf" title="Herbal Botanical Sourcing">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                  </svg>
                </div>
                <div className="editorial-circle-badge editorial-badge-lab" title="Standardized Scientific Extraction">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M10 2v7.31L4.62 20.12A1 1 0 0 0 5.5 22h13a1 1 0 0 0 .88-1.88L14 9.31V2" />
                    <path d="M8.5 2h7" />
                    <path d="M7 16h10" />
                  </svg>
                </div>
              </div>

              {/* Floating GMP Certification Badge */}
              <div className="editorial-gmp-card" aria-hidden="true">
                <div className="editorial-gmp-icon">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="15" rx="2" />
                    <polyline points="7 9 10 12 17 8" />
                    <circle cx="12" cy="18" r="2.5" />
                    <path d="M10.5 20.5 9 22" />
                    <path d="M13.5 20.5 15 22" />
                  </svg>
                </div>
                <div className="editorial-gmp-text">
                  <span className="editorial-gmp-title">GMP Certified</span>
                  <span className="editorial-gmp-sub">Third-party lab tested</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
