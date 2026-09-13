import React from 'react';
import { Container } from '../../ui/Container/Container';
import { Button } from '../../ui/Button/Button';
import { ParallaxLayer } from '../../ui/ParallaxLayer/ParallaxLayer';
import { specificationDocumentationContent } from '../../../data/specificationDocumentation.data';
import { SpecificationArea } from './SpecificationArea';
import './SpecificationDocumentationSection.css';

export const SpecificationDocumentationSection: React.FC = () => {
  const { eyebrow, heading, headingEmphasis, supportingText, areas, callout } =
    specificationDocumentationContent;

  return (
    <section
      className="spec-doc-section"
      aria-labelledby="specification-heading"
      id="specification-documentation"
    >
      {/* Background Decorative Technical & Botanical Parallax Grid */}
      <div className="spec-doc-bg-decoration" aria-hidden="true">
        <ParallaxLayer speed={-0.02} className="spec-doc-parallax-motif">
          <svg
            viewBox="0 0 240 240"
            fill="none"
            className="spec-doc-watermark-svg"
            aria-hidden="true"
          >
            {/* Subtle technical coordinate grid with curved botanical contour */}
            <line x1="20" y1="60" x2="220" y2="60" stroke="var(--color-primary-green)" strokeWidth="0.6" strokeDasharray="4 4" opacity="0.15" />
            <line x1="20" y1="120" x2="220" y2="120" stroke="var(--color-primary-green)" strokeWidth="0.6" strokeDasharray="4 4" opacity="0.15" />
            <line x1="20" y1="180" x2="220" y2="180" stroke="var(--color-primary-green)" strokeWidth="0.6" strokeDasharray="4 4" opacity="0.15" />
            <line x1="60" y1="20" x2="60" y2="220" stroke="var(--color-primary-green)" strokeWidth="0.6" strokeDasharray="4 4" opacity="0.15" />
            <line x1="120" y1="20" x2="120" y2="220" stroke="var(--color-primary-green)" strokeWidth="0.6" strokeDasharray="4 4" opacity="0.15" />
            <line x1="180" y1="20" x2="180" y2="220" stroke="var(--color-primary-green)" strokeWidth="0.6" strokeDasharray="4 4" opacity="0.15" />
            <path
              d="M30 190 C90 190, 150 130, 190 50"
              stroke="var(--color-amber-accent)"
              strokeWidth="1"
              strokeDasharray="6 6"
              opacity="0.2"
            />
          </svg>
        </ParallaxLayer>
      </div>

      <Container size="default">
        {/* Main Two-Part Editorial Layout */}
        <div className="spec-doc-layout">
          {/* LEFT: Heading, Narrative & Stylized Specification Illustration */}
          <div className="spec-doc-left animate-fade-up">
            <div className="spec-doc-eyebrow-wrapper">
              <span className="spec-doc-eyebrow-icon" aria-hidden="true">📋</span>
              <span className="spec-doc-eyebrow-text">{eyebrow}</span>
            </div>

            <h2 id="specification-heading" className="spec-doc-title">
              {heading}{' '}
              {headingEmphasis && (
                <span className="spec-doc-title-emphasis">
                  {headingEmphasis}
                </span>
              )}
            </h2>

            <p className="spec-doc-supporting-text">{supportingText}</p>

            {/* Stylized Botanical Specification Document Illustration (Illustrative / Decorative) */}
            <div className="spec-doc-illustration" aria-hidden="true">
              <div className="spec-sheet-frame">
                <div className="spec-sheet-header">
                  <div className="spec-sheet-line-sm" />
                  <div className="spec-sheet-dot" />
                </div>
                <div className="spec-sheet-body">
                  <div className="spec-sheet-row">
                    <span className="spec-sheet-field">Identity</span>
                    <div className="spec-sheet-bar" />
                  </div>
                  <div className="spec-sheet-row">
                    <span className="spec-sheet-field">Standard</span>
                    <div className="spec-sheet-bar" style={{ width: '60%' }} />
                  </div>
                  <div className="spec-sheet-row">
                    <span className="spec-sheet-field">Application</span>
                    <div className="spec-sheet-bar" style={{ width: '80%' }} />
                  </div>
                  <div className="spec-sheet-row">
                    <span className="spec-sheet-field">Dossier</span>
                    <div className="spec-sheet-bar" style={{ width: '45%' }} />
                  </div>
                </div>
                {/* Botanical seal stamp accent */}
                <div className="spec-sheet-seal">
                  <svg viewBox="0 0 32 32" fill="none" className="spec-seal-svg">
                    <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2" />
                    <path d="M16 8 C11 12, 11 20, 16 24 C21 20, 21 12, 16 8 Z" fill="currentColor" opacity="0.25" />
                    <path d="M16 8v16" stroke="currentColor" strokeWidth="1" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Four Numbered Information Areas Grid */}
          <div className="spec-doc-right">
            <div className="spec-areas-grid">
              {areas.map((area, idx) => (
                <SpecificationArea key={area.number} area={area} index={idx} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Neutral Guidance Callout */}
        <div className="spec-doc-callout animate-fade-up delay-4">
          <div className="spec-doc-callout-inner">
            <div className="spec-doc-callout-content">
              <span className="spec-doc-callout-icon" aria-hidden="true">📎</span>
              <p className="spec-doc-callout-text">{callout.text}</p>
            </div>
            <div className="spec-doc-callout-action">
              <Button
                to={callout.ctaLink}
                variant="primary"
                size="md"
                className="spec-doc-callout-btn"
                iconRight={
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    className="spec-callout-arrow-svg"
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
                {callout.ctaText}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
