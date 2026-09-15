import React from 'react';
import { Container } from '../../ui/Container/Container';
import { certificationsData, CertificationItem } from '../../../data/certifications.data';
import './CertificationsSection.css';

const renderOfficialLogo = (badgeType: CertificationItem['badgeType']) => {
  switch (badgeType) {
    case 'fssai':
      return (
        <svg viewBox="0 0 160 80" className="cert-real-logo-svg" aria-label="FSSAI Logo">
          {/* FSSAI iconic swoosh arches */}
          <path d="M 24 54 C 24 24, 75 14, 136 28 C 110 18, 55 18, 38 40 C 30 50, 30 54, 24 54 Z" fill="#F58220" />
          <path d="M 28 58 C 45 68, 95 68, 136 50 C 105 60, 60 58, 42 46 C 36 42, 32 48, 28 58 Z" fill="#0054A6" />
          {/* FSSAI Typography */}
          <text x="36" y="50" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="27" fill="#0054A6" letterSpacing="-0.5">
            fssai
          </text>
          {/* Orange dot on i */}
          <circle cx="94" cy="34" r="3.2" fill="#F58220" />
          {/* Subtitle */}
          <text x="80" y="68" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="6.5" fill="#4B5563" letterSpacing="0.4">
            FOOD SAFETY &amp; STANDARDS
          </text>
        </svg>
      );

    case 'gst':
      return (
        <svg viewBox="0 0 160 80" className="cert-real-logo-svg" aria-label="GST Logo">
          {/* Tricolor circular emblem */}
          <circle cx="44" cy="40" r="26" fill="#FFFFFF" stroke="#000080" strokeWidth="1.5" />
          {/* Saffron arc */}
          <path d="M 20 32 A 26 26 0 0 1 68 32 Z" fill="#FF9933" />
          {/* Green arc */}
          <path d="M 20 48 A 26 26 0 0 0 68 48 Z" fill="#138808" />
          {/* Chakra wheel */}
          <circle cx="44" cy="40" r="6" fill="none" stroke="#000080" strokeWidth="1.2" />
          <circle cx="44" cy="40" r="1.5" fill="#000080" />
          {/* GST Text */}
          <text x="80" y="44" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="28" fill="#000080" letterSpacing="0.5">
            GST
          </text>
          <text x="80" y="58" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="7.5" fill="#138808" letterSpacing="0.3">
            GOODS &amp; SERVICES TAX
          </text>
          <text x="80" y="68" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="5.5" fill="#FF9933" letterSpacing="0.2">
            GOVERNMENT OF INDIA
          </text>
        </svg>
      );

    case 'gmp':
      return (
        <svg viewBox="0 0 160 80" className="cert-real-logo-svg" aria-label="GMP Certified Logo">
          {/* Circular Gold/Navy Seal */}
          <circle cx="44" cy="40" r="28" fill="#0A2540" stroke="#D4AF37" strokeWidth="2.5" />
          <circle cx="44" cy="40" r="23" fill="none" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 2" />
          {/* Stars */}
          <text x="44" y="24" textAnchor="middle" fill="#D4AF37" fontSize="8">★★★</text>
          {/* GMP Text */}
          <text x="44" y="44" textAnchor="middle" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="18" fill="#FFFFFF" letterSpacing="1">
            GMP
          </text>
          <text x="44" y="54" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="5.5" fill="#D4AF37" letterSpacing="0.8">
            CERTIFIED
          </text>
          {/* Side text */}
          <text x="82" y="36" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="800" fontSize="15" fill="#0A2540">
            GMP
          </text>
          <text x="82" y="48" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="700" fontSize="8.5" fill="#C98A1E">
            CERTIFIED FACILITY
          </text>
          <text x="82" y="60" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="7" fill="#64748B">
            Good Manufacturing Practice
          </text>
        </svg>
      );

    case 'halal':
      return (
        <svg viewBox="0 0 160 80" className="cert-real-logo-svg" aria-label="Halal Certified Logo">
          {/* Green circular seal */}
          <circle cx="44" cy="40" r="28" fill="#007A3D" stroke="#25A25A" strokeWidth="2" />
          <circle cx="44" cy="40" r="24" fill="none" stroke="#FFFFFF" strokeWidth="1.2" />
          {/* Arabic Calligraphy Style حلال */}
          <path d="M 34 46 C 34 33, 40 30, 48 30 C 44 38, 44 44, 54 44 C 56 44, 57 41, 56 36 L 58 36 C 60 44, 54 48, 46 48 C 38 48, 34 47, 34 46 Z" fill="#FFFFFF" />
          <circle cx="40" cy="32" r="2.2" fill="#FFFFFF" />
          {/* Text HALAL */}
          <text x="82" y="37" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="17" fill="#007A3D" letterSpacing="1">
            HALAL
          </text>
          <text x="82" y="50" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="800" fontSize="9" fill="#166534" letterSpacing="0.5">
            CERTIFIED
          </text>
          <text x="82" y="62" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="7" fill="#64748B">
            Global Compliance
          </text>
        </svg>
      );

    case 'spiceboard':
      return (
        <svg viewBox="0 0 160 80" className="cert-real-logo-svg" aria-label="Spices Board India Logo">
          {/* Spices Board Green Medallion */}
          <circle cx="44" cy="40" r="28" fill="#0D5C3A" stroke="#16A34A" strokeWidth="1.5" />
          {/* Mortar & pestle with spice leaves */}
          <path d="M 33 46 C 33 52, 55 52, 55 46 L 55 43 L 33 43 Z" fill="#EAB308" />
          <path d="M 44 26 L 49 43 L 42 43 Z" fill="#FFFFFF" />
          <path d="M 36 34 C 36 26, 44 26, 44 34 C 40 34, 38 31, 36 34 Z" fill="#4ADE80" />
          <path d="M 52 34 C 52 26, 44 26, 44 34 C 48 34, 50 31, 52 34 Z" fill="#4ADE80" />
          {/* Side text */}
          <text x="82" y="32" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="12" fill="#0D5C3A" letterSpacing="0.3">
            SPICES BOARD
          </text>
          <text x="82" y="45" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="800" fontSize="10.5" fill="#166534">
            INDIA
          </text>
          <text x="82" y="58" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="6.5" fill="#64748B">
            Ministry of Commerce &amp; Ind.
          </text>
        </svg>
      );

    case 'apeda':
      return (
        <svg viewBox="0 0 160 80" className="cert-real-logo-svg" aria-label="APEDA Logo">
          {/* APEDA circular badge with sun & wheat sheaf */}
          <circle cx="44" cy="40" r="27" fill="#FFFDF0" stroke="#006837" strokeWidth="2" />
          {/* Golden wheat stalk & sun */}
          <circle cx="44" cy="30" r="7" fill="#F59E0B" />
          <path d="M 34 52 C 38 40, 44 36, 44 32 C 44 36, 50 40, 54 52 Z" fill="#006837" />
          <path d="M 44 32 L 44 54" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
          {/* APEDA text */}
          <text x="80" y="38" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="19" fill="#006837" letterSpacing="1.2">
            APEDA
          </text>
          <text x="80" y="51" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="7.5" fill="#D97706" letterSpacing="0.2">
            AGRI &amp; PROCESSED FOOD
          </text>
          <text x="80" y="61" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="6.5" fill="#64748B">
            Export Development Authority
          </text>
        </svg>
      );

    case 'iso':
      return (
        <svg viewBox="0 0 160 80" className="cert-real-logo-svg" aria-label="ISO 22000 Logo">
          {/* ISO Octagonal Badge */}
          <polygon points="44,14 62,22 70,40 62,58 44,66 26,58 18,40 26,22" fill="#0F2C59" stroke="#C98A1E" strokeWidth="2" />
          <text x="44" y="37" textAnchor="middle" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="13" fill="#FFFFFF">
            ISO
          </text>
          <text x="44" y="50" textAnchor="middle" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="800" fontSize="8" fill="#F59E0B">
            22000
          </text>
          {/* Text */}
          <text x="82" y="34" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="15" fill="#0F2C59">
            ISO 22000
          </text>
          <text x="82" y="47" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="700" fontSize="8.5" fill="#C98A1E">
            FOOD SAFETY MGMT
          </text>
          <text x="82" y="59" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="7" fill="#64748B">
            HACCP Compliant Quality
          </text>
        </svg>
      );

    case 'nongmo':
      return (
        <svg viewBox="0 0 160 80" className="cert-real-logo-svg" aria-label="Non-GMO Verified Logo">
          {/* Non-GMO badge */}
          <rect x="18" y="16" width="52" height="48" rx="8" fill="#FF7900" />
          {/* Butterfly & leaf outline */}
          <path d="M 32 30 C 36 22, 48 24, 44 36 C 40 40, 32 38, 32 30 Z" fill="#FFFFFF" opacity="0.9" />
          <path d="M 56 30 C 52 22, 40 24, 44 36 C 48 40, 56 38, 56 30 Z" fill="#FFFFFF" opacity="0.9" />
          <circle cx="44" cy="34" r="2" fill="#2E7D32" />
          <text x="44" y="56" textAnchor="middle" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="8" fill="#FFFFFF">
            VERIFIED
          </text>
          {/* Text */}
          <text x="78" y="35" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="15" fill="#EA580C">
            NON-GMO
          </text>
          <text x="78" y="48" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="800" fontSize="8.5" fill="#16A34A">
            100% NATURAL
          </text>
          <text x="78" y="60" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="7" fill="#64748B">
            Botanical Origin Verified
          </text>
        </svg>
      );

    case 'kosher':
      return (
        <svg viewBox="0 0 160 80" className="cert-real-logo-svg" aria-label="Kosher Certified Logo">
          {/* Kosher Circle K Emblem */}
          <circle cx="44" cy="40" r="27" fill="#1E293B" stroke="#38BDF8" strokeWidth="2" />
          <polygon points="44,22 49,34 60,34 51,42 54,53 44,46 34,53 37,42 28,34 39,34" fill="none" stroke="#38BDF8" strokeWidth="1.2" />
          <text x="44" y="46" textAnchor="middle" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="18" fill="#FFFFFF">
            K
          </text>
          {/* Text */}
          <text x="80" y="36" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="16" fill="#1E293B">
            KOSHER
          </text>
          <text x="80" y="49" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="700" fontSize="8.5" fill="#0284C7">
            CERTIFIED STANDARD
          </text>
          <text x="80" y="60" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="7" fill="#64748B">
            Global Dietary Compliance
          </text>
        </svg>
      );

    case 'msme':
      return (
        <svg viewBox="0 0 160 80" className="cert-real-logo-svg" aria-label="MSME Udyam Logo">
          {/* MSME Industrial Gear & Tricolor */}
          <circle cx="44" cy="40" r="27" fill="#FFF7ED" stroke="#EA580C" strokeWidth="2" />
          <circle cx="44" cy="40" r="18" fill="none" stroke="#16A34A" strokeWidth="1.5" strokeDasharray="4 2" />
          <text x="44" y="44" textAnchor="middle" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="9" fill="#EA580C">
            UDYAM
          </text>
          {/* Text */}
          <text x="80" y="34" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="16" fill="#EA580C">
            MSME
          </text>
          <text x="80" y="47" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="800" fontSize="9" fill="#16A34A">
            UDYAM REGISTERED
          </text>
          <text x="80" y="59" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="7" fill="#64748B">
            Ministry of MSME, Govt. of India
          </text>
        </svg>
      );

    case 'iec':
      return (
        <svg viewBox="0 0 160 80" className="cert-real-logo-svg" aria-label="IEC DGFT Logo">
          {/* DGFT Globe & Trade Shield */}
          <circle cx="44" cy="40" r="27" fill="#0A2540" stroke="#EAB308" strokeWidth="2" />
          <ellipse cx="44" cy="40" rx="12" ry="24" fill="none" stroke="#60A5FA" strokeWidth="1.2" />
          <path d="M 20 40 L 68 40 M 24 28 L 64 28 M 24 52 L 64 52" stroke="#60A5FA" strokeWidth="1" />
          {/* Text */}
          <text x="80" y="35" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="16" fill="#0A2540">
            IEC CODE
          </text>
          <text x="80" y="48" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="800" fontSize="8.5" fill="#CA8A04">
            DGFT RECOGNIZED
          </text>
          <text x="80" y="60" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="7" fill="#64748B">
            Import Export Licenced Entity
          </text>
        </svg>
      );

    case 'organic':
      return (
        <svg viewBox="0 0 160 80" className="cert-real-logo-svg" aria-label="India Organic Logo">
          {/* India Organic Sprout Sun Emblem */}
          <circle cx="44" cy="40" r="27" fill="#F0FDF4" stroke="#16A34A" strokeWidth="2" />
          <path d="M 44 20 C 35 25, 32 35, 36 48 C 40 42, 44 38, 44 20 Z" fill="#15803D" />
          <path d="M 44 20 C 53 25, 56 35, 52 48 C 48 42, 44 38, 44 20 Z" fill="#4ADE80" />
          <circle cx="44" cy="50" r="3" fill="#CA8A04" />
          {/* Text */}
          <text x="80" y="34" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="14" fill="#15803D">
            INDIA ORGANIC
          </text>
          <text x="80" y="47" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="800" fontSize="8.5" fill="#16A34A">
            NPOP CERTIFIED
          </text>
          <text x="80" y="59" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="7" fill="#64748B">
            100% Pure Botanical Quality
          </text>
        </svg>
      );

    case 'usfda':
      return (
        <svg viewBox="0 0 160 80" className="cert-real-logo-svg" aria-label="US FDA Registered Logo">
          {/* US FDA Navy Medallion */}
          <circle cx="44" cy="40" r="27" fill="#003366" stroke="#FFFFFF" strokeWidth="1.5" />
          <circle cx="44" cy="40" r="24" fill="none" stroke="#93C5FD" strokeWidth="1" />
          <text x="44" y="46" textAnchor="middle" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="16" fill="#FFFFFF" letterSpacing="0.8">
            FDA
          </text>
          {/* Text */}
          <text x="80" y="35" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="15" fill="#003366">
            US FDA
          </text>
          <text x="80" y="48" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="800" fontSize="8.5" fill="#2563EB">
            REGISTERED FACILITY
          </text>
          <text x="80" y="60" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="7" fill="#64748B">
            U.S. Food &amp; Drug Administration
          </text>
        </svg>
      );

    default:
      return null;
  }
};

