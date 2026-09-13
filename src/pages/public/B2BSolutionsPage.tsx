import React from 'react';
import { PagePlaceholder } from '../../components/common/PagePlaceholder/PagePlaceholder';

export const B2BSolutionsPage: React.FC = () => {
  return (
    <PagePlaceholder
      title="B2B Enterprise Procurement Solutions"
      subtitle="High-volume, documented raw material supply for manufacturers, nutraceutical compounders, and cosmetic brands."
      categoryTag="Commercial Procurement"
      overviewCards={[
        {
          icon: '🏭',
          title: 'Bulk Commercial Volumes',
          description: 'Supply capabilities ranging from 25 kg drums to full 20ft container loads with batch continuity guarantees.'
        },
        {
          icon: '📑',
          title: 'Technical Regulatory Dossiers',
          description: 'Full documentation packages including TDS, CoA, allergen declarations, non-GMO statements, and flowcharts.'
        },
        {
          icon: '🚢',
          title: 'Export Logistics & Port Delivery',
          description: 'Coordination with global freight carriers, customs clearance documentation, and multi-port delivery management.'
        }
      ]}
    />
  );
};
