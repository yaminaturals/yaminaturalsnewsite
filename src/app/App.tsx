import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from '../components/layout/PublicLayout/PublicLayout';
import { AdminLayout } from '../components/layout/AdminLayout/AdminLayout';

// Public Pages
import { HomePage } from '../pages/public/HomePage';
import { AboutPage } from '../pages/public/AboutPage';
import { ProductsPage } from '../pages/public/ProductsPage';
import { ProductDetailPage } from '../pages/public/ProductDetailPage';
import { ServicesPage } from '../pages/public/ServicesPage';
import { B2BSolutionsPage } from '../pages/public/B2BSolutionsPage';
import { B2CSolutionsPage } from '../pages/public/B2CSolutionsPage';
import { HowItWorksPage } from '../pages/public/HowItWorksPage';
import { SubmitRequirementPage } from '../pages/public/SubmitRequirementPage';
import { FaqPage } from '../pages/public/FaqPage';
import { ContactPage } from '../pages/public/ContactPage';
import { PartnershipPage } from '../pages/public/PartnershipPage';
import { WhyYamiNaturalsPage } from '../pages/public/WhyYamiNaturalsPage';
import { PrivacyPolicyPage } from '../pages/public/PrivacyPolicyPage';
import { TermsConditionsPage } from '../pages/public/TermsConditionsPage';
import { NotFoundPage } from '../pages/public/NotFoundPage';

// Admin Pages
import { AdminLoginPage } from '../pages/admin/AdminLoginPage';
import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { AdminProducts } from '../pages/admin/AdminProducts';
import { AdminProductAdd } from '../pages/admin/AdminProductAdd';
import { AdminCategories } from '../pages/admin/AdminCategories';
import { AdminRequirements } from '../pages/admin/AdminRequirements';
import { AdminLeads } from '../pages/admin/AdminLeads';
import { AdminContent } from '../pages/admin/AdminContent';
import { AdminMedia } from '../pages/admin/AdminMedia';
import { AdminSettings } from '../pages/admin/AdminSettings';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC WEBSITE ROUTES */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:slug" element={<ProductDetailPage />} />
          <Route path="/partnership" element={<PartnershipPage />} />
          <Route path="/why-yami-naturals" element={<WhyYamiNaturalsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/b2b-solutions" element={<B2BSolutionsPage />} />
          <Route path="/b2c-solutions" element={<B2CSolutionsPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/submit-requirement" element={<SubmitRequirementPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-conditions" element={<TermsConditionsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* ADMIN LOGIN (Stand-alone without admin shell) */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* PROTECTED ADMIN PORTAL */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/add" element={<AdminProductAdd />} />
          <Route path="products/edit" element={<AdminProducts />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="requirements" element={<AdminRequirements />} />
          <Route path="leads" element={<AdminLeads />} />
          <Route path="content" element={<AdminContent />} />
          <Route path="media" element={<AdminMedia />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
