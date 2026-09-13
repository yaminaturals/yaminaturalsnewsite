import React from 'react';
import { Container } from '../../ui/Container/Container';
import { Button } from '../../ui/Button/Button';
import { ParallaxLayer } from '../../ui/ParallaxLayer/ParallaxLayer';
import { howItWorksContent } from '../../../data/howItWorks.data';
import { HowItWorksStep } from './HowItWorksStep';
import './HowItWorksSection.css';

export const HowItWorksSection: React.FC = () => {
  const {
    eyebrow,
    heading,
    headingEmphasis,
    supportingText,
    steps,
    choicesHeading,
    choicesSubtext,
    choices,
  } = howItWorksContent;

  return (
    <section
      className="how-it-works-section"
      aria-labelledby="how-it-works-heading"
      id="how-it-works-section"
    >
      {/* Background Decorative Botanical Parallax */}
      <div className="how-it-works-bg-decoration" aria-hidden="true">
        <ParallaxLayer speed={-0.025} className="how-it-works-parallax-motif">
          <svg
            viewBox="0 0 240 240"
            fill="none"
            className="how-it-works-watermark-svg"
            aria-hidden="true"
          >
            {/* Elegant botanical stem with curving leaves */}
            <path
              d="M30 210 C70 170, 110 110, 140 40"
              stroke="var(--color-primary-green)"
              strokeWidth="1.2"
              strokeDasharray="6 6"
              opacity="0.15"
            />
            <path
              d="M80 160 C65 140, 60 115, 80 100 C100 115, 95 140, 80 160 Z"
              stroke="var(--color-primary-green)"
              strokeWidth="0.8"
              opacity="0.12"
            />
            <path
              d="M120 100 C105 80, 100 55, 120 40 C140 55, 135 80, 120 100 Z"
              stroke="var(--color-amber-accent)"
              strokeWidth="0.8"
              opacity="0.12"
            />
          </svg>
        </ParallaxLayer>
      </div>

      <Container size="default">
        {/* Section Header */}
        <div className="how-it-works-header animate-fade-up">
          <div className="how-it-works-eyebrow-wrapper">
            <span className="how-it-works-eyebrow-icon" aria-hidden="true">🌿</span>
            <span className="how-it-works-eyebrow-text">{eyebrow}</span>
          </div>

          <h2 id="how-it-works-heading" className="how-it-works-title">
            {heading}{' '}
            {headingEmphasis && (
              <span className="how-it-works-title-emphasis">
                {headingEmphasis}
              </span>
            )}
          </h2>

          <p className="how-it-works-supporting-text">{supportingText}</p>
        </div>

        {/* 4-Step Process Timeline */}
        <div className="how-it-works-timeline-wrapper">
          {/* Desktop connecting line behind steps */}
          <div className="how-it-works-desktop-connector" aria-hidden="true">
            <div className="how-it-works-connector-line" />
          </div>

          <ol
            className="how-it-works-steps"
            aria-label="Four-step sourcing journey"
          >
            {steps.map((step, idx) => (
              <HowItWorksStep
                key={step.number}
                step={step}
                index={idx}
                totalSteps={steps.length}
              />
            ))}
          </ol>
        </div>

        {/* Compact Choice Area: START WHERE YOU ARE */}
        <div className="how-it-works-choices-wrapper animate-fade-up delay-4">
          <div className="how-it-works-choices-header">
            <span className="how-it-works-choices-tag">ENTRY PATHS</span>
            <h3 className="how-it-works-choices-title">{choicesHeading}</h3>
            <p className="how-it-works-choices-subtext">{choicesSubtext}</p>
          </div>

          <div className="how-it-works-choices-grid">
            {choices.map((choice) => (
              <div
                key={choice.id}
                className={`how-it-works-choice-card ${
                  choice.isPrimary ? 'how-it-works-choice-card--primary' : 'how-it-works-choice-card--secondary'
                }`}
              >
                <div className="how-it-works-choice-badge-row">
                  <span className={`how-it-works-choice-badge ${choice.isPrimary ? 'badge-primary' : 'badge-secondary'}`}>
                    {choice.badge}
                  </span>
                </div>

                <h4 className="how-it-works-choice-name">{choice.title}</h4>
                <p className="how-it-works-choice-quote">"{choice.text}"</p>

                <div className="how-it-works-choice-action">
                  <Button
                    to={choice.ctaLink}
                    variant={choice.isPrimary ? 'accent' : 'outline'}
                    size="md"
                    fullWidth
                    className={choice.isPrimary ? 'choice-btn-primary' : 'choice-btn-secondary'}
                    iconRight={
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        className="choice-arrow-svg"
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
                    {choice.ctaText}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
