import React from 'react';
import { Container } from '../../ui/Container/Container';
import { Button } from '../../ui/Button/Button';
import { ParallaxLayer } from '../../ui/ParallaxLayer/ParallaxLayer';
import { trustExperienceContent } from '../../../data/trustExperience.data';
import { TrustPrinciple } from './TrustPrinciple';
import './TrustExperienceSection.css';

export const TrustExperienceSection: React.FC = () => {
  const {
    eyebrow,
    heading,
    headingEmphasis,
    supportingText,
    principles,
    statement,
    ctas,
  } = trustExperienceContent;

  return (
    <section
      className="trust-exp-section"
      aria-labelledby="trust-experience-heading"
      id="trust-experience"
    >
      {/* Background Decorative Botanical / Technical Process Parallax Layer */}
      <div className="trust-exp-bg-decoration" aria-hidden="true">
        <ParallaxLayer speed={-0.02} className="trust-exp-parallax-layer">
          <svg
            viewBox="0 0 400 400"
            fill="none"
            className="trust-exp-watermark-svg"
            aria-hidden="true"
          >
            {/* Subtle botanical growth arc and technical guiding concentric lines */}
            <circle
              cx="200"
              cy="200"
              r="160"
              stroke="var(--color-primary-green)"
              strokeWidth="0.8"
              strokeDasharray="4 6"
              opacity="0.12"
            />
            <circle
              cx="200"
              cy="200"
              r="100"
              stroke="var(--color-primary-green)"
              strokeWidth="0.8"
              strokeDasharray="6 8"
              opacity="0.10"
            />
            <path
              d="M80 320 C140 260, 240 240, 320 80"
              stroke="var(--color-amber-accent)"
              strokeWidth="1.2"
              strokeDasharray="8 6"
              opacity="0.18"
            />
            <path
              d="M120 340 C170 290, 260 270, 340 130"
              stroke="var(--color-primary-green)"
              strokeWidth="0.6"
              opacity="0.15"
            />
          </svg>
        </ParallaxLayer>
      </div>

      <Container size="default">
        {/* Section Header: Centered Editorial Composition */}
        <div className="trust-exp-header animate-fade-up">
          <div className="trust-exp-eyebrow-wrapper">
            <span className="trust-exp-eyebrow-icon" aria-hidden="true">🌿</span>
            <span className="trust-exp-eyebrow-text">{eyebrow}</span>
          </div>

          <h2 id="trust-experience-heading" className="trust-exp-title">
            {heading}{' '}
            {headingEmphasis && (
              <span className="trust-exp-title-emphasis">
                {headingEmphasis}
              </span>
            )}
          </h2>

          <p className="trust-exp-supporting-text">{supportingText}</p>
        </div>

        {/* Four Trust Principles: Refined 2x2 Grid */}
        <div className="trust-principles-grid">
          {principles.map((principle, idx) => (
            <TrustPrinciple
              key={principle.number}
              principle={principle}
              index={idx}
            />
          ))}
        </div>

        {/* Prominent Central Trust Statement & Direct Action */}
        <div className="trust-exp-statement-box animate-fade-up delay-4">
          <div className="trust-statement-inner">
            <div className="trust-statement-decoration" aria-hidden="true">
              <svg viewBox="0 0 60 60" fill="none" className="trust-statement-leaf-svg">
                <path
                  d="M30 6 C18 16, 16 34, 30 48 C44 34, 42 16, 30 6 Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                />
                <path d="M30 12v30" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </div>

            <div className="trust-statement-content">
              <blockquote className="trust-statement-quote">
                “{statement.highlight}”
              </blockquote>
              <p className="trust-statement-supporting">{statement.supporting}</p>
            </div>

            <div className="trust-statement-actions">
              <Button
                to={ctas.primary.link}
                variant="primary"
                size="lg"
                className="trust-cta-primary"
                iconRight={
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    className="trust-cta-arrow"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
              >
                {ctas.primary.text}
              </Button>

              <Button
                to={ctas.secondary.link}
                variant="outline"
                size="lg"
                className="trust-cta-secondary"
              >
                {ctas.secondary.text}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
