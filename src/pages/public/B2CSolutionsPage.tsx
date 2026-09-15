import React from 'react';
import { SEO } from '../../components/common/SEO';
import { generateBreadcrumbSchema } from '../../utils/seoSchemas';
import { PagePlaceholder } from '../../components/common/PagePlaceholder/PagePlaceholder';

export const B2CSolutionsPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Natural Products for Individual Requirements | Yami Naturals"
        description="Pure, unadulterated whole herbs and natural wellness materials for practitioners, artisanal formulators, and individuals seeking custom requirement assistance."
        canonicalPath="/b2c-solutions"
        structuredData={generateBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'B2C Solutions', url: '/b2c-solutions' },
        ])}
      />
      <PagePlaceholder
        title="B2C Consumer & Practitioner Solutions"
        subtitle="Pure, unadulterated whole herbs and natural wellness materials for practitioners, artisanal formulators, and individuals."
        categoryTag="Individual & Clinic Supply"
        overviewCards={[
          {
            icon: '🌿',
            title: 'Pure Whole Herb Powders',
            description: 'Single-ingredient natural powders without excipients, fillers, synthetic preservatives, or artificial colors.'
          },
          {
            icon: '📦',
            title: 'Convenient Retail Packs',
            description: 'High-barrier resealable foil pouches protecting volatile herbal oils and light-sensitive phytonutrients.'
          },
          {
            icon: '💬',
            title: 'Custom Inquiries & Guidance',
            description: 'Direct procurement support for wellness practitioners formulating personalized customer herbal regimens.'
          }
        ]}
      />
    </>
  );
};
