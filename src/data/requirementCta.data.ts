export interface RequirementCtaContent {
  eyebrow: string;
  headingPart1: string;
  headingPart2: string;
  supportingText: string;
  guidanceLine: string;
  primaryCta: {
    label: string;
    path: string;
  };
  secondaryCta: {
    label: string;
    path: string;
  };
}

export const requirementCtaContent: RequirementCtaContent = {
  eyebrow: 'READY TO SOURCE?',
  headingPart1: 'Have a Specific Material',
  headingPart2: 'or Volume Requirement?',
  supportingText:
    "Whether you're looking for a standard botanical ingredient or a custom-formulated product, share your requirement with us.",
  guidanceLine:
    "Can't find exactly what you're looking for? Tell us your requirement.",
  primaryCta: {
    label: 'Submit Your Requirement',
    path: '/submit-requirement',
  },
  secondaryCta: {
    label: 'Explore Products',
    path: '/products',
  },
};
