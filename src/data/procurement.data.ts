export interface ProcurementCapabilityItem {
  id: string;
  number: string;
  title: string;
  description: string;
  iconName: 'discovery' | 'matching' | 'specification' | 'sourcing';
}

export interface ProcurementSectionContent {
  eyebrow: string;
  heading: string;
  headingHighlight?: string;
  supportingText: string;
  noteText?: string;
  directionalCta: {
    label: string;
    path: string;
  };
  secondaryLink?: {
    label: string;
    path: string;
  };
  capabilities: ProcurementCapabilityItem[];
}

export const procurementContent: ProcurementSectionContent = {
  eyebrow: 'PROCUREMENT SUPPORT',
  heading: 'What We Help',
  headingHighlight: 'You Source.',
  supportingText:
    'Explore product categories and share your requirement so the appropriate sourcing path can be discussed around the product, application and specifications that matter to you.',
  noteText:
    'Whether you have an established ingredient specification or an early formulation requirement, our sourcing desk assists in evaluating viable product paths.',
  directionalCta: {
    label: 'Discuss Your Requirement',
    path: '/submit-requirement',
  },
  secondaryLink: {
    label: 'Browse Product Catalogue',
    path: '/products',
  },
  capabilities: [
    {
      id: 'cap-product-discovery',
      number: '01',
      title: 'PRODUCT DISCOVERY',
      description:
        'Explore relevant product and ingredient categories based on your requirement.',
      iconName: 'discovery',
    },
    {
      id: 'cap-requirement-matching',
      number: '02',
      title: 'REQUIREMENT MATCHING',
      description:
        'Share the product, ingredient or formulation details you are looking for.',
      iconName: 'matching',
    },
    {
      id: 'cap-specification-discussion',
      number: '03',
      title: 'SPECIFICATION DISCUSSION',
      description:
        'Discuss the specifications and application details relevant to your requirement.',
      iconName: 'specification',
    },
    {
      id: 'cap-sourcing-path',
      number: '04',
      title: 'SOURCING PATH',
      description:
        'Move toward the appropriate sourcing or fulfilment discussion.',
      iconName: 'sourcing',
    },
  ],
};
