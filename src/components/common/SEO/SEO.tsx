import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { siteConfig } from '../../../config/siteConfig';
import { getFullUrl } from '../../../utils/seoSchemas';

export interface SEOProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  ogType?: 'website' | 'article' | 'product';
  ogImage?: string;
  noindex?: boolean;
  structuredData?: object | object[];
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalPath,
  ogType = 'website',
  ogImage,
  noindex = false,
  structuredData,
}) => {
  const location = useLocation();

  const formattedTitle = title
    ? `${title} | ${siteConfig.brand.name}`
    : siteConfig.seo.defaultTitle;

  const metaDescription = description || siteConfig.seo.defaultDescription;
  const canonicalUrl = getFullUrl(canonicalPath || location.pathname);
  const socialImage = getFullUrl(ogImage || siteConfig.brand.defaultOgImage);
  const robotsDirective = noindex ? 'noindex, nofollow' : 'index, follow';

  useEffect(() => {
    // 1. Update Title
    document.title = formattedTitle;

    // Helper to update or create meta tags
    const setMetaTag = (selector: string, attribute: 'name' | 'property', attrValue: string, content: string) => {
      let element = document.querySelector(selector) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Primary Meta Tags
    setMetaTag('meta[name="description"]', 'name', 'description', metaDescription);
    setMetaTag('meta[name="robots"]', 'name', 'robots', robotsDirective);

    // 3. Canonical Link Tag
    let canonicalTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', canonicalUrl);

    // 4. Open Graph Tags
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', formattedTitle);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', metaDescription);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', ogType);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', socialImage);
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', siteConfig.brand.name);

    // 5. Twitter Card Tags
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', siteConfig.seo.twitterCard);
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', formattedTitle);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', metaDescription);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', socialImage);

    // 6. JSON-LD Structured Data
    const scriptId = 'yami-structured-data';
    let scriptElement = document.getElementById(scriptId) as HTMLScriptElement | null;
    
    if (structuredData) {
      if (!scriptElement) {
        scriptElement = document.createElement('script');
        scriptElement.id = scriptId;
        scriptElement.type = 'application/ld+json';
        document.head.appendChild(scriptElement);
      }
      const dataToInject = Array.isArray(structuredData) ? structuredData : [structuredData];
      scriptElement.textContent = JSON.stringify(
        dataToInject.length === 1 ? dataToInject[0] : dataToInject
      );
    } else if (scriptElement) {
      scriptElement.remove();
    }

    return () => {
      // Optional cleanup if needed
    };
  }, [formattedTitle, metaDescription, canonicalUrl, socialImage, robotsDirective, ogType, structuredData]);

  return null;
};
