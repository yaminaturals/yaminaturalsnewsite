import React, { useState, useMemo } from 'react';
import { Container } from '../../components/ui/Container/Container';
import { Button } from '../../components/ui/Button/Button';
import { SEO } from '../../components/common/SEO';
import { generateFAQSchema, generateBreadcrumbSchema } from '../../utils/seoSchemas';
import { allFaqCategories, allFaqItems } from '../../data/faq.data';
import './FaqPage.css';

export const FaqPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openFaqIds, setOpenFaqIds] = useState<Record<string, boolean>>({
    'faq-01': true, // Keep first FAQ open on load
  });

  const toggleFaq = (id: string) => {
    setOpenFaqIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAllInCategory = (categoryId: string) => {
    const category = allFaqCategories.find((c) => c.id === categoryId);
    if (!category) return;
    setOpenFaqIds((prev) => {
      const next = { ...prev };
      category.items.forEach((item) => {
        next[item.id] = true;
      });
      return next;
    });
  };

  const collapseAllInCategory = (categoryId: string) => {
    const category = allFaqCategories.find((c) => c.id === categoryId);
    if (!category) return;
    setOpenFaqIds((prev) => {
      const next = { ...prev };
      category.items.forEach((item) => {
        next[item.id] = false;
      });
      return next;
    });
  };

  // Filtered categories based on activeCategory and searchQuery
  const filteredCategories = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return allFaqCategories
      .filter((category) => {
        if (activeCategory !== 'all' && category.id !== activeCategory) {
          return false;
        }
        return true;
      })
      .map((category) => {
        if (!q) return category;
        const matchingItems = category.items.filter(
          (item) =>
            item.question.toLowerCase().includes(q) ||
            item.answer.toLowerCase().includes(q)
        );
        return {
          ...category,
          items: matchingItems,
        };
      })
      .filter((category) => category.items.length > 0);
  }, [activeCategory, searchQuery]);

  const totalResultsCount = useMemo(() => {
    return filteredCategories.reduce((acc, cat) => acc + cat.items.length, 0);
  }, [filteredCategories]);

  return (
    <div className="faq-page-view animate-fade-in">
      <SEO
        title="FAQ | Yami Naturals"
        description="Find answers about herbal products, manufacturing, specifications, COA documentation, production batches, packaging, shipping, export requirements, and fulfilment with Yami Naturals."
        canonicalPath="/faq"
        structuredData={[
          generateFAQSchema(allFaqItems),
          generateBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'FAQ', url: '/faq' },
          ]),
        ]}
      />

      {/* Hero Header Section */}
      <section className="faq-page-hero" aria-labelledby="faq-page-title">
        <Container size="default">
          <div className="faq-hero-inner">
            <div className="faq-hero-badge">
              <span className="faq-hero-badge-icon">🌿</span>
              <span>Manufacturer &amp; Export Knowledge Base</span>
            </div>

            <h1 id="faq-page-title" className="faq-hero-title">
              Questions Before You Start?
            </h1>

            <p className="faq-hero-subtitle">
              Find answers about products, requirements, documentation, production, packaging, shipping and fulfilment.
            </p>

            {/* Quick Search Bar */}
            <div className="faq-search-box-wrapper">
              <div className="faq-search-box">
                <span className="faq-search-icon" aria-hidden="true">🔍</span>
                <input
                  type="search"
                  className="faq-search-input"
                  placeholder="Search 55+ questions across manufacturing, documentation, export, packaging..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search frequently asked questions"
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="faq-search-clear-btn"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search input"
                  >
                    ✕
                  </button>
                )}
              </div>
              {searchQuery && (
                <div className="faq-search-status" aria-live="polite">
                  Found <strong>{totalResultsCount}</strong> matching question{totalResultsCount === 1 ? '' : 's'}
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Main Content Area: Category Navigation & FAQ Accordions */}
      <section className="faq-main-section" aria-label="FAQ Categories and Answers">
        <Container size="default">
          {/* Category Quick Filter Bar */}
          <div className="faq-category-nav-wrap">
            <div className="faq-category-nav" role="tablist" aria-label="FAQ Category Filter">
              <button
                type="button"
                role="tab"
                aria-selected={activeCategory === 'all'}
                className={`faq-cat-pill ${activeCategory === 'all' ? 'active' : ''}`}
                onClick={() => setActiveCategory('all')}
              >
                <span>All Topics</span>
                <span className="faq-cat-pill-count">55</span>
              </button>
              {allFaqCategories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === category.id}
                  className={`faq-cat-pill ${activeCategory === category.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <span className="faq-cat-pill-icon">{category.icon}</span>
                  <span>{category.name}</span>
                  <span className="faq-cat-pill-count">{category.items.length}</span>
                </button>
              ))}
            </div>
          </div>

          {/* FAQ Category Groups */}
          {filteredCategories.length > 0 ? (
            <div className="faq-categories-container">
              {filteredCategories.map((category) => (
                <div
                  key={category.id}
                  id={`cat-${category.id}`}
                  className="faq-category-section animate-fade-up"
                >
                  <div className="faq-category-header">
                    <div className="faq-category-title-wrap">
                      <span className="faq-category-icon" aria-hidden="true">
                        {category.icon}
                      </span>
                      <div>
                        <h2 className="faq-category-title">{category.name}</h2>
                        <p className="faq-category-desc">{category.description}</p>
                      </div>
                    </div>
                    <div className="faq-category-actions">
                      <span className="faq-category-count">
                        {category.items.length} {category.items.length === 1 ? 'Question' : 'Questions'}
                      </span>
                      <div className="faq-category-batch-toggle">
                        <button
                          type="button"
                          className="faq-batch-btn"
                          onClick={() => expandAllInCategory(category.id)}
                          aria-label={`Expand all questions in ${category.name}`}
                        >
                          Expand All
                        </button>
                        <span className="faq-batch-divider">•</span>
                        <button
                          type="button"
                          className="faq-batch-btn"
                          onClick={() => collapseAllInCategory(category.id)}
                          aria-label={`Collapse all questions in ${category.name}`}
                        >
                          Collapse All
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="faq-page-accordion-list" role="presentation">
                    {category.items.map((item) => {
                      const isOpen = !!openFaqIds[item.id];
                      const triggerId = `page-faq-trigger-${item.id}`;
                      const contentId = `page-faq-content-${item.id}`;

                      return (
                        <div
                          key={item.id}
                          className={`faq-page-item ${isOpen ? 'faq-page-item-open' : ''}`}
                        >
                          <h3 className="faq-page-item-heading">
                            <button
                              id={triggerId}
                              type="button"
                              aria-expanded={isOpen}
                              aria-controls={contentId}
                              className="faq-page-trigger-btn"
                              onClick={() => toggleFaq(item.id)}
                            >
                              <span className="faq-page-num-badge">
                                <span className="faq-page-num">{item.number}</span>
                              </span>

                              <span className="faq-page-question">{item.question}</span>

                              <span className="faq-page-toggle-icon" aria-hidden="true">
                                <svg
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  className="faq-page-icon-svg"
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
                            className={`faq-page-answer-panel ${
                              isOpen ? 'faq-page-answer-open' : ''
                            }`}
                          >
                            <div className="faq-page-answer-inner">
                              <p className="faq-page-answer-text">{item.answer}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="faq-no-results animate-fade-up">
              <span className="faq-no-results-icon" aria-hidden="true">🔍</span>
              <h3>No matching questions found</h3>
              <p>
                We could not find any FAQ matching &ldquo;<strong>{searchQuery}</strong>&rdquo;.
              </p>
              <div className="faq-no-results-actions">
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                >
                  Reset Filters &amp; Search
                </button>
                <Button to="/submit-requirement" variant="primary" size="sm">
                  Submit Custom Requirement
                </Button>
              </div>
            </div>
          )}

          {/* Understated Bottom Sourcing Desk Card */}
          <div className="faq-bottom-sourcing-card animate-fade-up">
            <div className="faq-bottom-card-content">
              <span className="faq-bottom-card-tag">Direct Sourcing &amp; Procurement Desk</span>
              <h2 className="faq-bottom-card-title">Have a specific or customized requirement?</h2>
              <p className="faq-bottom-card-desc">
                If you need a specialized botanical mesh, custom extraction ratio, formulation parameters, or specific destination export documentation, our sourcing desk is available to assist you.
              </p>
            </div>
            <div className="faq-bottom-card-actions">
              <Button to="/submit-requirement" variant="primary" size="md">
                Submit Your Requirement →
              </Button>
              <Button to="/contact" variant="outline" size="md">
                Contact Desk
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
