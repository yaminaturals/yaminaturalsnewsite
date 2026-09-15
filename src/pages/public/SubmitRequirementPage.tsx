import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';
import { generateBreadcrumbSchema } from '../../utils/seoSchemas';
import { Container } from '../../components/ui/Container/Container';
import { requirementService } from '../../services/RequirementService';
import './SubmitRequirementPage.css';

export const SubmitRequirementPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const prefilledProduct = searchParams.get('product') || '';

  // Form Fields State matching Image 2
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');

  const [ingredientName, setIngredientName] = useState(prefilledProduct);
  const [targetQuantity, setTargetQuantity] = useState('25 kg (Standard MOQ)');
  const [dosageForm, setDosageForm] = useState('Standardized Powder');
  const [intendedApplication, setIntendedApplication] = useState('Dietary Supplements');
  const [customRequirements, setCustomRequirements] = useState('');

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedResult, setSubmittedResult] = useState<{ referenceNumber: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (prefilledProduct) {
      setIngredientName(prefilledProduct);
    }
  }, [prefilledProduct]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim() || !companyName.trim() || !email.trim() || !phone.trim() || !country.trim() || !ingredientName.trim()) {
      setErrorMessage('Please fill in all required fields marked with an asterisk (*).');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await requirementService.submitRequirement({
        customerType: 'b2b',
        requirementType: 'herbal-extract',
        productName: ingredientName,
        requiredQuantity: targetQuantity,
        quantityUnit: 'kg',
        applicationUse: `${dosageForm} - ${intendedApplication}`,
        specificationStandard: customRequirements,
        documents: [],
        contact: {
          fullName,
          companyName,
          email,
          phone,
          country,
        },
        additionalNotes: customRequirements,
      });

      setSubmittedResult({ referenceNumber: result.referenceNumber });
      window.scrollTo({ top: 100, behavior: 'smooth' });
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'An error occurred while submitting your requirement. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedResult(null);
    setFullName('');
    setCompanyName('');
    setEmail('');
    setPhone('');
    setCountry('');
    setIngredientName('');
    setTargetQuantity('25 kg (Standard MOQ)');
    setDosageForm('Standardized Powder');
    setIntendedApplication('Dietary Supplements');
    setCustomRequirements('');
  };

  return (
    <div className="rfq-page-wrapper animate-fade-in">
      <SEO
        title="Submit Your Requirement | Get a B2B Quote"
        description="Submit commercial RFQ and custom ingredient specifications for botanical extracts, herbal powders, essential oils, and nutraceutical ingredients with Yami Naturals."
        canonicalPath="/submit-requirement"
        structuredData={generateBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Submit Requirement', url: '/submit-requirement' },
        ])}
      />

      <Container size="default">
        <div className="rfq-container">
          {/* Header Section */}
          <div className="rfq-header">
            <span className="rfq-eyebrow">PROCUREMENT INTAKE</span>
            <h1 className="rfq-title">Submit Your Requirement</h1>
            <p className="rfq-subtitle">
              Connect with Yami Naturals for verified botanical sourcing, volume specifications, Certificates of Analysis, or customized compounding.
            </p>
          </div>

          {/* Success Card */}
          {submittedResult ? (
            <div className="rfq-card rq-success-card animate-scale-in">
              <div className="rfq-success-icon">
                <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h2 className="rfq-success-title">Commercial RFQ Successfully Registered</h2>
              <p className="rfq-success-text">
                Our procurement & technical sourcing desk has received your ingredient requirement. A formal quotation, batch COA documentation, and delivery estimate will be sent to <strong>{email}</strong>.
              </p>

              <div className="rfq-reference-box">
                <span className="rfq-ref-label">YOUR REFERENCE NUMBER</span>
                <span className="rfq-ref-code">{submittedResult.referenceNumber}</span>
              </div>

              <div className="rfq-success-actions">
                <Link to="/products" className="rfq-btn-primary">
                  Explore Product Catalogue
                </Link>
                <button type="button" onClick={handleReset} className="rfq-btn-secondary">
                  Submit Another Requirement
                </button>
              </div>
            </div>
          ) : (
            /* Direct Form Card */
            <div className="rfq-card">
              {errorMessage && (
                <div className="rfq-error-banner" role="alert">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="rfq-form">
                {/* 1. Corporate & Contact Information */}
                <div className="rfq-section">
                  <h2 className="rfq-section-title">1. Corporate & Contact Information</h2>

                  {/* Row 1: Full Name & Company Name */}
                  <div className="rfq-grid rfq-grid-2">
                    <div className="rfq-field">
                      <label htmlFor="fullName" className="rfq-label">
                        FULL NAME <span className="rfq-required">*</span>
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        className="rfq-input"
                        placeholder="e.g. Dr. Michael Vance"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="rfq-field">
                      <label htmlFor="companyName" className="rfq-label">
                        COMPANY / ENTITY NAME <span className="rfq-required">*</span>
                      </label>
                      <input
                        id="companyName"
                        type="text"
                        className="rfq-input"
                        placeholder="e.g. NutraGlobal Pharmaceuticals Ltd"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Row 2: Business Email, Phone, Country */}
                  <div className="rfq-grid rfq-grid-3">
                    <div className="rfq-field">
                      <label htmlFor="email" className="rfq-label">
                        BUSINESS EMAIL <span className="rfq-required">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="rfq-input"
                        placeholder="e.g. m.vance@nutraglobal.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="rfq-field">
                      <label htmlFor="phone" className="rfq-label">
                        PHONE <span className="rfq-required">*</span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        className="rfq-input"
                        placeholder="e.g. +1(555) 234-5678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>

                    <div className="rfq-field">
                      <label htmlFor="country" className="rfq-label">
                        COUNTRY <span className="rfq-required">*</span>
                      </label>
                      <input
                        id="country"
                        type="text"
                        className="rfq-input"
                        placeholder="e.g. United States"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Ingredient Specifications */}
                <div className="rfq-section">
                  <h2 className="rfq-section-title">2. Ingredient Specifications</h2>

                  {/* Row 3: Ingredient Name & Target Quantity */}
                  <div className="rfq-grid rfq-grid-2">
                    <div className="rfq-field">
                      <label htmlFor="ingredientName" className="rfq-label">
                        INGREDIENT / EXTRACT NAME <span className="rfq-required">*</span>
                      </label>
                      <input
                        id="ingredientName"
                        type="text"
                        className="rfq-input"
                        placeholder="e.g. Ashwagandha Extract 5% Withanolides"
                        value={ingredientName}
                        onChange={(e) => setIngredientName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="rfq-field">
                      <label htmlFor="targetQuantity" className="rfq-label">
                        TARGET QUANTITY (STANDARD MOQS APPLY)
                      </label>
                      <div className="rfq-select-wrapper">
                        <select
                          id="targetQuantity"
                          className="rfq-select"
                          value={targetQuantity}
                          onChange={(e) => setTargetQuantity(e.target.value)}
                        >
                          <option value="25 kg (Standard MOQ)">25 kg (Standard MOQ)</option>
                          <option value="50 kg">50 kg</option>
                          <option value="100 kg">100 kg</option>
                          <option value="250 kg">250 kg</option>
                          <option value="500 kg">500 kg</option>
                          <option value="1,000 kg (1 Metric Ton)">1,000 kg (1 Metric Ton)</option>
                          <option value="5,000+ kg (Commercial Volume)">5,000+ kg (Commercial Volume)</option>
                          <option value="Custom / Pilot Batch (<25 kg)">Custom / Pilot Batch (&lt;25 kg)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Row 4: Required Dosage Form & Intended Application */}
                  <div className="rfq-grid rfq-grid-2">
                    <div className="rfq-field">
                      <label htmlFor="dosageForm" className="rfq-label">
                        REQUIRED DOSAGE FORM
                      </label>
                      <div className="rfq-select-wrapper">
                        <select
                          id="dosageForm"
                          className="rfq-select"
                          value={dosageForm}
                          onChange={(e) => setDosageForm(e.target.value)}
                        >
                          <option value="Standardized Powder">Standardized Powder</option>
                          <option value="Liquid Botanical Extract">Liquid Botanical Extract</option>
                          <option value="Raw Whole / Crushed Botanical">Raw Whole / Crushed Botanical</option>
                          <option value="Cold-Pressed / Essential Oil">Cold-Pressed / Essential Oil</option>
                          <option value="Encapsulated / Finished Dosage">Encapsulated / Finished Dosage</option>
                          <option value="Cosmetic Clay Powder">Cosmetic Clay Powder</option>
                          <option value="Custom Compounding / Blend">Custom Compounding / Blend</option>
                        </select>
                      </div>
                    </div>

                    <div className="rfq-field">
                      <label htmlFor="intendedApplication" className="rfq-label">
                        INTENDED APPLICATION
                      </label>
                      <div className="rfq-select-wrapper">
                        <select
                          id="intendedApplication"
                          className="rfq-select"
                          value={intendedApplication}
                          onChange={(e) => setIntendedApplication(e.target.value)}
                        >
                          <option value="Dietary Supplements">Dietary Supplements</option>
                          <option value="Functional Foods & Beverages">Functional Foods & Beverages</option>
                          <option value="Cosmetics & Personal Care">Cosmetics & Personal Care</option>
                          <option value="Ayurvedic & Herbal Formulations">Ayurvedic & Herbal Formulations</option>
                          <option value="Pharmaceutical & API Intermediates">Pharmaceutical & API Intermediates</option>
                          <option value="Animal Nutrition & Pet Care">Animal Nutrition & Pet Care</option>
                          <option value="Other Commercial Formulation">Other Commercial Formulation</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Row 5: Target Assay & Custom Requirements (Optional) */}
                  <div className="rfq-field">
                    <label htmlFor="customRequirements" className="rfq-label">
                      TARGET ASSAY & CUSTOM REQUIREMENTS (OPTIONAL)
                    </label>
                    <textarea
                      id="customRequirements"
                      className="rfq-textarea"
                      rows={4}
                      placeholder="Include any specific requirements for assay method (HPLC/UV), heavy metal limits (USP <2232>), or desired mesh size..."
                      value={customRequirements}
                      onChange={(e) => setCustomRequirements(e.target.value)}
                    />
                  </div>
                </div>

                {/* Footer Bar: NDA note + Submit Button */}
                <div className="rfq-footer">
                  <div className="rfq-nda-badge">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rfq-shield-icon">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <polyline points="9 12 11 14 15 10" />
                    </svg>
                    <span>All information is protected under our B2B NDA.</span>
                  </div>

                  <button
                    type="submit"
                    className="rfq-submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="rfq-spinner" />
                        <span>PROCESSING...</span>
                      </>
                    ) : (
                      <>
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="22" y1="2" x2="11" y2="13" />
                          <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                        <span>SUBMIT COMMERCIAL RFQ</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

