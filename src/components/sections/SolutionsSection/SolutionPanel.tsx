import React from 'react';
import { Button } from '../../ui/Button/Button';
import { SolutionItem } from '../../../data/solutions.data';

interface SolutionPanelProps {
  solution: SolutionItem;
  index: number;
}

export const SolutionPanel: React.FC<SolutionPanelProps> = ({
  solution,
  index,
}) => {
  const headingId = `solution-heading-${solution.id}`;

  return (
    <article
      className={`solution-panel solution-panel--${solution.id} animate-fade-up delay-${index + 1}`}
      aria-labelledby={headingId}
    >
      {/* Visual Image Header */}
      <div className="solution-panel-media">
        <img
          src={solution.image.src}
          alt={solution.image.alt}
          className="solution-panel-img"
          loading="lazy"
          width="600"
          height="360"
        />
        <div className="solution-panel-media-overlay" aria-hidden="true" />

        {/* Floating Tagline Badge */}
        <div className="solution-media-badge" aria-hidden="true">
          <span className="solution-media-badge-dot" />
          <span className="solution-media-badge-text">
            {solution.theme.tagline}
          </span>
        </div>

        {/* Botanical Motif Watermark SVG */}
        <div className="solution-media-motif" aria-hidden="true">
          {solution.id === 'b2b' ? (
            <svg viewBox="0 0 40 40" fill="none" className="solution-motif-svg">
              <rect
                x="8"
                y="6"
                width="24"
                height="28"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path d="M14 14h12M14 20h8M14 26h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 40 40" fill="none" className="solution-motif-svg">
              <path
                d="M20 6c-8 6-8 16 0 24 8-8 8-18 0-24z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path d="M20 6v24" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          )}
        </div>
      </div>

      {/* Panel Editorial Body */}
      <div className="solution-panel-body">
        {/* Eyebrow & Classification Badges */}
        <div className="solution-panel-badges">
          <span className={`solution-eyebrow-pill solution-eyebrow-pill--${solution.id}`}>
            {solution.eyebrow}
          </span>
          <span className="solution-category-tag">
            {solution.badgeLabel}
          </span>
        </div>

        {/* Panel Main Title */}
        <h3 id={headingId} className="solution-panel-title">
          {solution.title}
        </h3>

        {/* Panel Description */}
        <p className="solution-panel-desc">{solution.description}</p>

        {/* Supporting Points List */}
        <div className="solution-points-wrapper">
          <span className="solution-points-label" id={`points-label-${solution.id}`}>
            Key Capabilities
          </span>
          <ul
            className="solution-points-list"
            aria-labelledby={`points-label-${solution.id}`}
          >
            {solution.supportingPoints.map((point, ptIdx) => (
              <li key={ptIdx} className="solution-point-item">
                <span className="solution-point-icon" aria-hidden="true">
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    className="solution-check-svg"
                  >
                    <path
                      d="M3.5 8.5l3 3 6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="solution-point-text">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Direct Pathway CTA Button */}
        <div className="solution-panel-footer">
          <Button
            to={solution.ctaLink}
            variant={solution.ctaVariant === 'primary' ? 'primary' : 'outline'}
            size="lg"
            fullWidth
            className={`solution-cta-btn solution-cta-btn--${solution.id}`}
            iconRight={
              <svg
                viewBox="0 0 16 16"
                fill="none"
                className="solution-arrow-svg"
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
            {solution.ctaText}
          </Button>
        </div>
      </div>
    </article>
  );
};
