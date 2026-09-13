export interface FinalCTAContent {
  eyebrow: string;
  heading: string;
  headingEmphasis?: string;
  supportingText: string;
  primaryCta: {
    text: string;
    link: string;
  };
  secondaryCta: {
    text: string;
    link: string;
  };
  microcopy: string;
  pathwayLinks: Array<{
    label: string;
    link: string;
  }>;
}

export const finalCtaContent: FinalCTAContent = {
  eyebrow: 'READY TO START?',
  heading: 'Tell Us What',
  headingEmphasis: 'You Need.',
  supportingText:
    'Share your product, ingredient or formulation requirement and start a focused sourcing conversation with Yami Naturals.',
  primaryCta: {
    text: 'Submit Your Requirement',
    link: '/submit-requirement',
  },
  secondaryCta: {
    text: 'Explore Products',
    link: '/products',
  },
  microcopy:
    'Have a detailed specification? You can include it with your requirement.',
  pathwayLinks: [
    {
      label: 'For Businesses',
      link: '/b2b-solutions',
    },
    {
      label: 'For Individual Requirements',
      link: '/b2c-solutions',
    },
  ],
};
