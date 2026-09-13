import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../ui/Container/Container';
import { ParallaxLayer } from '../../ui/ParallaxLayer/ParallaxLayer';
import { procurementContent, ProcurementCapabilityItem } from '../../../data/procurement.data';
import './ProcurementSection.css';

const renderCapabilityIcon = (iconName: ProcurementCapabilityItem['iconName']) => {
  switch (iconName) {
    case 'discovery':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="procurement-cap-icon"
          aria-hidden="true"
        >
          {/* Discovery / compass / search */}
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
          <path d="M11 8v6M8 11h6" strokeOpacity="0.4" />
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
          className="procurement-cap-icon"
          aria-hidden="true"
        >
          {/* Requirement matching / leaf & balance */}
          <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v1" />
          <path d="M18 8h4a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-4" />
          <circle cx="8" cy="12" r="3" />
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
          className="procurement-cap-icon"
          aria-hidden="true"
        >
          {/* Specification matrix / parameters */}
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="9" y1="21" x2="9" y2="9" />
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
          className="procurement-cap-icon"
          aria-hidden="true"
        >
          {/* Sourcing / fulfillment path */}
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
    default:
      return null;
  }
};

export const ProcurementSection: React.FC = () => {
  const {
    eyebrow,
    heading,
    headingHighlight,
    supportingText,
    noteText,
    directionalCta,
    secondaryLink,
    capabilities,
  } = procurementContent;

  return (
    <section
      className="procurement-section"
      aria-labelledby="procurement-heading"
      id="procurement-support"
    >
      {/* Background Subtle Organic Watermark & Parallax Line */}
      <div className="procurement-bg-decoration" aria-hidden="true">
        <ParallaxLayer speed={-0.03} className="procurement-parallax-leaf">
          <svg
            viewBox="0 0 120 120"
            fill="none"
            className="procurement-watermark-svg"
            aria-hidden="true"
          >
            <path
              d="M60 10 C85 35, 95 75, 60 110 C25 75, 35 35, 60 10 Z"
              stroke="var(--color-primary-green)"
              strokeWidth="0.8"
              strokeDasharray="4 4"
            />
            <circle cx="60" cy="60" r="45" stroke="var(--color-primary-green)" strokeWidth="0.5" strokeOpacity="0.15" />
          </svg>
        </ParallaxLayer>
      </div>

      <Container size="default" className="procurement-container">
        <div className="procurement-layout">
          {/* LEFT COLUMN: Editorial Presentation & Compact Directional Links (R4) */}
          <div className="procurement-editorial-col animate-fade-up">
            <div className="procurement-badge-wrapper">
              <span className="eyebrow procurement-eyebrow">
                <span className="procurement-eyebrow-leaf" aria-hidden="true">🌿</span>
                {eyebrow}
              </span>
            </div>

            <h2 id="procurement-heading" className="procurement-heading">
              <span className="procurement-heading-main">{heading} </span>
              {headingHighlight && (
                <span className="procurement-heading-highlight">{headingHighlight}</span>
              )}
            </h2>

            <p className="procurement-supporting-text">
              {supportingText}
            </p>

            {noteText && (
              <div className="procurement-note-box">
                <div className="procurement-note-bar" aria-hidden="true" />
                <p className="procurement-note-text">{noteText}</p>
              </div>
            )}

            {/* R4 Refinement: Compact Directional Action Link instead of heavy dual primary buttons */}
            <div className="procurement-actions-row">
              <Link to={directionalCta.path} className="procurement-directional-link">
                <span>{directionalCta.label}</span>
                <span className="procurement-link-arrow" aria-hidden="true">→</span>
              </Link>

              {secondaryLink && (
                <Link to={secondaryLink.path} className="procurement-secondary-link">
                  <span>{secondaryLink.label}</span>
                  <span className="procurement-link-arrow" aria-hidden="true">→</span>
                </Link>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: 2x2 Non-Sequential Capability Cards Grid (R3) */}
          <div className="procurement-capabilities-col">
            <div className="procurement-cap-grid" role="region" aria-label="Procurement support capabilities">
              {capabilities.map((cap) => (
                <div key={cap.id} className="procurement-cap-card animate-fade-up">
                  <div className="procurement-cap-header">
                    <div className="procurement-cap-icon-box" aria-hidden="true">
                      {renderCapabilityIcon(cap.iconName)}
                    </div>
                    <span className="procurement-cap-num" aria-hidden="true">{cap.number}</span>
                  </div>

                  <div className="procurement-cap-body">
                    <h3 className="procurement-cap-title">{cap.title}</h3>
                    <p className="procurement-cap-desc">{cap.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
