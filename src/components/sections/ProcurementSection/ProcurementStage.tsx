import React from 'react';
import { ProcurementStageItem } from '../../../data/procurement.data';

interface ProcurementStageProps {
  stage: ProcurementStageItem;
  index: number;
  isLast: boolean;
}

const renderStageIcon = (iconName: ProcurementStageItem['iconName']) => {
  switch (iconName) {
    case 'requirement':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="stage-icon-svg"
        >
          {/* Requirement document / note with botanical leaf quill */}
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="8" y1="13" x2="16" y2="13" />
          <line x1="8" y1="17" x2="13" y2="17" />
          {/* Botanical leaf quill hint */}
          <path d="M16 17c1.5-1.5 3-1.5 4 0s0 2.5-1.5 2.5" stroke="var(--color-amber-accent)" />
        </svg>
      );

    case 'matching':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="stage-icon-svg"
        >
          {/* Search / lens inspecting paired botanical leaves */}
          <circle cx="11" cy="11" r="7" />
          <line x1="16.5" y1="16.5" x2="21" y2="21" />
          {/* Botanical sprout inside lens */}
          <path d="M11 8c0 2-1 3-3 3 0-2 1-3 3-3z" fill="currentColor" fillOpacity="0.25" />
          <path d="M11 11c0-2 1-3 3-3 0 2-1 3-3 3z" fill="currentColor" fillOpacity="0.25" />
          <line x1="11" y1="8" x2="11" y2="14" />
        </svg>
      );

    case 'specification':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="stage-icon-svg"
        >
          {/* Analytical balance & technical specification gauge */}
          <path d="M12 3v18" />
          <path d="M6 7h12" />
          <path d="M6 7l-3 6a3 3 0 0 0 6 0L6 7z" />
          <path d="M18 7l-3 6a3 3 0 0 0 6 0L18 7z" />
          <circle cx="12" cy="5" r="1.5" fill="var(--color-amber-accent)" stroke="var(--color-amber-accent)" />
          <path d="M4 21h16" />
        </svg>
      );

    case 'sourcing':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="stage-icon-svg"
        >
          {/* Sourcing route with botanical leaf node milestone */}
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="6" r="3" />
          <path d="M6 15V9a3 3 0 0 1 3-3h6" />
          <path d="M12 9l3-3-3-3" stroke="var(--color-amber-accent)" />
          {/* Small leaf branch node */}
          <path d="M9 12c1.8-.4 3 .8 3 2.5-1.8.4-3-.8-3-2.5z" fill="currentColor" fillOpacity="0.3" />
        </svg>
      );

    default:
      return null;
  }
};

export const ProcurementStage: React.FC<ProcurementStageProps> = ({
  stage,
  index,
  isLast,
}) => {
  return (
    <li
      className={`procurement-stage-item animate-fade-up delay-${index + 1}`}
      data-stage-number={stage.number}
    >
      {/* Visual Step Indicator Node */}
      <div className="stage-node-container">
        <div className="stage-node" aria-hidden="true">
          <span className="stage-number">{stage.number}</span>
        </div>
        {!isLast && <div className="stage-connector-line" aria-hidden="true" />}
      </div>

      {/* Stage Card Body */}
      <div className="stage-card">
        <div className="stage-card-header">
          <div className="stage-icon-badge" aria-hidden="true">
            {renderStageIcon(stage.iconName)}
          </div>
          <div className="stage-meta">
            <span className="stage-step-tag">{stage.step}</span>
            <h3 className="stage-title">{stage.title}</h3>
          </div>
        </div>
        <p className="stage-description">{stage.description}</p>
      </div>
    </li>
  );
};
