import React from 'react';
import { Container } from '../../ui/Container/Container';
import { Button } from '../../ui/Button/Button';
import { ParallaxLayer } from '../../ui/ParallaxLayer/ParallaxLayer';
import { requirementCtaContent } from '../../../data/requirementCta.data';
import './RequirementCtaSection.css';

export const RequirementCtaSection: React.FC = () => {
  const {
    eyebrow,
    headingPart1,
    headingPart2,
    supportingText,
    guidanceLine,
    primaryCta,
    secondaryCta,
  } = requirementCtaContent;

  return (
    <section
      className="requirement-cta-section"
      aria-labelledby="requirement-cta-heading"
      id="requirement-cta"
    >
      {/* Background Subtle Botanical Edge Accents */}
      <div className="requirement-cta-bg-decorations" aria-hidden="true">
        {/* Left Decorative Botanical Branch Silhouette */}
        <ParallaxLayer speed={-0.03} className="cta-parallax-leaf cta-parallax-left">
          <svg
            viewBox="0 0 160 280"
            fill="none"
            className="cta-leaf-svg"
            aria-hidden="true"
          >
            <path
              d="M10 270 C30 200, 70 140, 140 80"
              stroke="rgba(232, 245, 238, 0.12)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <path
              d="M140 80 C110 60, 80 80, 70 110 C80 130, 110 120, 140 80 Z"
              fill="rgba(232, 245, 238, 0.04)"
              stroke="rgba(232, 245, 238, 0.12)"
              strokeWidth="1"
            />
            <path
              d="M90 140 C60 130, 40 150, 40 180 C60 190, 80 170, 90 140 Z"
              fill="rgba(232, 245, 238, 0.03)"
              stroke="rgba(232, 245, 238, 0.08)"
              strokeWidth="1"
            />
          </svg>
        </ParallaxLayer>

        {/* Right Decorative Botanical Leaf Outline */}
        <ParallaxLayer speed={0.03} className="cta-parallax-leaf cta-parallax-right">
          <svg
            viewBox="0 0 160 280"
            fill="none"
            className="cta-leaf-svg"
            aria-hidden="true"
          >
            <path
              d="M150 10 C130 80, 90 140, 20 200"
              stroke="rgba(232, 245, 238, 0.12)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <path
              d="M20 200 C50 220, 80 200, 90 170 C80 150, 50 160, 20 200 Z"
              fill="rgba(232, 245, 238, 0.04)"
              stroke="rgba(232, 245, 238, 0.12)"
              strokeWidth="1"
            />
            <path
              d="M70 140 C100 150, 120 130, 120 100 C100 90, 80 110, 70 140 Z"
              fill="rgba(232, 245, 238, 0.03)"
              stroke="rgba(232, 245, 238, 0.08)"
              strokeWidth="1"
            />
          </svg>
        </ParallaxLayer>

        {/* Subtle Ambient Radial Glow */}
        <div className="cta-ambient-glow" aria-hidden="true" />
      </div>

      <Container size="narrow" className="requirement-cta-container">
        <div className="requirement-cta-content text-center">
          {/* Eyebrow */}
          <div className="requirement-cta-eyebrow-wrapper animate-fade-up">
            <span
              className="requirement-cta-eyebrow"
              style={{ color: '#C2DFCE' }}
            >
              <span className="requirement-cta-eyebrow-icon" aria-hidden="true">🌿</span>
              {eyebrow}
            </span>
          </div>

          {/* Heading */}
          <h2 id="requirement-cta-heading" className="requirement-cta-heading animate-fade-up delay-1">
            <span className="cta-heading-line">{headingPart1}</span>
            <span className="cta-heading-line cta-heading-emphasis">{headingPart2}</span>
          </h2>

          {/* Supporting Text - Guaranteed #D5E5DC */}
          <p
            className="requirement-cta-supporting-text animate-fade-up delay-2"
            style={{ color: '#D5E5DC' }}
          >
            {supportingText}
          </p>

          {/* CTA Actions Group */}
          <div className="requirement-cta-actions animate-fade-up delay-3">
            <Button
              to={primaryCta.path}
              variant="accent"
              size="lg"
              className="requirement-cta-btn-primary"
              iconRight={
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              }
            >
              {primaryCta.label}
            </Button>

            <Button
              to={secondaryCta.path}
              variant="outline"
              size="lg"
              className="requirement-cta-btn-secondary"
              iconRight={
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              }
            >
              {secondaryCta.label}
            </Button>
          </div>

          {/* Helpful Guidance Line */}
          <div className="requirement-cta-guidance animate-fade-up delay-4" role="note">
            <span className="cta-guidance-pill" style={{ color: '#DDEEE5' }}>
              <span className="cta-guidance-dot" aria-hidden="true" />
              {guidanceLine}
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
};
