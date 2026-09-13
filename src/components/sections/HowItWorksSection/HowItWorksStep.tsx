import React from 'react';
import { HowItWorksStepItem } from '../../../data/howItWorks.data';

interface HowItWorksStepProps {
  step: HowItWorksStepItem;
  index: number;
  totalSteps: number;
}

const renderStepIcon = (iconType: HowItWorksStepItem['iconType']) => {
  switch (iconType) {
    case 'explore':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="step-icon-svg"
          aria-hidden="true"
        >
          {/* Compass with leaf needle */}
          <circle cx="12" cy="12" r="9" strokeOpacity="0.5" />
          <path d="M12 7l2 5-2 5-2-5 2-5z" fill="var(--color-primary-green)" stroke="var(--color-primary-green)" />
          <circle cx="12" cy="12" r="1.5" fill="#FFFFFF" />
        </svg>
      );

    case 'share':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="step-icon-svg"
          aria-hidden="true"
        >
          {/* Document / Requirement clipboard with quill leaf */}
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="9" y1="13" x2="15" y2="13" />
          <line x1="9" y1="17" x2="13" y2="17" />
          <circle cx="14" cy="5" r="1" fill="var(--color-primary-green)" />
        </svg>
      );

    case 'specifications':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="step-icon-svg"
          aria-hidden="true"
        >
          {/* Sliders / technical spec indicators with botanical node */}
          <line x1="4" y1="21" x2="4" y2="14" />
          <line x1="4" y1="10" x2="4" y2="3" />
          <line x1="12" y1="21" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12" y2="3" />
          <line x1="20" y1="21" x2="20" y2="16" />
          <line x1="20" y1="12" x2="20" y2="3" />
          <circle cx="4" cy="12" r="2" fill="var(--color-primary-green)" />
          <circle cx="12" cy="10" r="2" fill="var(--color-primary-green)" />
          <circle cx="20" cy="14" r="2" fill="var(--color-primary-green)" />
        </svg>
      );

    case 'enquiry':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="step-icon-svg"
          aria-hidden="true"
        >
          {/* Sourcing dialogue message with forward arrow */}
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <polyline points="10 9 14 9 14 13" />
          <path d="M10 13l4-4" stroke="var(--color-amber-accent)" />
        </svg>
      );

    default:
      return null;
  }
};

export const HowItWorksStep: React.FC<HowItWorksStepProps> = ({
  step,
  index,
  totalSteps,
}) => {
  const stepHeadingId = `how-it-works-step-${step.number}`;

  return (
    <li
      className={`how-it-works-step animate-fade-up delay-${index + 1}`}
      aria-labelledby={stepHeadingId}
    >
      {/* Node / Marker indicating sequence */}
      <div className="how-it-works-step-node-wrapper" aria-hidden="true">
        <div className="how-it-works-step-node">
          <span className="how-it-works-step-num">{step.number}</span>
        </div>
        {index < totalSteps - 1 && (
          <div className="how-it-works-mobile-connector" aria-hidden="true" />
        )}
      </div>

      {/* Step Card Content */}
      <div className="how-it-works-step-card">
        <div className="how-it-works-step-header">
          <div className="how-it-works-step-badge" aria-hidden="true">
            {renderStepIcon(step.iconType)}
          </div>
          <span className="how-it-works-step-pill">Stage {step.number}</span>
        </div>

        <h3 id={stepHeadingId} className="how-it-works-step-title">
          {step.title}
        </h3>

        <p className="how-it-works-step-desc">{step.description}</p>
      </div>
    </li>
  );
};
