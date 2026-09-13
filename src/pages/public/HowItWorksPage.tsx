import React from 'react';
import { PagePlaceholder } from '../../components/common/PagePlaceholder/PagePlaceholder';

export const HowItWorksPage: React.FC = () => {
  return (
    <PagePlaceholder
      title="How Procurement Works at Yami Naturals"
      subtitle="A transparent, quality-controlled 5-step procurement model built specifically for natural ingredients."
      categoryTag="Operational Workflow"
      overviewCards={[
        {
          icon: '1️⃣',
          title: 'Step 1: Requirement Intake',
          description: 'Submit your material details, volume needs, mesh size, active percentage, and compliance standard via our wizard.'
        },
        {
          icon: '2️⃣',
          title: 'Step 2: Lot Verification & Testing',
          description: 'Our technical sourcing team validates available lots against your assay parameters and provides pre-shipment CoAs.'
        },
        {
          icon: '3️⃣',
          title: 'Step 3: Commercial Proposal',
          description: 'Receive competitive transparent pricing based on current seasonal harvest conditions and freight options.'
        },
        {
          icon: '4️⃣',
          title: 'Step 4: Secure Fulfilment',
          description: 'Materials are packed in certified food-grade packaging with batch documentation, tamper-evident seals, and dispatched.'
        }
      ]}
    />
  );
};
