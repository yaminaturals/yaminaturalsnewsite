import React from 'react';
import { Container } from '../../components/ui/Container/Container';
import { Button } from '../../components/ui/Button/Button';
import { Card } from '../../components/ui/Card/Card';

export const NotFoundPage: React.FC = () => {
  return (
    <div style={{ padding: 'clamp(4rem, 8vw, 8rem) 0', textAlign: 'center' }}>
      <Container size="narrow">
        <Card variant="surface" padding="lg">
          <div style={{ fontSize: '3.5rem', marginBottom: 'var(--space-2)' }}>🍃</div>
          <span className="eyebrow">Error 404</span>
          <h1>Page Not Found</h1>
          <p className="text-muted" style={{ maxWidth: '480px', margin: '0 auto var(--space-6)' }}>
            The botanical resource, monograph, or page you were looking for is not located at this address.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button to="/" variant="primary">
              Return Home
            </Button>
            <Button to="/products" variant="secondary">
              Browse Ingredients
            </Button>
            <Button to="/submit-requirement" variant="outline">
              Submit Requirement
            </Button>
          </div>
        </Card>
      </Container>
    </div>
  );
};
