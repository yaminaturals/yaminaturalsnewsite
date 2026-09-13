import React from 'react';
import { PagePlaceholder } from '../../components/common/PagePlaceholder/PagePlaceholder';

export const B2CSolutionsPage: React.FC = () => {
  return (
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
  );
};