export const CertificationsSection: React.FC = () => {
  return (
    <section className="certifications-section" aria-label="Our Certifications">
      <Container size="default">
        <div className="certifications-header">
          <h2 className="certifications-title">
            OUR CERTIFICATIONS
          </h2>
        </div>
      </Container>

      {/* Continuous Horizontal Moving Marquee */}
      <div className="certifications-marquee-container" aria-label="Certifications and accreditations moving list">
        <div className="certifications-marquee-track">
          {/* Sequence 1 */}
          <div className="certifications-sequence">
            {certificationsData.map((item) => (
              <div key={`cert-seq1-${item.id}`} className="cert-logo-item">
                <div className="cert-logo-graphic-box">
                  {renderOfficialLogo(item.badgeType)}
                </div>
                <span className="cert-logo-caption-name">{item.name}</span>
              </div>
            ))}
          </div>

          {/* Sequence 2 for seamless infinite loop */}
          <div className="certifications-sequence" aria-hidden="true">
            {certificationsData.map((item) => (
              <div key={`cert-seq2-${item.id}`} className="cert-logo-item">
                <div className="cert-logo-graphic-box">
                  {renderOfficialLogo(item.badgeType)}
                </div>
                <span className="cert-logo-caption-name">{item.name}</span>
              </div>
            ))}
          </div>

          {/* Sequence 3 for ultra-wide screens */}
          <div className="certifications-sequence" aria-hidden="true">
            {certificationsData.map((item) => (
              <div key={`cert-seq3-${item.id}`} className="cert-logo-item">
                <div className="cert-logo-graphic-box">
                  {renderOfficialLogo(item.badgeType)}
                </div>
                <span className="cert-logo-caption-name">{item.name}</span>
              </div>
            ))}
          </div>

          {/* Sequence 4 for continuous looping */}
          <div className="certifications-sequence" aria-hidden="true">
            {certificationsData.map((item) => (
              <div key={`cert-seq4-${item.id}`} className="cert-logo-item">
                <div className="cert-logo-graphic-box">
                  {renderOfficialLogo(item.badgeType)}
                </div>
                <span className="cert-logo-caption-name">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
