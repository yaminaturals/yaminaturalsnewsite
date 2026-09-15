/**
 * Site-wide configuration and placeholder registry for Yami Naturals.
 * In accordance with client specifications, any factual details not yet provided
 * by the client are explicitly marked with placeholders rather than assumed.
 */
export const siteConfig = {
  siteUrl: import.meta.env.VITE_SITE_URL || 'https://yaminaturals.com',
  brand: {
    name: 'Yami Naturals',
    legalName: 'Yami Naturals Pvt. Ltd.',
    tagline: 'Herbal & Natural Products Procurement Platform',
    mission: 'Bridging certified botanical sourcing and precision product support for B2B and B2C clients.',
    logoPath: '/logo.png',
    defaultOgImage: '/images/hero-botanicals.jpg',
  },
  seo: {
    titleTemplate: '%s | Yami Naturals',
    defaultTitle: 'Yami Naturals | Herbal & Natural Products Procurement',
    defaultDescription: 'Procurement and product-support platform for verified herbal powders, standardized extracts, natural carrier oils, cosmetic clays, and nutraceutical raw ingredients for B2B & B2C.',
    twitterCard: 'summary_large_image',
  },
  contact: {
    // Official client details to be confirmed
    email: '[Client to provide official contact email]',
    phone: '[Client to provide official phone number]',
    whatsapp: '[Client to provide WhatsApp number]',
    address: '[Client to provide registered office / warehouse address]',
    businessHours: '[Client to provide operational hours]',
  },
  social: {
    linkedin: '#',
    instagram: '#',
    twitter: '#',
  },
  primaryCTAs: {
    submitRequirement: 'Submit Your Requirement',
    exploreProducts: 'Explore Products',
    talkToUs: 'Talk to Us',
  },
  regulatoryNotes: {
    disclaimer: 'Product specifications and Certificates of Analysis (CoA) are supplied for technical evaluation. [Client to provide formal regulatory notice].',
  }
};
