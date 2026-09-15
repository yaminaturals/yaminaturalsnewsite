import React from 'react';
import { SEO } from '../../components/common/SEO';
import { generateFAQSchema, generateBreadcrumbSchema } from '../../utils/seoSchemas';
import { faqSectionContent } from '../../data/faq.data';
import { PagePlaceholder } from '../../components/common/PagePlaceholder/PagePlaceholder';

export const FaqPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Frequently Asked Questions (FAQ) | Yami Naturals"
        description="Answers to common questions regarding botanical procurement, minimum order quantities (MOQ), Certificate of Analysis (CoA) documentation, and custom formulations."
        canonicalPath="/faq"
        structuredData={[
          generateFAQSchema(faqSectionContent.items),
          generateBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'FAQ', url: '/faq' },
          ]),
        ]}
      />
      <PagePlaceholder
        title="Frequently Asked Questions (FAQ)"
        subtitle="Answers regarding our botanical procurement workflow, minimum order quantities, documentation, and quality control."
        categoryTag="Knowledge Base"
        overviewCards={[
          {
            icon: '📊',
            title: 'Minimum Order Quantities (MOQ)',
            description: 'MOQs vary by material classification. Wholesale extracts typically start at 10-25 kg, while selected herbs and whole powders support smaller pilot batches.'
          },
          {
            icon: '📜',
            title: 'Certificates of Analysis (CoA)',
            description: 'Pre-shipment CoAs including HPLC active compound assay, moisture %, ash %, heavy metals, and micro-organism counts are provided for all commercial batches.'
          },
          {
            icon: '🌍',
            title: 'International Shipping & Clearance',
            description: 'We handle export packaging, phytosanitary certifications, commercial invoices, and packing lists to ensure smooth customs clearance.'
          }
        ]}
      />
    </>
  );
};
