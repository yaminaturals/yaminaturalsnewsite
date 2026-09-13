export interface WhyYamiPrincipleItem {
  id: string;
  number: string;
  title: string;
  description: string;
  iconType: 'requirement-led' | 'category-guidance' | 'specification-discussion' | 'procurement-support';
}

export interface WhyYamiContent {
  eyebrow: string;
  heading: string;
  headingEmphasis?: string;
  supportingText: string;
  principles: WhyYamiPrincipleItem[];
  supportingLink?: {
    label: string;
    path: string;
  };
}

export const whyYamiContent: WhyYamiContent = {
  eyebrow: 'WHY YAMI NATURALS',
  heading: 'A Requirement-First Approach',
  headingEmphasis: 'to Natural Sourcing.',
  supportingText:
    'From identifying suitable product categories to discussing specifications, Yami Naturals helps simplify the path from a requirement to a sourcing enquiry.',
  principles: [
    {
      id: 'principle-requirement-led',
      number: '01',
      title: 'REQUIREMENT-LED',
      description:
        'Start with what you actually need rather than forcing your requirement into a fixed product list.',
      iconType: 'requirement-led',
    },
    {
      id: 'principle-category-guidance',
      number: '02',
      title: 'CATEGORY GUIDANCE',
      description:
        'Explore relevant botanical, nutraceutical, oil, clay and capsule categories based on your requirement.',
      iconType: 'category-guidance',
    },
    {
      id: 'principle-specification-discussion',
      number: '03',
      title: 'SPECIFICATION DISCUSSION',
      description:
        'Share the product, ingredient or formulation specifications that matter to your application.',
      iconType: 'specification-discussion',
    },
    {
      id: 'principle-procurement-support',
      number: '04',
      title: 'PROCUREMENT SUPPORT',
      description:
        'Move from product discovery and requirement discussion toward an appropriate sourcing enquiry.',
      iconType: 'procurement-support',
    },
  ],
  supportingLink: {
    label: 'Explore Our Approach',
    path: '/submit-requirement',
  },
};
