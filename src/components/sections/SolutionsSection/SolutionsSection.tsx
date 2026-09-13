import React from 'react';
import { Container } from '../../ui/Container/Container';
import { ParallaxLayer } from '../../ui/ParallaxLayer/ParallaxLayer';
import { solutionsContent } from '../../../data/solutions.data';
import { SolutionPanel } from './SolutionPanel';
import './SolutionsSection.css';

export const SolutionsSection: React.FC = () => {
  const { eyebrow, heading, headingEmphasis, supportingText, solutions } =
    solutionsContent;

  return (
    <section
      className="solutions-section"
      aria-labelledby="solutions-heading"
      id="solutions-section"
    >
      {/* Decorative Botanical Parallax Silhouette */}
      <div className="solutions-bg-decoration" aria-hidden="true">
        <ParallaxLayer speed={-0.02} className="solutions-parallax-motif">
          <svg
            viewBox="0 0 200 200"
            fill="none"
            className="solutions-watermark-svg"
            aria-hidden="true"
          >
            <path
              d="M100 20 C60 50, 40 100, 40 160 C100 160, 150 140, 180 100 C150 60, 120 30, 100 20 Z"
              stroke="var(--color-primary-green)"
              strokeWidth="0.8"
              strokeDasharray="5 5"
              opacity="0.12"
            />
            <path
              d="M100 20 C100 80, 80 120, 40 160"
              stroke="var(--color-primary-green)"
              strokeWidth="0.8"
              strokeDasharray="3 3"
              opacity="0.1"
            />
          </svg>
        </ParallaxLayer>
      </div>

      <Container size="default">
        {/* Section Header */}
        <div className="solutions-header animate-fade-up">
          <div className="solutions-eyebrow-wrapper">
            <span className="solutions-eyebrow-icon" aria-hidden="true">🌿</span>
            <span className="solutions-eyebrow-text">{eyebrow}</span>
          </div>

          <h2 id="solutions-heading" className="solutions-title">
            {heading}{' '}
            {headingEmphasis && (
              <span className="solutions-title-emphasis">{headingEmphasis}</span>
            )}
          </h2>

          <p className="solutions-supporting-text">{supportingText}</p>
        </div>

        {/* 50/50 Dual Pathway Panels Grid */}
        <div className="solutions-grid">
          {solutions.map((solution, idx) => (
            <SolutionPanel key={solution.id} solution={solution} index={idx} />
          ))}
        </div>
      </Container>
    </section>
  );
};
