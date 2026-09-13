import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../ui/Container/Container';
import { ParallaxLayer } from '../../ui/ParallaxLayer/ParallaxLayer';
import { whyYamiContent } from '../../../data/whyYami.data';
import { WhyYamiPrinciple } from './WhyYamiPrinciple';
import './WhyYamiSection.css';

export const WhyYamiSection: React.FC = () => {
  const {
    eyebrow,
    heading,
    headingEmphasis,
    supportingText,
    principles,
    supportingLink,
  } = whyYamiContent;

  return (
    <section
      className="why-yami-section"
      aria-labelledby="why-yami-heading"
      id="why-yami-naturals"
    >
      {/* Background Decorative Botanical Silhouette (Left Side) */}
      <div className="why-yami-bg-decoration" aria-hidden="true">
        <ParallaxLayer speed={-0.03} className="why-yami-parallax-motif">
          <svg
            viewBox="0 0 160 160"
            fill="none"
            className="why-yami-watermark-svg"
            aria-hidden="true"
          >
            <circle
              cx="80"
              cy="80"
              r="76"
              stroke="var(--color-primary-green)"
              strokeWidth="0.8"
              strokeDasharray="4 4"
              strokeOpacity="0.15"
            />
            <path
              d="M80 14 C110 45, 120 115, 80 146 C40 115, 50 45, 80 14 Z"
              fill="var(--color-primary-green)"
              fillOpacity="0.03"
              stroke="var(--color-primary-green)"
              strokeWidth="0.75"
              strokeOpacity="0.2"
            />
            <path
              d="M80 28 L80 132"
              stroke="var(--color-primary-green)"
              strokeWidth="0.6"
              strokeOpacity="0.25"
            />
          </svg>
        </ParallaxLayer>
      </div>

      <Container size="default" className="why-yami-container">
        <div className="why-yami-layout">
          {/* LEFT COLUMN: Editorial Narrative & Strategy */}
          <div className="why-yami-editorial-col animate-fade-up">
            <div className="why-yami-eyebrow-wrapper">
              <span className="why-yami-eyebrow">
                <span className="why-yami-eyebrow-leaf" aria-hidden="true">🌿</span>
                {eyebrow}
              </span>
            </div>

            <h2 id="why-yami-heading" className="why-yami-heading">
              <span className="why-yami-heading-main">{heading}</span>
              {headingEmphasis && (
                <span className="why-yami-heading-emphasis">
                  {headingEmphasis}
                </span>
              )}
            </h2>

            <p className="why-yami-supporting-text">
              {supportingText}
            </p>

            {/* Core Strategy Callout Note */}
            <div className="why-yami-strategy-quote">
              <div className="strategy-quote-bar" aria-hidden="true" />
              <p className="strategy-quote-text">
                &ldquo;You bring the requirement. We help organize the path toward the right product or ingredient.&rdquo;
              </p>
            </div>

            {/* Subtle Text Link to Avoid Heavy CTA Repetition */}
            {supportingLink && (
              <div className="why-yami-link-wrapper">
                <Link
                  to={supportingLink.path}
                  className="why-yami-approach-link"
                  aria-label="Explore our requirement-first sourcing approach"
                >
                  <span className="link-text">{supportingLink.label}</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="link-arrow"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: 2x2 Principle Cards Grid */}
          <div className="why-yami-principles-col">
            <div
              className="why-yami-grid"
              role="region"
              aria-label="Procurement approach principles"
            >
              {principles.map((principle, index) => (
                <WhyYamiPrinciple
                  key={principle.id}
                  principle={principle}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
