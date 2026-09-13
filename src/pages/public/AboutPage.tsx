import React from 'react';
import { PagePlaceholder } from '../../components/common/PagePlaceholder/PagePlaceholder';

export const AboutPage: React.FC = () => {
  return (
    <PagePlaceholder
      title="About Yami Naturals"
      subtitle="Dedicated to botanical integrity, ethical procurement, and bridging growers with global formulators."
      categoryTag="Our Heritage & Standards"
      overviewCards={[
        {
          icon: '🌱',
          title: 'Ethical Sourcing',
          description: 'Cultivating direct partnerships with regional growers to ensure genuine species authenticity and sustainable harvesting.'
        },
        {
          icon: '🔬',
          title: 'Quality Verification',
          description: 'Every botanical lot is supported by assay testing, Certificates of Analysis (CoA), and rigorous contaminant screening.'
        },
        {
          icon: '🌐',
          title: 'Global Supply Support',
          description: 'Serving diverse compounding needs across nutraceutical, cosmetic, personal care, and wellness sectors.'
        }
      ]}
    />
  );
};
