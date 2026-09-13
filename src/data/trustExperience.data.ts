export interface TrustPrincipleItem {
  number: string;
  title: string;
  description: string;
  iconType: 'requirement' | 'communication' | 'category' | 'process';
}

export interface TrustExperienceContent {
  eyebrow: string;
  heading: string;
  headingEmphasis?: string;
  supportingText: string;
  principles: TrustPrincipleItem[];
  statement: {
    highlight: string;
    supporting: string;
  };
  ctas: {
    primary: {
      text: string;
      link: string;
    };
    secondary: {
      text: string;
      link: string;
    };
  };
}

export const trustExperienceContent: TrustExperienceContent = {
  eyebrow: 'TRUST & EXPERIENCE',
  heading: 'A Clearer Way to Start',
  headingEmphasis: 'a Natural Sourcing Conversation.',
  supportingText:
    'Good sourcing starts with understanding the requirement. Yami Naturals helps organize the conversation around the product, application, specifications and procurement needs that matter to your enquiry.',
  principles: [
    {
      number: '01',
      title: 'REQUIREMENT FIRST',
      description:
        'Start with what you actually need, including the product, ingredient, application or formulation requirement.',
      iconType: 'requirement',
    },
    {
      number: '02',
      title: 'CLEAR COMMUNICATION',
      description:
        'Share the details that matter to your requirement so the sourcing discussion can stay focused and useful.',
      iconType: 'communication',
    },
    {
      number: '03',
      title: 'CATEGORY GUIDANCE',
      description:
        'Explore relevant herbal, botanical, nutraceutical, oil, clay and capsule categories based on your requirement.',
      iconType: 'category',
    },
    {
      number: '04',
      title: 'ENQUIRY-LED PROCESS',
      description:
        'Move from product discovery and requirement discussion toward an appropriate sourcing or fulfilment conversation.',
      iconType: 'process',
    },
  ],
  statement: {
    highlight: 'Your requirement sets the direction. We help organize the path.',
    supporting:
      'Explore products, share your requirement, and discuss the details relevant to your sourcing enquiry.',
  },
  ctas: {
    primary: {
      text: 'Submit Your Requirement',
      link: '/submit-requirement',
    },
    secondary: {
      text: 'Explore Products',
      link: '/products',
    },
  },
};
