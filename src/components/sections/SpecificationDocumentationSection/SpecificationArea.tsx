import React from 'react';
import { SpecificationAreaItem } from '../../../data/specificationDocumentation.data';

interface SpecificationAreaProps {
  area: SpecificationAreaItem;
  index: number;
}

const renderAreaIcon = (iconType: SpecificationAreaItem['iconType']) => {
  switch (iconType) {
    case 'identity':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="spec-icon-svg"
          aria-hidden="true"
        >
          {/* Identity tag / botanical classification badge */}
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
          <circle cx="7" cy="7" r="1.5" fill="var(--color-primary-green)" />
          <path d="M14 8c1 1 1 2.5 0 3.5" stroke="var(--color-amber-accent)" />
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
          className="spec-icon-svg"
          aria-hidden="true"
        >
          {/* Technical specification matrix / parameter grid */}
          <rect x="3" y="3" width="18" height="18" rx="2" strokeOpacity="0.4" />
          <path d="M3 9h18M3 15h18M9 3v18M15 3v18" strokeOpacity="0.25" />
          <circle cx="9" cy="9" r="2" fill="var(--color-primary-green)" />
          <circle cx="15" cy="15" r="2" fill="var(--color-amber-accent)" />
        </svg>
      );

    case 'application':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="spec-icon-svg"
          aria-hidden="true"
        >
          {/* Formulation flask & botanical synergy application */}
          <path d="M9 3h6M10 9h4" />
          <path d="M10 3v6l-5 9a2 2 0 0 0 1.7 3h10.6a2 2 0 0 0 1.7-3l-5-9V3" />
          <circle cx="12" cy="16" r="1.5" fill="var(--color-primary-green)" />
          <path d="M10 14c1-1 3-1 4 0" stroke="var(--color-amber-accent)" />
        </svg>
      );

    case 'documentation':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="spec-icon-svg"
          aria-hidden="true"
        >
          {/* Procurement dossier & verified technical documentation */}
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          <line x1="9" y1="7" x2="15" y2="7" />
          <line x1="9" y1="11" x2="15" y2="11" />
          <circle cx="16" cy="16" r="1.5" fill="var(--color-primary-green)" />
        </svg>
      );

    default:
      return null;
  }
};

export const SpecificationArea: React.FC<SpecificationAreaProps> = ({
  area,
  index,
}) => {
  const headingId = `spec-area-heading-${area.number}`;

  return (
    <article
      className={`spec-area-card animate-fade-up delay-${index + 1}`}
      aria-labelledby={headingId}
    >
      {/* Background Watermark Number for Visual Structure */}
      <span className="spec-area-watermark" aria-hidden="true">
        {area.number}
      </span>

      {/* Card Header with Technical Icon Badge & Step Marker */}
      <div className="spec-area-header">
        <div className="spec-area-badge" aria-hidden="true">
          {renderAreaIcon(area.iconType)}
        </div>
        <span className="spec-area-num-pill">Area {area.number}</span>
      </div>

      {/* Card Content */}
      <div className="spec-area-content">
        <h3 id={headingId} className="spec-area-title">
          {area.title}
        </h3>
        <p className="spec-area-desc">{area.description}</p>
      </div>

      {/* Subtle Bottom Technical Accent Line */}
      <div className="spec-area-accent-line" aria-hidden="true" />
    </article>
  );
};
