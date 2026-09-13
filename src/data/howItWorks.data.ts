export interface HowItWorksStepItem {
  number: string;
  title: string;
  description: string;
  iconType: 'explore' | 'share' | 'specifications' | 'enquiry';
}

export interface HowItWorksChoice {
  id: 'explore' | 'requirement';
  badge: string;
  title: string;
  text: string;
  ctaText: string;
  ctaLink: string;
  variant: 'accent' | 'outline' | 'primary';
  isPrimary: boolean;
}

export interface HowItWorksContent {
  eyebrow: string;
  heading: string;
  headingEmphasis?: string;
  supportingText: string;
  steps: HowItWorksStepItem[];
  choicesHeading: string;
  choicesSubtext: string;
  choices: HowItWorksChoice[];
}

export const howItWorksContent: HowItWorksContent = {
  eyebrow: 'HOW IT WORKS',
  heading: 'From Requirement to',
  headingEmphasis: 'Sourcing Enquiry.',
  supportingText:
    'Explore our product categories or tell us what you need. From there, we help organize the information needed for the next step.',
  steps: [
    {
      number: '01',
      title: 'EXPLORE',
      description:
        'Browse product categories and discover relevant natural ingredients or products.',
      iconType: 'explore',
    },
    {
      number: '02',
      title: 'SHARE YOUR REQUIREMENT',
      description:
        'Tell us what product, ingredient or formulation you are looking for.',
      iconType: 'share',
    },
    {
      number: '03',
      title: 'DISCUSS SPECIFICATIONS',
      description:
        'Share the specifications, application or other details relevant to your requirement.',
      iconType: 'specifications',
    },
    {
      number: '04',
      title: 'MOVE TO ENQUIRY',
      description:
        'Proceed with the appropriate sourcing or fulfilment discussion based on the requirement.',
      iconType: 'enquiry',
    },
  ],
  choicesHeading: 'START WHERE YOU ARE',
  choicesSubtext:
    'Select the path that matches your current stage in procurement or exploration.',
  choices: [
    {
      id: 'explore',
      badge: 'PATH A',
      title: 'Explore Products',
      text: "I already know what type of product I'm looking for.",
      ctaText: 'Explore Products',
      ctaLink: '/products',
      variant: 'outline',
      isPrimary: false,
    },
    {
      id: 'requirement',
      badge: 'PATH B • RECOMMENDED',
      title: 'Submit Your Requirement',
      text: 'I have a specific requirement and need help finding the right path.',
      ctaText: 'Submit Your Requirement',
      ctaLink: '/submit-requirement',
      variant: 'accent',
      isPrimary: true,
    },
  ],
};
