import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../ui/Container/Container';
import { Button } from '../../ui/Button/Button';
import { ParallaxLayer } from '../../ui/ParallaxLayer/ParallaxLayer';
import { finalCtaContent } from '../../../data/finalCta.data';
import './FinalCTASection.css';

export const FinalCTASection: React.FC = () => {
  const {
    eyebrow,
    heading,
    headingEmphasis,
    supportingText,
    primaryCta,
    secondaryCta,
    microcopy,
    pathwayLinks,
  } = finalCtaContent;

  return (
    <section
      className="final-cta-section"
      aria-labelledby="final-cta-heading"
      id="final-cta"
    >
      {/* Background Decorative Botanical & Geometric Geometry */}
      <div className="final-cta-bg-decorations" aria-hidden="true">
        {/* Subtle Ambient Radial Lighting */}
        <div className="final-cta-ambient-glow" />

        {/* Oversized Brand Watermark */}
        <div className="final-cta-watermark">YAMI NATURALS</div>

        {/* Left Botanical Decorative Linework */}
        <div className="final-cta-leaf-layer final-cta-leaf-left">
          <ParallaxLayer speed={-0.015}>
            <svg
              viewBox="0 0 260 420"
              fill="none"
              className="final-cta-leaf-svg"
              aria-hidden="true"
            >
              <path
                d="M20 400 C30 250, 160 160, 240 20"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeDasharray="6 6"
                opacity="0.25"
              />
              <path
                d="M40 410 C120 330, 200 240, 220 80"
                stroke="var(--color-amber-accent)"
                strokeWidth="1.2"
                opacity="0.2"
              />
              <circle
                cx="160"
                cy="180"
                r="70"
                stroke="currentColor"
                strokeWidth="0.8"
                strokeDasharray="4 4"
                opacity="0.15"
              />
            </svg>
          </ParallaxLayer>
        </div>

        {/* Right Botanical Decorative Linework */}
        <div className="final-cta-leaf-layer final-cta-leaf-right">
          <ParallaxLayer speed={-0.015}>
            <svg
              viewBox="0 0 260 420"
              fill="none"
              className="final-cta-leaf-svg"
              aria-hidden="true"
            >
              <path
                d="M240 400 C230 250, 100 160, 20 20"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeDasharray="6 6"
                opacity="0.25"
              />
              <path
                d="M220 410 C140 330, 60 240, 40 80"
                stroke="var(--color-amber-accent)"
                strokeWidth="1.2"
                opacity="0.2"
              />
              <circle
                cx="100"
                cy="180"
                r="70"
                stroke="currentColor"
                strokeWidth="0.8"
                strokeDasharray="4 4"
                opacity="0.15"
              />
            </svg>
          </ParallaxLayer>
        </div>
      </div>

      <Container size="default">
        <div className="final-cta-content animate-fade-up">
          {/* Eyebrow Badge */}
          <div className="final-cta-eyebrow-wrapper">
            <span className="final-cta-eyebrow-icon" aria-hidden="true">🌿</span>
            <span className="final-cta-eyebrow-text">{eyebrow}</span>
          </div>

          {/* Editorial Heading */}
          <h2 id="final-cta-heading" className="final-cta-title">
            {heading}{' '}
            {headingEmphasis && (
              <span className="final-cta-emphasis">{headingEmphasis}</span>
            )}
          </h2>

          {/* Supporting Narrative */}
          <p className="final-cta-desc">{supportingText}</p>

          {/* CTA Action Buttons */}
          <div className="final-cta-actions">
            <Button
              to={primaryCta.link}
              variant="accent"
              size="lg"
              className="final-cta-primary-btn"
              iconRight={
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  className="final-cta-arrow"
                  aria-hidden="true"
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            >
              {primaryCta.text}
            </Button>

            <Button
              to={secondaryCta.link}
              variant="outline"
              size="lg"
              className="final-cta-secondary-btn"
            >
              {secondaryCta.text}
            </Button>
          </div>

          {/* Supporting Microcopy */}
          <div className="final-cta-microcopy-wrapper">
            <span className="final-cta-microcopy-dot" aria-hidden="true" />
            <span className="final-cta-microcopy-text">{microcopy}</span>
          </div>

          {/* Optional Secondary Pathway Links */}
          {pathwayLinks && pathwayLinks.length > 0 && (
            <div className="final-cta-pathways" aria-label="Alternative pathways">
              {pathwayLinks.map((pathway, idx) => (
                <React.Fragment key={pathway.link}>
                  {idx > 0 && (
                    <span className="final-cta-pathway-divider" aria-hidden="true">
                      •
                    </span>
                  )}
                  <Link to={pathway.link} className="final-cta-pathway-link">
                    <span>{pathway.label}</span>
                    <span className="final-cta-pathway-arrow" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};
