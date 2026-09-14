import React from 'react';
import { EditorialHeroSection } from '../../components/sections/EditorialHeroSection/EditorialHeroSection';
import { ProductCategoriesSection } from '../../components/sections/ProductCategoriesSection/ProductCategoriesSection';
import { WhyYamiSection } from '../../components/sections/WhyYamiSection';
import { SpecificationDocumentationSection } from '../../components/sections/SpecificationDocumentationSection';
import { FAQSection } from '../../components/sections/FAQSection';
import './HomePage.css';

export const HomePage: React.FC = () => {
  return (
    <div className="home-page animate-fade-in">
      {/* 1. HERO SECTION (Brand Introduction & Sourcing Vision) */}
      <EditorialHeroSection />

      {/* 2. PRODUCT CATEGORIES (Editorial Natural Catalogue & Marquee) */}
      <ProductCategoriesSection />

      {/* 3. WHY YAMI NATURALS (Step 5F: Requirement-First Procurement Approach) */}
      <WhyYamiSection />

      {/* 4. SPECIFICATION & DOCUMENTATION (Step 5I: Requirement Details & Context) */}
      <SpecificationDocumentationSection />

      {/* 5. FAQ SECTION (Step 5K: Common Questions & Sourcing Guidance) */}
      <FAQSection />
    </div>
  );
};
