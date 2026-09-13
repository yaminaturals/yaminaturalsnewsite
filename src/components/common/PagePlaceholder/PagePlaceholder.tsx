import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../ui/Container/Container';
import { Button } from '../../ui/Button/Button';
import { Card } from '../../ui/Card/Card';
import { Badge } from '../../ui/Badge/Badge';
import './PagePlaceholder.css';

export interface PagePlaceholderProps {
  title: string;
  subtitle: string;
  categoryTag?: string;
  overviewCards?: {
    icon: string;
    title: string;
    description: string;
  }[];
  children?: React.ReactNode;
}

export const PagePlaceholder: React.FC<PagePlaceholderProps> = ({
  title,
  subtitle,
  categoryTag = 'Procurement Sourcing',
  overviewCards = [],
  children
}) => {
  return (
    <div className="page-placeholder animate-fade-in">
      <Container size="default">
        <div className="page-placeholder-hero">
          {/* Breadcrumb trail */}
          <nav className="page-placeholder-breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>{title}</span>
          </nav>

          <div className="page-placeholder-badge">
            <Badge variant="primary">{categoryTag}</Badge>
          </div>

          <h1>{title}</h1>
          <p className="page-placeholder-desc">{subtitle}</p>

          <div className="page-placeholder-notice">
            🌿 <strong>Foundation Route Active:</strong> This page structure, route handler, and responsive layout are fully wired. Detailed production monographs, client assets, and interactive controls will be populated in subsequent development phases.
          </div>

          <div className="page-placeholder-actions">
            <Button to="/submit-requirement" variant="primary" size="lg">
              Submit Your Requirement
            </Button>
            <Button to="/products" variant="secondary" size="lg">
              Explore Products
            </Button>
          </div>
        </div>

        {/* Optional Topic Cards */}
        {overviewCards.length > 0 && (
          <div className="page-placeholder-grid">
            {overviewCards.map((card, idx) => (
              <Card key={idx} variant="surface" hoverable padding="md">
                <div style={{ fontSize: '2rem', marginBottom: 'var(--space-2)' }}>{card.icon}</div>
                <h4 style={{ marginBottom: 'var(--space-2)' }}>{card.title}</h4>
                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', marginBottom: 0 }}>
                  {card.description}
                </p>
              </Card>
            ))}
          </div>
        )}

        {children}
      </Container>
    </div>
  );
};
