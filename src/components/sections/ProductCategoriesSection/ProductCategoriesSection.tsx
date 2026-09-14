import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../ui/Container/Container';
import { Button } from '../../ui/Button/Button';
import { ParallaxLayer } from '../../ui/ParallaxLayer/ParallaxLayer';
import { categoryService } from '../../../services/CategoryService';
import { ProductCategory } from '../../../types';
import './ProductCategoriesSection.css';

const MARQUEE_PHRASES = [
  'Ancient Wisdom',
  'Modern Wellness',
  'Bulk & Private Label',
  'Rooted in Nature',
  'Backed by Science',
  'Made for You',
];

export const ProductCategoriesSection: React.FC = () => {
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to CategoryService for real-time dynamic updates (add/remove/rename/reorder)
    const unsubscribe = categoryService.subscribe((cats) => {
      // Curate categories marked featured or sorted by displayOrder (homepage display limit: 6)
      const visible = cats.filter((c) => c.featured !== false);
      setCategories(visible.length > 0 ? visible.slice(0, 6) : cats.slice(0, 6));
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <section
      className="product-categories-section"
      aria-labelledby="product-categories-heading"
    >
      {/* Subtle Background Organic Watermark */}
      <div className="categories-bg-decoration" aria-hidden="true">
        <ParallaxLayer speed={-0.05} className="categories-parallax-motif">
          <svg
            viewBox="0 0 100 100"
            fill="none"
            className="categories-leaf-watermark"
            aria-hidden="true"
          >
            <circle
              cx="50"
              cy="50"
              r="46"
              stroke="currentColor"
              strokeWidth="0.6"
              strokeDasharray="3 3"
            />
            <path
              d="M50 12 C 70 30, 70 70, 50 88 C 30 70, 30 30, 50 12 Z"
              fill="currentColor"
            />
          </svg>
        </ParallaxLayer>
      </div>

      <Container size="default" className="categories-container">
        {/* Section Header */}
        <div className="categories-header animate-fade-up">
          <span className="eyebrow">OUR PRODUCT CATEGORIES</span>
          <h2 id="product-categories-heading" className="categories-heading">
            Explore Our Natural Product Range
          </h2>
          <p className="categories-intro text-lead">
            Explore herbal ingredients, natural oils, cosmetic materials and nutraceutical products available through our sourcing and procurement network.
          </p>
        </div>

        {/* Dynamic Category State Handling */}
        {loading ? (
          <div className="categories-loading-state" aria-live="polite">
            <div className="btn-spinner categories-spinner" />
            <p className="text-sm text-muted">Loading product categories...</p>
          </div>
        ) : categories.length === 0 ? (
          <div className="categories-empty-state">
            <span className="empty-state-leaf" aria-hidden="true">🌿</span>
            <h3>Product Catalogue Updating</h3>
            <p className="text-muted">
              Our category catalogue is being updated. If you have a specific ingredient requirement, our sourcing desk is available to assist you.
            </p>
            <div className="empty-state-actions">
              <Button to="/submit-requirement" variant="primary" size="md">
                Submit Your Requirement
              </Button>
            </div>
          </div>
        ) : (
          <div className="categories-grid">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                to={`/products?category=${category.slug}`}
                className={`category-card animate-fade-up delay-${Math.min(index + 1, 6)}`}
                aria-label={`Explore ${category.name} category`}
              >
                <div className="category-image-wrapper">
                  {category.imageUrl ? (
                    <img
                      src={category.imageUrl}
                      alt={`${category.name} - natural botanical sourcing materials`}
                      className="category-image"
                      loading="lazy"
                      decoding="async"
                      width="600"
                      height="400"
                      onError={(e) => {
                        // Fallback to botanical pattern if image fails to load
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          parent.classList.add('category-image-fallback');
                        }
                      }}
                    />
                  ) : (
                    <div className="category-image-placeholder" aria-hidden="true">
                      <span className="placeholder-icon">🌿</span>
                    </div>
                  )}
                  <div className="category-image-overlay" aria-hidden="true" />
                </div>

                <div className="category-card-content">
                  <h3 className="category-card-name">{category.name}</h3>
                  <p className="category-card-description">{category.shortDescription}</p>

                  <div className="category-card-action" aria-hidden="true">
                    <span className="action-text">Explore Category</span>
                    <svg
                      className="action-arrow"
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
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Section Bottom CTA ("View All Products") */}
        {!loading && categories.length > 0 && (
          <div className="categories-bottom-cta animate-fade-up delay-4">
            <Button
              to="/products"
              variant="outline"
              size="lg"
              className="categories-all-btn"
              iconRight={
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              }
            >
              View All Products
            </Button>
          </div>
        )}
      </Container>

      {/* Full-Width Continuous Editorial Marquee Strip */}
      {!loading && categories.length > 0 && (
        <div
          className="categories-marquee-strip"
          aria-hidden="true"
          role="presentation"
        >
          <div className="categories-marquee-track">
            {/* Sequence 1 */}
            <div className="categories-marquee-sequence">
              {MARQUEE_PHRASES.map((phrase, idx) => (
                <React.Fragment key={`marquee-1-${idx}`}>
                  <span className="marquee-item-text">{phrase}</span>
                  <span className="marquee-bullet">•</span>
                </React.Fragment>
              ))}
            </div>

            {/* Sequence 2 */}
            <div className="categories-marquee-sequence">
              {MARQUEE_PHRASES.map((phrase, idx) => (
                <React.Fragment key={`marquee-2-${idx}`}>
                  <span className="marquee-item-text">{phrase}</span>
                  <span className="marquee-bullet">•</span>
                </React.Fragment>
              ))}
            </div>

            {/* Sequence 3 */}
            <div className="categories-marquee-sequence">
              {MARQUEE_PHRASES.map((phrase, idx) => (
                <React.Fragment key={`marquee-3-${idx}`}>
                  <span className="marquee-item-text">{phrase}</span>
                  <span className="marquee-bullet">•</span>
                </React.Fragment>
              ))}
            </div>

            {/* Sequence 4 */}
            <div className="categories-marquee-sequence">
              {MARQUEE_PHRASES.map((phrase, idx) => (
                <React.Fragment key={`marquee-4-${idx}`}>
                  <span className="marquee-item-text">{phrase}</span>
                  <span className="marquee-bullet">•</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
