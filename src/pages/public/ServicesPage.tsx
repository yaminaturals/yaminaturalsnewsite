import React from 'react';
import { SEO } from '../../components/common/SEO';
import { generateBreadcrumbSchema } from '../../utils/seoSchemas';
import { PagePlaceholder } from '../../components/common/PagePlaceholder/PagePlaceholder';

export const ServicesPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Services & Sourcing Capabilities | Yami Naturals"
        description="Comprehensive botanical sourcing and product-support services including custom procurement, analytical testing (HPLC/CoA), and private label formulation support."
        canonicalPath="/services"
        structuredData={generateBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services' },
        ])}
      />
      <PagePlaceholder
        title="Sourcing & Product-Support Services"
        subtitle="Comprehensive procurement support connecting natural ingredient growers with formulation manufacturers."
        categoryTag="Capabilities"
        overviewCards={[
          {
            icon: '📦',
            title: 'Custom Procurement & Sourcing',
            description: 'Direct procurement of raw botanicals, customized mesh sizes, standardized assays, and specialty wildcrafted harvests.'
          },
          {
            icon: '🧪',
            title: 'Analytical Quality Testing',
            description: 'Batch-by-batch HPLC verification, heavy metal screening, microbiological analysis, and complete Certificates of Analysis.'
          },
          {
            icon: '🏷️',
            title: 'Private Label & Formulation Support',
            description: 'Assisting brands with dry-blend powder filling, capsule compounding, and compliant export packaging.'
          }
        ]}
      />
    </>
  );
};
