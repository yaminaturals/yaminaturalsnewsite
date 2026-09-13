import React from 'react';
import { FAQItemData } from '../../../data/faq.data';

interface FAQItemProps {
  item: FAQItemData;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

export const FAQItem: React.FC<FAQItemProps> = ({
  item,
  index,
  isOpen,
  onToggle,
}) => {
  const triggerId = `faq-trigger-${item.id}`;
  const contentId = `faq-content-${item.id}`;

  return (
    <div
      className={`faq-item ${isOpen ? 'faq-item-open' : ''} animate-fade-up delay-${Math.min(index + 1, 4)}`}
    >
      <h3 className="faq-item-heading">
        <button
          id={triggerId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={contentId}
          className="faq-trigger-btn"
          onClick={onToggle}
        >
          <span className="faq-item-num-badge">
            <span className="faq-item-num">{item.number}</span>
          </span>

          <span className="faq-item-question">{item.question}</span>

          <span className="faq-toggle-icon" aria-hidden="true">
            <svg
              viewBox="0 0 20 20"
              fill="none"
              className="faq-icon-svg"
              aria-hidden="true"
            >
              <line
                x1="10"
                y1="4"
                x2="10"
                y2="16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="faq-icon-vertical"
              />
              <line
                x1="4"
                y1="10"
                x2="16"
                y2="10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="faq-icon-horizontal"
              />
            </svg>
          </span>
        </button>
      </h3>

      <div
        id={contentId}
        role="region"
        aria-labelledby={triggerId}
        className={`faq-answer-panel ${isOpen ? 'faq-answer-open' : ''}`}
      >
        <div className="faq-answer-inner">
          <p className="faq-answer-text">{item.answer}</p>
        </div>
      </div>
    </div>
  );
};
