export interface ProcurementStageItem {
  id: string;
  step: string;
  number: string;
  title: string;
  description: string;
  iconName: 'requirement' | 'matching' | 'specification' | 'sourcing';
}

export interface ProcurementSectionContent {
  eyebrow: string;
  heading: string;
  headingHighlight: string;
  supportingText: string;
  noteText: string;
  primaryCta: {
    label: string;
    path: string;
  };
  secondaryCta: {
    label: string;
    path: string;
  };
  stages: ProcurementStageItem[];
}

export const procurementContent: ProcurementSectionContent = {
  eyebrow: 'PROCUREMENT SUPPORT',
  heading: 'Tell Us What You Need.',
  headingHighlight: "We'll Help You Find the Right Path.",
  supportingText:
    'Share your product, ingredient or formulation requirement and our sourcing desk can help you identify the appropriate category and procurement route.',
  noteText:
    "You don't have to know exactly what to buy. Tell us your requirement and we can help identify the appropriate product/category and sourcing path.",
  primaryCta: {
    label: 'Submit Your Requirement',
    path: '/submit-requirement',
  },
  secondaryCta: {
    label: 'Explore Products',
    path: '/products',
  },
  stages: [
    {
      id: 'procurement-stage-requirement',
      step: 'Stage 01',
      number: '01',
      title: 'Requirement',
      description: 'Tell us what product or ingredient you need.',
      iconName: 'requirement',
    },
    {
      id: 'procurement-stage-matching',
      step: 'Stage 02',
      number: '02',
      title: 'Product Matching',
      description: 'Identify relevant product or category options.',
      iconName: 'matching',
    },
    {
      id: 'procurement-stage-specification',
      step: 'Stage 03',
      number: '03',
      title: 'Specification',
      description: 'Discuss the required specifications and application.',
      iconName: 'specification',
    },
    {
      id: 'procurement-stage-sourcing',
      step: 'Stage 04',
      number: '04',
      title: 'Sourcing',
      description: 'Proceed toward the appropriate sourcing/fulfilment route.',
      iconName: 'sourcing',
    },
  ],
};
