import React from 'react';
import { TrustPrincipleItem } from '../../../data/trustExperience.data';

interface TrustPrincipleProps {
  principle: TrustPrincipleItem;
  index: number;
}

const renderPrincipleIcon = (iconType: TrustPrincipleItem['iconType']) => {
  switch (iconType) {
    case 'requirement':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="trust-icon-svg"
          aria-hidden="true"
        >
          {/* Requirement compass / focused starting point */}
          <circle cx="12" cy="12" r="9" strokeOpacity="0.3" />
          <polygon points="12 4 15 12 12 20 9 12 12 4" fill="var(--color-primary-green)" strokeWidth="1" />
          <circle cx="12" cy="12" r="2" fill="var(--color-amber-accent)" />
        </svg>
      );

    case 'communication':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="trust-icon-svg"
          aria-hidden="true"
        >
          {/* Structured communication & clear discussion */}
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          <line x1="8" y1="12" x2="16" y2="12" stroke="var(--color-primary-green)" />
          <line x1="8" y1="9" x2="13" y2="9" strokeOpacity="0.4" />
        </svg>
      );

    case 'category':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="trust-icon-svg"
          aria-hidden="true"
        >
          {/* Categorized botanical taxonomy grid */}
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <circle cx="6.5" cy="6.5" r="1.2" fill="var(--color-primary-green)" />
          <circle cx="17.5" cy="17.5" r="1.2" fill="var(--color-amber-accent)" />
        </svg>
      );

    case 'process':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="trust-icon-svg"
          aria-hidden="true"
        >
          {/* Enquiry-led forward progression */}
          <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
          <polyline points="12 6 12 12 16 14" stroke="var(--color-primary-green)" />
          <path d="M16 16l4 4m0 0l-3 1m3-1l-1-3" stroke="var(--color-amber-accent)" />
        </svg>
      );

    default:
      return null;
  }
};

export const TrustPrinciple: React.FC<TrustPrincipleProps> = ({
  principle,
  index,
}) => {
  const headingId = `trust-principle-heading-${principle.number}`;

  return (
    <article
      className={`trust-principle-card animate-fade-up delay-${index + 1}`}
      aria-labelledby={headingId}
    >
      {/* Background Watermark Number for Visual Structure */}
      <span className="trust-principle-watermark" aria-hidden="true">
        {principle.number}
      </span>

      {/* Card Header with Icon Badge & Step Marker */}
      <div className="trust-principle-header">
        <div className="trust-principle-badge" aria-hidden="true">
          {renderPrincipleIcon(principle.iconType)}
        </div>
        <span className="trust-principle-pill">Principle {principle.number}</span>
      </div>

      {/* Card Content */}
      <div className="trust-principle-content">
        <h3 id={headingId} className="trust-principle-title">
          {principle.title}
        </h3>
        <p className="trust-principle-desc">{principle.description}</p>
      </div>

      {/* Subtle Bottom Accent Line */}
      <div className="trust-principle-accent-line" aria-hidden="true" />
    </article>
  );
};
