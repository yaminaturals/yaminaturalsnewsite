import React from 'react';
import { EditorialHeroSection } from '../../components/sections/EditorialHeroSection/EditorialHeroSection';
import { ProductCategoriesSection } from '../../components/sections/ProductCategoriesSection/ProductCategoriesSection';
import { ProcurementSection } from '../../components/sections/ProcurementSection';
import { RequirementCtaSection } from '../../components/sections/RequirementCtaSection';
import { WhyYamiSection } from '../../components/sections/WhyYamiSection';
import { SolutionsSection } from '../../components/sections/SolutionsSection';
import { HowItWorksSection } from '../../components/sections/HowItWorksSection';
import { SpecificationDocumentationSection } from '../../components/sections/SpecificationDocumentationSection';
import { FAQSection } from '../../components/sections/FAQSection';
import { FinalCTASection } from '../../components/sections/FinalCTASection';
import './HomePage.css';

export const HomePage: React.FC = () => {
  return (
    <div className="home-page animate-fade-in">
      {/* 1. HERO SECTION (Brand Introduction & Sourcing Vision) */}
      <EditorialHeroSection />

      {/* 2. PRODUCT CATEGORIES (Editorial Natural Catalogue) */}
      <ProductCategoriesSection />

      {/* 4. PROCUREMENT / SOURCING SECTION (Step 5D: Tell Us What You Need) */}
      <ProcurementSection />

      {/* 5. HOMEPAGE REQUIREMENT CTA (Step 5E: Primary Conversion Section) */}
      <RequirementCtaSection />

      {/* 6. WHY YAMI NATURALS (Step 5F: Requirement-First Procurement Approach) */}
      <WhyYamiSection />

      {/* 7. B2B & B2C SOLUTIONS (Step 5G: Dedicated Editorial Pathways) */}
      <SolutionsSection />

      {/* 8. HOW IT WORKS (Step 5H: Customer Journey & Entry Paths) */}
      <HowItWorksSection />

      {/* 9. SPECIFICATION & DOCUMENTATION (Step 5I: Requirement Details & Context) */}
      <SpecificationDocumentationSection />

      {/* 10. FAQ SECTION (Step 5K: Common Questions & Sourcing Guidance) */}
      <FAQSection />

      {/* 11. FINAL CONVERSION CTA (Step 5L: Tell Us What You Need) */}
      <FinalCTASection />
    </div>
  );
};
