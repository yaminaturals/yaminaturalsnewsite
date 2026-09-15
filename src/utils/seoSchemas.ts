import { siteConfig } from '../config/siteConfig';
import { Product } from '../types';
import { FAQItemData } from '../data/faq.data';

/**
 * Builds the canonical full URL from a relative or absolute path.
 */
export const getFullUrl = (path: string = ''): string => {
  const base = siteConfig.siteUrl.replace(/\/+$/, '');
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
};

/**
 * Generates Organization Schema JSON-LD
 */
export const generateOrganizationSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.brand.name,
    legalName: siteConfig.brand.legalName,
    url: siteConfig.siteUrl,
    logo: getFullUrl(siteConfig.brand.logoPath),
    description: siteConfig.brand.mission,
  };
};

/**
 * Generates WebSite Schema JSON-LD with Sitelinks SearchBox
 */
export const generateWebSiteSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.brand.name,
    url: siteConfig.siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${getFullUrl('/products')}?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
};

export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Generates BreadcrumbList Schema JSON-LD
 */
export const generateBreadcrumbSchema = (items: BreadcrumbItem[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: getFullUrl(item.url),
    })),
  };
};

/**
 * Generates Product Schema JSON-LD using strictly verified data without fake reviews/ratings.
 */
export const generateProductSchema = (product: Product) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription || product.fullDescription,
    image: product.primaryImage ? [getFullUrl(product.primaryImage)] : [getFullUrl(siteConfig.brand.defaultOgImage)],
    category: product.categoryName,
    brand: {
      '@type': 'Brand',
      name: siteConfig.brand.name,
    },
    offers: {
      '@type': 'Offer',
      availability: product.availability === 'in-stock' 
        ? 'https://schema.org/InStock' 
        : 'https://schema.org/PreOrder',
      priceCurrency: 'USD',
      price: '0.00', // Sourcing platform with quotation on request
      priceValidUntil: '2027-12-31',
      url: getFullUrl(`/products/${product.slug}`),
    },
  };
};

/**
 * Generates FAQPage Schema JSON-LD from verified FAQ content
 */
export const generateFAQSchema = (faqItems: FAQItemData[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
};
