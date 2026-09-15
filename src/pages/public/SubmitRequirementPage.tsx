import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';
import { generateBreadcrumbSchema } from '../../utils/seoSchemas';
import { Container } from '../../components/ui/Container/Container';
import { requirementService } from '../../services/RequirementService';
import { productService } from '../../services/ProductService';
import './SubmitRequirementPage.css';

const DEFAULT_PRODUCTS = [
  'Ashwagandha Root Extract (Withania somnifera)',
  'Curcumin Extract 95% (Curcuma longa)',
  'Boswellia Serrata Extract (Boswellic Acids)',
  'Moringa Leaf Powder (Moringa oleifera)',
  'Spirulina Powder (Arthrospira platensis)',
  'French Green Clay Powder (Montmorillonite)',
  'Rosemary Essential Oil (Rosmarinus officinalis)',
  'Bacopa Monnieri / Brahmi Extract',
  'Shatavari Root Extract (Asparagus racemosus)',
  'Neem Leaf Extract & Powder (Azadirachta indica)',
  'Triphala Extract / Powder',
  'Tulsi / Holy Basil Extract (Ocimum sanctum)',
  'Licorice Root / Mulethi Extract (Glycyrrhiza glabra)',
  'Green Tea Extract (EGCG 50%)',
  'Kaolin Clay Ultra-Pure',
  'Bentonite Clay Cosmetic Grade',
  'Tea Tree Essential Oil',
  'Lavender Essential Oil',
  'Eucalyptus Essential Oil',
  'Black Seed / Nigella Sativa Oil',
  'Shilajit Purified Resin & Powder',
  'Ginger Root Extract (Gingerols)',
  'Fenugreek Extract (Trigonella foenum-graecum)',
  'Amla / Indian Gooseberry Extract',
  'Garcinia Cambogia Extract (HCA 60%)',
  'Safed Musli Extract',
  'Guduchi / Giloy Extract',
  'Tribulus Terrestris Extract',
  'Senna Leaf Extract',
  'Hibiscus Flower Powder & Extract'
];

