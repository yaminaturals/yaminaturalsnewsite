import React from 'react';
import { ProcurementStageItem } from '../../../data/procurement.data';
import { ProcurementStage } from './ProcurementStage';

interface ProcurementJourneyProps {
  stages: ProcurementStageItem[];
}

export const ProcurementJourney: React.FC<ProcurementJourneyProps> = ({ stages }) => {
  return (
    <div className="procurement-journey-panel animate-fade-in">
      {/* Decorative Botanical Curved Line (SVG) */}
      <div className="journey-stem-wrapper" aria-hidden="true">
        <svg
          className="journey-stem-svg"
          viewBox="0 0 40 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          {/* Main gentle organic stem path */}
          <path
            d="M20 10 C20 60, 26 120, 20 180 C14 240, 24 300, 20 390"
            stroke="var(--color-primary-600)"
            strokeWidth="1.75"
            strokeDasharray="4 3"
            strokeOpacity="0.4"
          />
          {/* Subtle botanical sprout nodes */}
          <circle cx="20" cy="18" r="3" fill="var(--color-primary-green)" fillOpacity="0.6" />
          <circle cx="20" cy="138" r="3" fill="var(--color-primary-green)" fillOpacity="0.6" />
          <circle cx="20" cy="258" r="3" fill="var(--color-primary-green)" fillOpacity="0.6" />
          <circle cx="20" cy="378" r="3" fill="var(--color-amber-accent)" />
        </svg>
      </div>

      {/* Ordered List of Procurement Workflow Stages */}
      <ol className="procurement-journey-list" aria-label="Procurement support workflow stages">
        {stages.map((stage, index) => (
          <ProcurementStage
            key={stage.id}
            stage={stage}
            index={index}
            isLast={index === stages.length - 1}
          />
        ))}
      </ol>

      {/* Subtle Bottom Pathway Anchor Note */}
      <div className="journey-footer" aria-hidden="true">
        <span className="journey-footer-leaf">🌿</span>
        <span className="journey-footer-text">
          Direct Guidance from Requirement to Sourcing
        </span>
      </div>
    </div>
  );
};
