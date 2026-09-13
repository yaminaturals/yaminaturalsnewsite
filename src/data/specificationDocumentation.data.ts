export interface SpecificationAreaItem {
  number: string;
  title: string;
  description: string;
  iconType: 'identity' | 'specifications' | 'application' | 'documentation';
}

export interface SpecificationDocumentationContent {
  eyebrow: string;
  heading: string;
  headingEmphasis?: string;
  supportingText: string;
  areas: SpecificationAreaItem[];
  callout: {
    text: string;
    ctaText: string;
    ctaLink: string;
  };
}

export const specificationDocumentationContent: SpecificationDocumentationContent = {
  eyebrow: 'SPECIFICATION & DOCUMENTATION',
  heading: 'The Details That Shape',
  headingEmphasis: 'a Sourcing Requirement.',
  supportingText:
    'Product identity, application, specifications and documentation requirements can all be part of the discussion when evaluating a sourcing requirement.',
  areas: [
    {
      number: '01',
      title: 'PRODUCT IDENTITY',
      description:
        'Product name, ingredient type, botanical information or other identifying details relevant to the requirement.',
      iconType: 'identity',
    },
    {
      number: '02',
      title: 'SPECIFICATIONS',
      description:
        'Share the specifications or parameters that matter to your intended application.',
      iconType: 'specifications',
    },
    {
      number: '03',
      title: 'APPLICATION',
      description:
        'Tell us how the ingredient or product will be used so the requirement can be understood in context.',
      iconType: 'application',
    },
    {
      number: '04',
      title: 'DOCUMENTATION',
      description:
        'Identify any documentation requirements relevant to your procurement process, where applicable.',
      iconType: 'documentation',
    },
  ],
  callout: {
    text: 'Have a detailed specification sheet? You can include it with your requirement.',
    ctaText: 'Submit Your Requirement',
    ctaLink: '/submit-requirement',
  },
};
