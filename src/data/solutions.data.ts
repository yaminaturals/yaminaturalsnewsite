export interface SolutionItem {
  id: 'b2b' | 'b2c';
  eyebrow: string;
  badgeLabel: string;
  title: string;
  description: string;
  supportingPoints: string[];
  ctaText: string;
  ctaLink: string;
  ctaVariant: 'primary' | 'outline';
  image: {
    src: string;
    alt: string;
    caption: string;
  };
  theme: {
    accentColor: string;
    tagline: string;
  };
}

export interface SolutionsContent {
  eyebrow: string;
  heading: string;
  headingEmphasis?: string;
  supportingText: string;
  solutions: SolutionItem[];
}

export const solutionsContent: SolutionsContent = {
  eyebrow: 'WHO WE SUPPORT',
  heading: 'Solutions for Different',
  headingEmphasis: 'Sourcing Needs.',
  supportingText:
    "Whether you're sourcing for a business or looking for a natural product for your own requirements, choose the path that best matches your needs.",
  solutions: [
    {
      id: 'b2b',
      eyebrow: 'B2B',
      badgeLabel: 'Enterprise & Formulation',
      title: 'For Businesses & Procurement Teams',
      description:
        'Explore botanical ingredients, nutraceutical materials and product options for business, formulation and procurement requirements.',
      supportingPoints: [
        'Ingredient sourcing',
        'Product requirements',
        'Formulation support',
      ],
      ctaText: 'Explore B2B Solutions',
      ctaLink: '/b2b-solutions',
      ctaVariant: 'primary',
      image: {
        src: '/images/categories/nutraceutical-ingredients.jpg',
        alt: 'Botanical extracts and standardized nutraceutical ingredients for formulation and commercial procurement',
        caption: 'Specification-grade botanical materials',
      },
      theme: {
        accentColor: 'var(--color-primary-green)',
        tagline: 'Formulation & Commercial Procurement',
      },
    },
    {
      id: 'b2c',
      eyebrow: 'B2C',
      badgeLabel: 'Personal & Practitioner',
      title: 'For Individual Requirements',
      description:
        'Explore natural products and ingredient options for personal requirements and individual product needs.',
      supportingPoints: [
        'Natural product exploration',
        'Individual requirements',
        'Product guidance',
      ],
      ctaText: 'Explore B2C Solutions',
      ctaLink: '/b2c-solutions',
      ctaVariant: 'outline',
      image: {
        src: '/images/categories/herbal-powders.jpg',
        alt: 'Natural herbs, botanical powders and personal wellness ingredients',
        caption: 'Natural wellness and personal botanical items',
      },
      theme: {
        accentColor: 'var(--color-amber-accent)',
        tagline: 'Individual & Small Volume Needs',
      },
    },
  ],
};
