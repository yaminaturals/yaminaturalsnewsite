import React from 'react';
import { WhyYamiPrincipleItem } from '../../../data/whyYami.data';

interface WhyYamiPrincipleProps {
  principle: WhyYamiPrincipleItem;
  index: number;
}

const renderPrincipleIcon = (iconType: WhyYamiPrincipleItem['iconType']) => {
  switch (iconType) {
    case 'requirement-led':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="why-yami-icon-svg"
          aria-hidden="true"
        >
          {/* Requirement document with central sprout */}
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <path d="M12 18v-5" />
          <path d="M9 15c1.5-1.5 3-1.5 3 0" stroke="var(--color-primary-green)" />
          <path d="M15 14c-1.5-1.5-3-1.5-3 0" stroke="var(--color-primary-green)" />
        </svg>
      );

    case 'category-guidance':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="why-yami-icon-svg"
          aria-hidden="true"
        >
          {/* 4-way botanical category compass / petals */}
          <circle cx="12" cy="12" r="9" strokeOpacity="0.4" />
          <path d="M12 3c0 4.5-3.5 6-3.5 9s3.5 4.5 3.5 9" stroke="var(--color-primary-green)" />
          <path d="M12 3c0 4.5 3.5 6 3.5 9s-3.5 4.5-3.5 9" stroke="var(--color-primary-green)" />
          <circle cx="12" cy="12" r="2" fill="var(--color-amber-accent)" stroke="none" />
        </svg>
      );

    case 'specification-discussion':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="why-yami-icon-svg"
          aria-hidden="true"
        >
          {/* Formulation parameters / balance gauge */}
          <path d="M4 21h16" />
          <path d="M12 3v18" />
          <path d="M7 8l5-2 5 2" />
          <path d="M7 8v5a2.5 2.5 0 0 0 5 0V8" />
          <path d="M12 8v5a2.5 2.5 0 0 0 5 0V8" />
          <circle cx="12" cy="4" r="1" fill="var(--color-primary-green)" />
        </svg>
      );

    case 'procurement-support':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="why-yami-icon-svg"
          aria-hidden="true"
        >
          {/* Sourcing route with botanical leaf destination */}
          <path d="M4 19c2-6 7-9 14-11" />
          <polyline points="14 4 18 8 14 12" />
          <circle cx="4" cy="19" r="2" fill="var(--color-primary-green)" />
          <path d="M18 8c0 3-2 5-5 5" stroke="var(--color-amber-accent)" />
        </svg>
      );

    default:
      return null;
  }
};

export const WhyYamiPrinciple: React.FC<WhyYamiPrincipleProps> = ({
  principle,
  index,
}) => {
  const headingId = `principle-heading-${principle.number}`;

  return (
    <article
      className={`why-yami-card animate-fade-up delay-${index + 1}`}
      aria-labelledby={headingId}
    >
      {/* Large Subtle Background Number for Editorial Rhythm */}
      <span className="why-yami-card-watermark" aria-hidden="true">
        {principle.number}
      </span>

      {/* Card Header with Icon and Number Pill */}
      <div className="why-yami-card-header">
        <div className="why-yami-icon-badge" aria-hidden="true">
          {renderPrincipleIcon(principle.iconType)}
        </div>
        <span className="why-yami-card-number">{principle.number}</span>
      </div>

      {/* Principle Content */}
      <div className="why-yami-card-content">
        <h3 id={headingId} className="why-yami-card-title">
          {principle.title}
        </h3>
        <p className="why-yami-card-description">{principle.description}</p>
      </div>

      {/* Subtle Bottom Card Border Accent */}
      <div className="why-yami-card-accent" aria-hidden="true" />
    </article>
  );
};
