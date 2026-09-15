import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../ui/Container/Container';
import { Button } from '../../ui/Button/Button';
import { ParallaxLayer } from '../../ui/ParallaxLayer/ParallaxLayer';
import { faqSectionContent } from '../../../data/faq.data';
import { FAQItem } from './FAQItem';
import './FAQSection.css';

export const FAQSection: React.FC = () => {
  const { eyebrow, heading, headingEmphasis, supportingText, items, cta } =
    faqSectionContent;

  // Initial state: only first item open initially
  const [openId, setOpenId] = useState<string | null>('faq-01');

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      className="faq-section"
      aria-labelledby="faq-heading"
      id="faq"
    >
      {/* Background Decorative Botanical & Grid Parallax Motif */}
      <div className="faq-bg-decoration" aria-hidden="true">
        <ParallaxLayer speed={-0.02} className="faq-parallax-layer">
          <svg
            viewBox="0 0 400 400"
            fill="none"
            className="faq-watermark-svg"
            aria-hidden="true"
          >
            <circle
              cx="200"
              cy="200"
              r="170"
              stroke="var(--color-primary-green)"
              strokeWidth="0.7"
              strokeDasharray="4 6"
              opacity="0.12"
            />
            <line
              x1="30"
              y1="200"
              x2="370"
              y2="200"
              stroke="var(--color-primary-green)"
              strokeWidth="0.6"
              strokeDasharray="6 6"
              opacity="0.10"
            />
            <line
              x1="200"
              y1="30"
              x2="200"
              y2="370"
              stroke="var(--color-primary-green)"
              strokeWidth="0.6"
              strokeDasharray="6 6"
              opacity="0.10"
            />
            <path
              d="M70 330 C150 250, 250 230, 330 70"
              stroke="var(--color-amber-accent)"
              strokeWidth="1.2"
              strokeDasharray="8 6"
              opacity="0.16"
            />
          </svg>
        </ParallaxLayer>
      </div>

      <Container size="default">
        <div className="faq-layout">
          {/* LEFT: Editorial Heading, Supporting Text */}
          <div className="faq-left animate-fade-up">
            <div className="faq-eyebrow-wrapper">
              <span className="faq-eyebrow-icon" aria-hidden="true">💬</span>
              <span className="faq-eyebrow-text">{eyebrow}</span>
            </div>

            <h2 id="faq-heading" className="faq-title">
              {heading}{' '}
              {headingEmphasis && (
                <span className="faq-title-emphasis">{headingEmphasis}</span>
              )}
            </h2>

            <p className="faq-supporting-text">{supportingText}</p>

            {/* Decorative Botanical Leaf Linework Motif */}
            <div className="faq-botanical-ornament" aria-hidden="true">
              <svg viewBox="0 0 160 40" fill="none" className="faq-ornament-svg">
                <path
                  d="M10 20 C40 5, 60 35, 90 20 C110 10, 130 30, 150 20"
                  stroke="var(--color-primary-green)"
                  strokeWidth="1.2"
                  strokeDasharray="4 3"
                  opacity="0.35"
                />
                <circle cx="90" cy="20" r="3" fill="var(--color-amber-accent)" opacity="0.7" />
              </svg>
            </div>
          </div>

          {/* RIGHT: Accordion FAQ List + Understated Editorial CTA */}
          <div className="faq-right">
            <div className="faq-accordion-list" role="presentation">
              {items.map((item, idx) => (
                <FAQItem
                  key={item.id}
                  item={item}
                  index={idx}
                  isOpen={openId === item.id}
                  onToggle={() => handleToggle(item.id)}
                />
              ))}
            </div>

            {/* Understated Editorial Post-FAQ CTA */}
            {cta && (
              <div className="faq-post-cta animate-fade-up delay-4">
                <div className="faq-post-cta-content">
                  <h3 className="faq-post-cta-title">{cta.heading}</h3>
                  <p className="faq-post-cta-desc">{cta.text}</p>
                </div>
                <div className="faq-post-cta-actions">
                  <Button
                    to={cta.buttonLink}
                    variant="primary"
                    size="md"
                    className="faq-view-all-btn"
                  >
                    {cta.buttonText}
                  </Button>
                  {cta.secondaryLink && cta.secondaryText && (
                    <Link to={cta.secondaryLink} className="faq-post-cta-secondary-link">
                      Have a specific requirement? <span className="faq-post-cta-link-highlight">{cta.secondaryText}</span>
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};
