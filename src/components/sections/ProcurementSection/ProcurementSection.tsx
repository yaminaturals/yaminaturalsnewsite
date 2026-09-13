import React from 'react';
import { Container } from '../../ui/Container/Container';
import { Button } from '../../ui/Button/Button';
import { ParallaxLayer } from '../../ui/ParallaxLayer/ParallaxLayer';
import { procurementContent } from '../../../data/procurement.data';
import { ProcurementJourney } from './ProcurementJourney';
import './ProcurementSection.css';

export const ProcurementSection: React.FC = () => {
  const {
    eyebrow,
    heading,
    headingHighlight,
    supportingText,
    noteText,
    primaryCta,
    secondaryCta,
    stages,
  } = procurementContent;

  return (
    <section
      className="procurement-section"
      aria-labelledby="procurement-heading"
      id="procurement-support"
    >
      {/* Background Subtle Organic Watermark & Parallax Line */}
      <div className="procurement-bg-decoration" aria-hidden="true">
        <ParallaxLayer speed={-0.04} className="procurement-parallax-leaf">
          <svg
            viewBox="0 0 120 120"
            fill="none"
            className="procurement-watermark-svg"
            aria-hidden="true"
          >
            <path
              d="M60 10 C85 35, 95 75, 60 110 C25 75, 35 35, 60 10 Z"
              stroke="var(--color-primary-green)"
              strokeWidth="0.8"
              strokeDasharray="4 4"
            />
            <path
              d="M60 25 C75 45, 80 75, 60 100 C40 75, 45 45, 60 25 Z"
              fill="var(--color-primary-green)"
              fillOpacity="0.04"
            />
            <path
              d="M60 25 L60 100"
              stroke="var(--color-primary-green)"
              strokeWidth="0.6"
              strokeOpacity="0.3"
            />
          </svg>
        </ParallaxLayer>
      </div>

      <Container size="default" className="procurement-container">
        <div className="procurement-layout">
          {/* LEFT COLUMN: Editorial Heading, Value Proposition & Actions */}
          <div className="procurement-editorial-col animate-fade-up">
            <div className="procurement-badge-wrapper">
              <span className="eyebrow procurement-eyebrow">
                <span className="procurement-eyebrow-leaf" aria-hidden="true">🌿</span>
                {eyebrow}
              </span>
            </div>

            <h2 id="procurement-heading" className="procurement-heading">
              <span className="procurement-heading-main">{heading}</span>
              <span className="procurement-heading-highlight">{headingHighlight}</span>
            </h2>

            <p className="procurement-supporting-text text-lead">
              {supportingText}
            </p>

            {/* Proposition Differentiator Note */}
            <div className="procurement-differentiator-box">
              <div className="differentiator-accent-bar" aria-hidden="true" />
              <div className="differentiator-content">
                <span className="differentiator-tag">Guidance Approach</span>
                <p className="differentiator-text">{noteText}</p>
              </div>
            </div>

            {/* CTA Group */}
            <div className="procurement-cta-group">
              <Button
                to={primaryCta.path}
                variant="primary"
                size="lg"
                className="procurement-primary-btn"
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
                className="procurement-secondary-btn"
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
          </div>

          {/* RIGHT COLUMN: Connected Botanical Procurement Journey */}
          <div className="procurement-journey-col">
            <ProcurementJourney stages={stages} />
          </div>
        </div>
      </Container>
    </section>
  );
};
