import React from 'react';
import { Container } from '../../ui/Container/Container';
import { certificationsData, CertificationItem } from '../../../data/certifications.data';
import './CertificationsSection.css';

const renderBadgeIcon = (badgeType: CertificationItem['badgeType']) => {
  switch (badgeType) {
    case 'fssai':
      return (
        <svg viewBox="0 0 40 40" fill="none" className="cert-badge-svg" aria-hidden="true">
          <rect x="3" y="3" width="34" height="34" rx="8" stroke="currentColor" strokeWidth="1.8" />
          <path d="M10 14h20M10 20h14M10 26h8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="28" cy="24" r="5" stroke="currentColor" strokeWidth="1.8" />
          <path d="M26 24l1.5 1.5L30.5 22" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'gmp':
      return (
        <svg viewBox="0 0 40 40" fill="none" className="cert-badge-svg" aria-hidden="true">
          <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="1.8" strokeDasharray="3 2" />
          <circle cx="20" cy="20" r="11" stroke="currentColor" strokeWidth="1.5" />
          <path d="M15 20l3.5 3.5L25 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'gst':
      return (
        <svg viewBox="0 0 40 40" fill="none" className="cert-badge-svg" aria-hidden="true">
          <path d="M20 4L34 11v10c0 9-6 15-14 17C12 36 6 30 6 21V11L20 4z" stroke="currentColor" strokeWidth="1.8" />
          <path d="M14 20l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'spiceboard':
      return (
        <svg viewBox="0 0 40 40" fill="none" className="cert-badge-svg" aria-hidden="true">
          <path d="M20 6c-8 6-12 14-6 22 4 5 10 6 12 6s8-1 12-6c6-8 2-16-6-22-3 5-9 8-12 0z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M20 16v14M16 23l4-4 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'apeda':
      return (
        <svg viewBox="0 0 40 40" fill="none" className="cert-badge-svg" aria-hidden="true">
          <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="1.8" />
          <path d="M11 26c3-8 9-12 18-12M29 14c-3 8-9 12-18 12M20 7v26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="20" cy="14" r="2.5" fill="currentColor" />
        </svg>
      );
    case 'halal':
      return (
        <svg viewBox="0 0 40 40" fill="none" className="cert-badge-svg" aria-hidden="true">
          <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="1.8" />
          <path d="M26 12a10 10 0 1 1-10 16 11.5 11.5 0 0 0 10-16z" stroke="currentColor" strokeWidth="1.6" />
          <polygon points="25,18 26.5,21.5 30,22 27.5,24.5 28,28 25,26.5 22,28 22.5,24.5 20,22 23.5,21.5" fill="currentColor" transform="scale(0.5) translate(14, 8)" />
        </svg>
      );
    case 'iso':
      return (
        <svg viewBox="0 0 40 40" fill="none" className="cert-badge-svg" aria-hidden="true">
          <polygon points="20,4 34,12 34,28 20,36 6,28 6,12" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <circle cx="20" cy="20" r="7" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="20" cy="20" r="2" fill="currentColor" />
        </svg>
      );
    case 'nongmo':
      return (
        <svg viewBox="0 0 40 40" fill="none" className="cert-badge-svg" aria-hidden="true">
          <path d="M8 32C12 24 16 8 32 8c0 16-16 20-24 24z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M12 28l16-16M18 22l6-2M14 16l4 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case 'kosher':
      return (
        <svg viewBox="0 0 40 40" fill="none" className="cert-badge-svg" aria-hidden="true">
          <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="1.8" />
          <polygon points="20,8 24,16 32,16 26,22 28,30 20,25 12,30 14,22 8,16 16,16" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );
    case 'msme':
      return (
        <svg viewBox="0 0 40 40" fill="none" className="cert-badge-svg" aria-hidden="true">
          <rect x="5" y="8" width="30" height="24" rx="4" stroke="currentColor" strokeWidth="1.8" />
          <path d="M5 16h30M13 8v8M27 8v8M12 24h6M12 28h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case 'iec':
      return (
        <svg viewBox="0 0 40 40" fill="none" className="cert-badge-svg" aria-hidden="true">
          <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="1.8" />
          <ellipse cx="20" cy="20" rx="8" ry="16" stroke="currentColor" strokeWidth="1.5" />
          <path d="M4 20h32M7 11h26M7 29h26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'organic':
      return (
        <svg viewBox="0 0 40 40" fill="none" className="cert-badge-svg" aria-hidden="true">
          <path d="M20 5C11 5 7 14 7 22c0 9 6 13 13 13s13-4 13-13c0-8-4-17-13-17z" stroke="currentColor" strokeWidth="1.8" />
          <path d="M20 11v18M14 18c3 2 6 2 6-2M20 23c3 2 6 2 6-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 40 40" fill="none" className="cert-badge-svg" aria-hidden="true">
          <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="1.8" />
          <path d="M14 20l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
};

export const CertificationsSection: React.FC = () => {
  return (
    <section className="certifications-section" aria-labelledby="certifications-heading">
      <Container size="default">
        <div className="certifications-header animate-fade-up">
          <div className="certifications-eyebrow-wrap">
            <span className="certifications-eyebrow-icon" aria-hidden="true">🛡️</span>
            <span className="certifications-eyebrow">OUR CERTIFICATIONS</span>
          </div>
          <h2 id="certifications-heading" className="certifications-title">
            Compliance, Quality &amp; Trade Accreditations
          </h2>
          <p className="certifications-subtitle">
            Operating under established regulatory standards, food safety protocols, and export facilitation frameworks.
          </p>
        </div>
      </Container>

      {/* Full-Width Continuous Horizontal Moving Marquee */}
      <div className="certifications-marquee-container" aria-label="Accreditations and certifications continuous list">
        <div className="certifications-marquee-track">
          {/* Sequence 1 */}
          <div className="certifications-sequence">
            {certificationsData.map((item) => (
              <div key={`cert-seq1-${item.id}`} className="cert-badge-card">
                <div className="cert-badge-icon-box">
                  {renderBadgeIcon(item.badgeType)}
                </div>
                <div className="cert-badge-info">
                  <div className="cert-badge-top">
                    <span className="cert-badge-code">{item.code}</span>
                    <span className="cert-badge-pill">{item.tag}</span>
                  </div>
                  <span className="cert-badge-name">{item.name}</span>
                  <span className="cert-badge-authority">{item.authority}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Sequence 2 for seamless loop */}
          <div className="certifications-sequence" aria-hidden="true">
            {certificationsData.map((item) => (
              <div key={`cert-seq2-${item.id}`} className="cert-badge-card">
                <div className="cert-badge-icon-box">
                  {renderBadgeIcon(item.badgeType)}
                </div>
                <div className="cert-badge-info">
                  <div className="cert-badge-top">
                    <span className="cert-badge-code">{item.code}</span>
                    <span className="cert-badge-pill">{item.tag}</span>
                  </div>
                  <span className="cert-badge-name">{item.name}</span>
                  <span className="cert-badge-authority">{item.authority}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Sequence 3 for ultra-wide displays */}
          <div className="certifications-sequence" aria-hidden="true">
            {certificationsData.map((item) => (
              <div key={`cert-seq3-${item.id}`} className="cert-badge-card">
                <div className="cert-badge-icon-box">
                  {renderBadgeIcon(item.badgeType)}
                </div>
                <div className="cert-badge-info">
                  <div className="cert-badge-top">
                    <span className="cert-badge-code">{item.code}</span>
                    <span className="cert-badge-pill">{item.tag}</span>
                  </div>
                  <span className="cert-badge-name">{item.name}</span>
                  <span className="cert-badge-authority">{item.authority}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Sequence 4 for continuous looping */}
          <div className="certifications-sequence" aria-hidden="true">
            {certificationsData.map((item) => (
              <div key={`cert-seq4-${item.id}`} className="cert-badge-card">
                <div className="cert-badge-icon-box">
                  {renderBadgeIcon(item.badgeType)}
                </div>
                <div className="cert-badge-info">
                  <div className="cert-badge-top">
                    <span className="cert-badge-code">{item.code}</span>
                    <span className="cert-badge-pill">{item.tag}</span>
                  </div>
                  <span className="cert-badge-name">{item.name}</span>
                  <span className="cert-badge-authority">{item.authority}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
