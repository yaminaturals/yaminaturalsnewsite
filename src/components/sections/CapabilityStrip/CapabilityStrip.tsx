import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../ui/Container/Container';
import { ParallaxLayer } from '../../ui/ParallaxLayer/ParallaxLayer';
import { categoryService } from '../../../services/CategoryService';
import { ProductCategory } from '../../../types';
import './CapabilityStrip.css';

interface CapabilityItem {
  id: string;
  categorySlug?: string;
  title: string;
  description: string;
  link: string;
  icon: React.ReactNode;
  isCustomRequirement?: boolean;
}

export const CapabilityStrip: React.FC = () => {
  const [categories, setCategories] = useState<ProductCategory[]>([]);

  useEffect(() => {
    categoryService.getCategories().then(setCategories).catch(() => {
      // Graceful fallback to default routes if service is busy
    });
  }, []);

  // Helper to resolve dynamic category slug from CategoryService source of truth
  const getCategoryRoute = (defaultSlug: string): string => {
    const matched = categories.find((c) => c.slug === defaultSlug);
    return matched ? `/products?category=${matched.slug}` : `/products?category=${defaultSlug}`;
  };

  const capabilities: CapabilityItem[] = [
    {
      id: 'cap-powders',
      title: 'Herbal Powders',
      description: 'Botanical powders for diverse product requirements',
      link: getCategoryRoute('herbal-powders'),
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {/* Mortar & pestle motif */}
          <path d="M3 11c0 4.418 3.582 8 8 8s8-3.582 8-8H3z" />
          <path d="M7 19l-1 2h12l-1-2" />
          <path d="M15 4l-4 7" />
          <path d="M9 4l6 1" />
        </svg>
      ),
    },
    {
      id: 'cap-extracts',
      title: 'Herbal Extracts',
      description: 'Standardized and application-focused extract sourcing',
      link: getCategoryRoute('herbal-extracts'),
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {/* Extract lab flask motif */}
          <path d="M10 2v5L5.5 16.5A3 3 0 0 0 8 21h8a3 3 0 0 0 2.5-4.5L14 7V2" />
          <line x1="8.5" y1="2" x2="15.5" y2="2" />
          <path d="M7.5 15h9" />
          <circle cx="12" cy="11" r="0.8" fill="currentColor" />
        </svg>
      ),
    },
    {
      id: 'cap-oils',
      title: 'Natural Oils',
      description: 'Natural oils for wellness, cosmetic and formulation needs',
      link: getCategoryRoute('natural-oils'),
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {/* Pure botanical oil droplet */}
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
          <path d="M12 12a3 3 0 0 0 3 3" />
        </svg>
      ),
    },
    {
      id: 'cap-clays',
      title: 'Cosmetic Clays',
      description: 'Natural clay materials for cosmetic applications',
      link: getCategoryRoute('cosmetic-clay-powders'),
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {/* Natural earthen mineral layers */}
          <ellipse cx="12" cy="7" rx="9" ry="3" />
          <path d="M3 7v6c0 1.66 4.03 3 9 3s9-1.34 9-3V7" />
          <path d="M3 13v5c0 1.66 4.03 3 9 3s9-1.34 9-3v-5" />
        </svg>
      ),
    },
    {
      id: 'cap-nutra',
      title: 'Nutraceutical Ingredients',
      description: 'Ingredients for nutraceutical and supplement requirements',
      link: getCategoryRoute('nutraceutical-ingredients'),
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {/* Bioactive supplement capsule motif */}
          <rect x="2" y="6" width="20" height="12" rx="6" />
          <line x1="12" y1="6" x2="12" y2="18" />
          <path d="M7 10h2" />
          <path d="M15 14h2" />
        </svg>
      ),
    },
    {
      id: 'cap-custom',
      title: 'Custom Requirements',
      description: "Tell us what you need and we'll help source the right solution",
      link: '/submit-requirement',
      isCustomRequirement: true,
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {/* Specification requirement desk & compass */}
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
    },
  ];

  return (
    <section
      className="capability-strip"
      aria-labelledby="capability-heading"
    >
      {/* Subtle Botanical Parallax Background Detail */}
      <div className="capability-bg-decoration" aria-hidden="true">
        <ParallaxLayer speed={0.06} className="capability-parallax-leaf">
          <svg
            viewBox="0 0 100 100"
            fill="none"
            className="capability-leaf-motif"
            aria-hidden="true"
          >
            <path
              d="M15 85 Q 35 25 85 15 Q 65 75 15 85 Z"
              fill="currentColor"
            />
            <path
              d="M15 85 Q 45 50 85 15"
              stroke="currentColor"
              strokeWidth="0.8"
            />
          </svg>
        </ParallaxLayer>
      </div>

      <Container size="default" className="capability-container">
        {/* Section Header */}
        <div className="capability-header animate-fade-up">
          <span className="eyebrow">WHAT WE OFFER</span>
          <h2 id="capability-heading" className="capability-title">
            Natural Solutions, Sourced Around Your Needs.
          </h2>
          <p className="capability-intro text-lead">
            Explore our core natural ingredient and product categories, or tell us exactly what you are looking for.
          </p>
        </div>

        {/* 3 x 2 Capability Grid */}
        <div className="capability-grid">
          {capabilities.map((item, index) => (
            <Link
              key={item.id}
              to={item.link}
              className={`capability-card animate-fade-up delay-${Math.min(index + 1, 6)} ${
                item.isCustomRequirement ? 'capability-card-custom' : ''
              }`}
            >
              <div className="capability-card-header">
                <div className="capability-icon-container">
                  {item.icon}
                </div>
                {item.isCustomRequirement && (
                  <span className="capability-badge-pill">Sourcing Desk</span>
                )}
              </div>

              <div className="capability-card-body">
                <h3 className="capability-card-title">{item.title}</h3>
                <p className="capability-card-desc">{item.description}</p>
              </div>

              <div className="capability-card-footer" aria-hidden="true">
                <span className="capability-card-action">
                  {item.isCustomRequirement ? 'Submit Requirement' : 'Explore Category'}
                </span>
                <svg
                  className="capability-card-arrow"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
};