export const SubmitRequirementPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const prefilledProduct = searchParams.get('product') || '';

  // Form Fields State
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');

  // Ingredients State (Multi-select + Custom typing)
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [ingredientInput, setIngredientInput] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [availableProducts, setAvailableProducts] = useState<string[]>(DEFAULT_PRODUCTS);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [targetQuantity, setTargetQuantity] = useState('25 kg (Standard MOQ)');
  const [customRequirements, setCustomRequirements] = useState('');

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedResult, setSubmittedResult] = useState<{ referenceNumber: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch products from ProductService on mount
  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const prods = await productService.getProducts();
        if (prods && prods.length > 0) {
          const names = prods.map(p => p.name).filter(Boolean);
          const combined = Array.from(new Set([...names, ...DEFAULT_PRODUCTS]));
          setAvailableProducts(combined);
        }
      } catch {
        setAvailableProducts(DEFAULT_PRODUCTS);
      }
    };
    fetchCatalog();
  }, []);

  // Prepopulate if query param exists
  useEffect(() => {
    if (prefilledProduct && !selectedIngredients.includes(prefilledProduct)) {
      setSelectedIngredients([prefilledProduct]);
    }
  }, [prefilledProduct]);

  // Click outside listener for dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Add an ingredient
  const handleAddIngredient = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    if (!selectedIngredients.includes(trimmed)) {
      setSelectedIngredients(prev => [...prev, trimmed]);
    }
    setIngredientInput('');
    setIsDropdownOpen(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Remove an ingredient
  const handleRemoveIngredient = (nameToRemove: string) => {
    setSelectedIngredients(prev => prev.filter(name => name !== nameToRemove));
  };

  // Toggle selection
  const handleToggleIngredient = (name: string) => {
    if (selectedIngredients.includes(name)) {
      handleRemoveIngredient(name);
    } else {
      setSelectedIngredients(prev => [...prev, name]);
    }
    setIngredientInput('');
  };

  // Handle keydown in input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (ingredientInput.trim()) {
        handleAddIngredient(ingredientInput);
      }
    } else if (e.key === 'Backspace' && !ingredientInput && selectedIngredients.length > 0) {
      // Remove last tag when backspace is pressed on empty input
      handleRemoveIngredient(selectedIngredients[selectedIngredients.length - 1]);
    }
  };

  // Filter products based on search input
  const filteredProducts = availableProducts.filter(p =>
    p.toLowerCase().includes(ingredientInput.toLowerCase().trim())
  );

  const showCustomOption = ingredientInput.trim().length > 0 && 
    !availableProducts.some(p => p.toLowerCase() === ingredientInput.trim().toLowerCase()) &&
    !selectedIngredients.includes(ingredientInput.trim());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (selectedIngredients.length === 0 && !ingredientInput.trim()) {
      setErrorMessage('Please select or enter at least one ingredient name.');
      return;
    }

    // Auto-add any typed text if not added yet
    const finalIngredients = [...selectedIngredients];
    if (ingredientInput.trim() && !finalIngredients.includes(ingredientInput.trim())) {
      finalIngredients.push(ingredientInput.trim());
    }

    if (!fullName.trim() || !companyName.trim() || !email.trim() || !phone.trim() || !country.trim() || finalIngredients.length === 0) {
      setErrorMessage('Please fill in all required fields marked with an asterisk (*).');
      return;
    }

    setIsSubmitting(true);

    try {
      const combinedIngredientNames = finalIngredients.join(', ');

      const result = await requirementService.submitRequirement({
        customerType: 'b2b',
        requirementType: 'herbal-extract',
        productName: combinedIngredientNames,
        requiredQuantity: targetQuantity,
        quantityUnit: 'kg',
        applicationUse: 'Commercial Bulk Procurement',
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
    setSelectedIngredients([]);
    setIngredientInput('');
    setTargetQuantity('25 kg (Standard MOQ)');
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

                  {/* Row: Ingredient Name (Multi-select / Custom) & Target Quantity */}
                  <div className="rfq-grid rfq-grid-2">
                    <div className="rfq-field">
                      <label className="rfq-label">
                        INGREDIENT NAME <span className="rfq-required">*</span>
                      </label>

                      {/* Multi-Select Combobox Container */}
                      <div className="rfq-combobox-wrapper" ref={dropdownRef}>
                        <div 
                          className={`rfq-combobox-box ${isDropdownOpen ? 'focused' : ''}`}
                          onClick={() => {
                            setIsDropdownOpen(true);
                            inputRef.current?.focus();
                          }}
                        >
                          {/* Selected Ingredient Chips */}
                          {selectedIngredients.map((item) => (
                            <span key={item} className="rfq-chip">
                              <span className="rfq-chip-text">{item}</span>
                              <button
                                type="button"
                                className="rfq-chip-remove"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveIngredient(item);
                                }}
                                title="Remove ingredient"
                                aria-label={`Remove ${item}`}
                              >
                                &times;
                              </button>
                            </span>
                          ))}

                          {/* Search / Custom Type Input */}
                          <input
                            ref={inputRef}
                            type="text"
                            className="rfq-combobox-input"
                            placeholder={selectedIngredients.length === 0 ? "Select from list or type custom ingredient..." : "Add another..."}
                            value={ingredientInput}
                            onChange={(e) => {
                              setIngredientInput(e.target.value);
                              setIsDropdownOpen(true);
                            }}
                            onFocus={() => setIsDropdownOpen(true)}
                            onKeyDown={handleKeyDown}
                          />

                          {/* Toggle Dropdown Arrow */}
                          <button
                            type="button"
                            className={`rfq-combobox-toggle ${isDropdownOpen ? 'open' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsDropdownOpen(!isDropdownOpen);
                            }}
                            aria-label="Toggle product list"
                          >
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="6 9 12 15 18 9" />
                            </svg>
                          </button>
                        </div>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                          <div className="rfq-combobox-dropdown animate-scale-in">
                            {/* Custom Add Option if user typed something not in list */}
                            {showCustomOption && (
                              <div
                                className="rfq-combobox-item rfq-combobox-custom"
                                onClick={() => handleAddIngredient(ingredientInput)}
                              >
                                <span className="rfq-custom-icon">➕</span>
                                <span className="rfq-custom-text">
                                  Add custom: <strong>&ldquo;{ingredientInput.trim()}&rdquo;</strong>
                                </span>
                              </div>
                            )}

                            {/* Filtered Product Options from Catalogue */}
                            {filteredProducts.length > 0 ? (
                              <div className="rfq-combobox-list">
                                <div className="rfq-combobox-header-hint">
                                  Catalogue Products (Click to select multiple)
                                </div>
                                {filteredProducts.map((productName) => {
                                  const isSelected = selectedIngredients.includes(productName);
                                  return (
                                    <div
                                      key={productName}
                                      className={`rfq-combobox-item ${isSelected ? 'selected' : ''}`}
                                      onClick={() => handleToggleIngredient(productName)}
                                    >
                                      <div className={`rfq-checkbox ${isSelected ? 'checked' : ''}`}>
                                        {isSelected && (
                                          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3">
                                            <polyline points="20 6 9 17 4 12" />
                                          </svg>
                                        )}
                                      </div>
                                      <span className="rfq-item-name">{productName}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                              !showCustomOption && (
                                <div className="rfq-combobox-empty">
                                  No matching ingredients found. Type a custom name and press Enter to add.
                                </div>
                              )
                            )}
                          </div>
                        )}
                      </div>
                      <span className="rfq-field-hint">
                        💡 Select multiple products from our catalogue or type your custom botanical/compound.
                      </span>
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

                  {/* Target Assay & Custom Requirements (Optional) */}
                  <div className="rfq-field" style={{ marginTop: '0.5rem' }}>
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


