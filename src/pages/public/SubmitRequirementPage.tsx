import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container } from '../../components/ui/Container/Container';
import { Card } from '../../components/ui/Card/Card';
import { Button } from '../../components/ui/Button/Button';
import { requirementService } from '../../services/RequirementService';
import { fileStorageService } from '../../services/FileStorageService';
import { CustomerType, RequirementCategoryType, UploadedDocumentMetadata } from '../../types';
import './SubmitRequirementPage.css';

export const SubmitRequirementPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const prefilledProduct = searchParams.get('product') || '';

  // Step state: 1 to 5, or 'success'
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{ referenceNumber: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Form State
  const [customerType, setCustomerType] = useState<CustomerType>('b2b');
  const [requirementType, setRequirementType] = useState<RequirementCategoryType>('herbal-extract');
  const [productName, setProductName] = useState(prefilledProduct);
  const [botanicalOrInciName, setBotanicalOrInciName] = useState('');
  const [requiredQuantity, setRequiredQuantity] = useState('');
  const [quantityUnit, setQuantityUnit] = useState('kg');
  const [applicationUse, setApplicationUse] = useState('');
  const [specificationStandard, setSpecificationStandard] = useState('');
  const [packagingPreference, setPackagingPreference] = useState('');
  const [documents, setDocuments] = useState<UploadedDocumentMetadata[]>([]);
  const [uploadError, setUploadError] = useState('');

  // Contact Info
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [cityOrPort, setCityOrPort] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  useEffect(() => {
    if (prefilledProduct) {
      setProductName(prefilledProduct);
    }
  }, [prefilledProduct]);

  // Validation before advancing
  const handleNext = () => {
    setErrorMessage('');

    if (step === 2) {
      if (!productName.trim()) {
        setErrorMessage('Please provide the product or ingredient name.');
        return;
      }
    }

    if (step === 3) {
      if (!requiredQuantity.trim()) {
        setErrorMessage('Please specify the required quantity volume.');
        return;
      }
      if (!applicationUse.trim()) {
        setErrorMessage('Please indicate the target application or intended use.');
        return;
      }
    }

    if (step < 5) {
      setStep(step + 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setErrorMessage('');
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  // File Upload Handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError('');
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const res = await fileStorageService.uploadDocument(file);
    if (!res.success || !res.metadata) {
      setUploadError(res.error || 'Failed to attach document.');
      return;
    }

    setDocuments(prev => [...prev, res.metadata!]);
    e.target.value = '';
  };

  const handleRemoveDoc = (docId: string) => {
    setDocuments(prev => prev.filter(d => d.id !== docId));
  };

  // Final Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim() || !email.trim() || !phone.trim() || !country.trim()) {
      setErrorMessage('Please complete all required contact fields (Name, Email, Phone, Country).');
      return;
    }

    if (customerType === 'b2b' && !companyName.trim()) {
      setErrorMessage('Please provide your Company / Enterprise name for B2B requests.');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await requirementService.submitRequirement({
        customerType,
        requirementType,
        productName,
        botanicalOrInciName,
        requiredQuantity,
        quantityUnit,
        applicationUse,
        specificationStandard,
        packagingPreference,
        documents,
        contact: {
          fullName,
          companyName: customerType === 'b2b' ? companyName : undefined,
          email,
          phone,
          country,
          cityOrPort
        },
        additionalNotes
      });

      setSubmissionResult({ referenceNumber: result.referenceNumber });
      setStep(6); // Success view
      window.scrollTo({ top: 100, behavior: 'smooth' });
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'An error occurred during submission.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const categoryOptions: { id: RequirementCategoryType; label: string; icon: string }[] = [
    { id: 'herbal-extract', label: 'Herbal Extract (Standardized)', icon: '🧪' },
    { id: 'herbal-powder', label: 'Herbal Powder (Whole Herb)', icon: '🌿' },
    { id: 'oil', label: 'Essential or Carrier Oil', icon: '💧' },
    { id: 'cosmetic-clay', label: 'Cosmetic Clay Powder', icon: '🏺' },
    { id: 'nutraceutical-ingredient', label: 'Nutraceutical Ingredient', icon: '🧬' },
    { id: 'capsule', label: 'Formula-Based Capsule', icon: '💊' },
    { id: 'custom-formula', label: 'Custom Blend / Synergy', icon: '⚗️' },
    { id: 'finished-product', label: 'Finished Packaged Product', icon: '📦' },
    { id: 'other', label: 'Other Raw Botanical', icon: '🌾' },
  ];

  return (
    <div className="wizard-page animate-fade-in" style={{ padding: 'clamp(2.5rem, 5vw, 5rem) 0' }}>
      <Container size="default">
        <div className="wizard-container">
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
            <span className="eyebrow">Procurement Intake</span>
            <h1>Submit Your Requirement</h1>
            <p className="text-muted" style={{ maxWidth: '640px', margin: '0 auto' }}>
              Connect with Yami Naturals for verified botanical sourcing, volume specifications, Certificates of Analysis, or customized compounding.
            </p>
          </div>

          {/* Progress Indicator (Steps 1 to 5) */}
          {step <= 5 && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--color-primary-700)' }}>
                <span>STEP {step} OF 5</span>
                <span>
                  {step === 1 && 'Customer Classification'}
                  {step === 2 && 'Material & Category'}
                  {step === 3 && 'Specifications & Quantity'}
                  {step === 4 && 'Supporting Documents'}
                  {step === 5 && 'Contact & Fulfilment'}
                </span>
              </div>
              <div className="wizard-progress-bar-wrap" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={5}>
                <div className="wizard-progress-bar" style={{ width: `${(step / 5) * 100}%` }} />
              </div>
            </div>
          )}

          {/* Error Banner */}
          {errorMessage && (
            <div style={{ backgroundColor: 'var(--color-error-bg)', color: 'var(--color-error)', padding: 'var(--space-4)', borderRadius: 'var(--radius-sm)', marginBottom: 'var(--space-6)', fontSize: 'var(--font-size-sm)' }}>
              ⚠️ {errorMessage}
            </div>
          )}

          {/* SUCCESS VIEW */}
          {step === 6 && submissionResult && (
            <Card variant="surface" padding="lg" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: 'var(--space-4)' }}>✅</div>
              <h2 style={{ color: 'var(--color-primary-700)' }}>Requirement Successfully Registered</h2>
              <div style={{ margin: 'var(--space-4) 0', padding: 'var(--space-4)', backgroundColor: 'var(--color-primary-50)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>YOUR REFERENCE NUMBER:</div>
                <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 700, color: 'var(--color-primary-800)', letterSpacing: '0.05em' }}>
                  {submissionResult.referenceNumber}
                </div>
              </div>
              <p className="text-body" style={{ maxWidth: '540px', margin: '0 auto var(--space-6)' }}>
                Our sourcing and technical review desk has received your requirement. You will receive an initial technical feasibility evaluation and quotation at <strong>{email}</strong>.
              </p>
              <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button to="/products" variant="primary">
                  Explore Additional Ingredients
                </Button>
                <Button to="/admin/requirements" variant="outline">
                  View in Admin Portal (Prototype)
                </Button>
              </div>
            </Card>
          )}

          {/* STEP 1: CUSTOMER TYPE */}
          {step === 1 && (
            <Card variant="surface" padding="lg">
              <div className="wizard-step-header">
                <h3>Select Customer Type</h3>
                <p className="text-muted text-sm">
                  Please identify whether this requirement is on behalf of a commercial business or an individual consumer.
                </p>
              </div>

              <div className="wizard-choice-grid">
                <div
                  className={`wizard-choice-card ${customerType === 'b2b' ? 'selected' : ''}`}
                  onClick={() => setCustomerType('b2b')}
                >
                  <div style={{ fontSize: '1.8rem', marginBottom: 'var(--space-2)' }}>🏢</div>
                  <h4>B2B / Commercial Business</h4>
                  <p className="text-xs text-muted" style={{ margin: 0 }}>
                    For manufacturers, formulators, wholesalers, private brands, and bulk compounders.
                  </p>
                </div>

                <div
                  className={`wizard-choice-card ${customerType === 'b2c' ? 'selected' : ''}`}
                  onClick={() => setCustomerType('b2c')}
                >
                  <div style={{ fontSize: '1.8rem', marginBottom: 'var(--space-2)' }}>👤</div>
                  <h4>B2C / Consumer / Practitioner</h4>
                  <p className="text-xs text-muted" style={{ margin: 0 }}>
                    For direct retail packs, herbal clinics, single-batch wellness practitioners, and individuals.
                  </p>
                </div>
              </div>

              <div className="wizard-actions">
                <span />
                <Button type="button" variant="primary" size="lg" onClick={handleNext}>
                  Continue to Step 2 →
                </Button>
              </div>
            </Card>
          )}

          {/* STEP 2: REQUIREMENT TYPE & MATERIAL NAME */}
          {step === 2 && (
            <Card variant="surface" padding="lg">
              <div className="wizard-step-header">
                <h3>Material & Category Selection</h3>
                <p className="text-muted text-sm">
                  Choose the classification and provide the specific ingredient name you are looking to source.
                </p>
              </div>

              <div className="wizard-input-group">
                <label className="wizard-label">Ingredient Classification *</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--space-2)', marginBottom: 'var(--space-6)' }}>
                  {categoryOptions.map(cat => (
                    <div
                      key={cat.id}
                      onClick={() => setRequirementType(cat.id)}
                      style={{
                        padding: '0.65rem 0.85rem',
                        border: `1.5px solid ${requirementType === cat.id ? 'var(--color-primary-600)' : 'var(--color-border-subtle)'}`,
                        backgroundColor: requirementType === cat.id ? 'var(--color-primary-50)' : '#ffffff',
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer',
                        fontSize: 'var(--font-size-xs)',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-2)'
                      }}
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="wizard-input-group">
                <label className="wizard-label" htmlFor="prodName">Product / Ingredient Name *</label>
                <input
                  id="prodName"
                  type="text"
                  className="wizard-input"
                  placeholder="e.g. Ashwagandha Extract, Boswellia, French Green Clay..."
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                />
              </div>

              <div className="wizard-input-group">
                <label className="wizard-label" htmlFor="botName">Botanical Name or INCI (If known)</label>
                <input
                  id="botName"
                  type="text"
                  className="wizard-input"
                  placeholder="e.g. Withania somnifera, Curcuma longa..."
                  value={botanicalOrInciName}
                  onChange={(e) => setBotanicalOrInciName(e.target.value)}
                />
              </div>

              <div className="wizard-actions">
                <Button type="button" variant="outline" onClick={handleBack}>
                  ← Back
                </Button>
                <Button type="button" variant="primary" size="lg" onClick={handleNext}>
                  Continue to Step 3 →
                </Button>
              </div>
            </Card>
          )}

          {/* STEP 3: SPECIFICATIONS & QUANTITY */}
          {step === 3 && (
            <Card variant="surface" padding="lg">
              <div className="wizard-step-header">
                <h3>Volume & Technical Specifications</h3>
                <p className="text-muted text-sm">
                  Specify the volume required and any target analytical markers or standards.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-4)' }}>
                <div className="wizard-input-group">
                  <label className="wizard-label" htmlFor="reqQty">Required Quantity *</label>
                  <input
                    id="reqQty"
                    type="text"
                    className="wizard-input"
                    placeholder="e.g. 50, 500, 2000..."
                    value={requiredQuantity}
                    onChange={(e) => setRequiredQuantity(e.target.value)}
                    required
                  />
                </div>

                <div className="wizard-input-group">
                  <label className="wizard-label" htmlFor="qtyUnit">Unit *</label>
                  <select
                    id="qtyUnit"
                    className="wizard-select"
                    value={quantityUnit}
                    onChange={(e) => setQuantityUnit(e.target.value)}
                  >
                    <option value="kg">Kilograms (kg)</option>
                    <option value="metric-ton">Metric Tonnes (MT)</option>
                    <option value="grams">Grams (g)</option>
                    <option value="units">Units / Bottles / Packs</option>
                  </select>
                </div>
              </div>

              <div className="wizard-input-group">
                <label className="wizard-label" htmlFor="appUse">Intended Application / Formulation Use *</label>
                <input
                  id="appUse"
                  type="text"
                  className="wizard-input"
                  placeholder="e.g. Dietary supplement capsule, cosmetic facial mask, herbal tea..."
                  value={applicationUse}
                  onChange={(e) => setApplicationUse(e.target.value)}
                  required
                />
              </div>

              <div className="wizard-input-group">
                <label className="wizard-label" htmlFor="specStd">Target Assay / Mesh / Standard</label>
                <input
                  id="specStd"
                  type="text"
                  className="wizard-input"
                  placeholder="e.g. 5% Withanolides HPLC, 80 Mesh, USP Grade, Organic Certified..."
                  value={specificationStandard}
                  onChange={(e) => setSpecificationStandard(e.target.value)}
                />
              </div>

              <div className="wizard-input-group">
                <label className="wizard-label" htmlFor="pkgPref">Preferred Packaging</label>
                <input
                  id="pkgPref"
                  type="text"
                  className="wizard-input"
                  placeholder="e.g. 25 kg fiber drums, 1 kg vacuum foil, bulk container..."
                  value={packagingPreference}
                  onChange={(e) => setPackagingPreference(e.target.value)}
                />
              </div>

              <div className="wizard-actions">
                <Button type="button" variant="outline" onClick={handleBack}>
                  ← Back
                </Button>
                <Button type="button" variant="primary" size="lg" onClick={handleNext}>
                  Continue to Step 4 →
                </Button>
              </div>
            </Card>
          )}

          {/* STEP 4: SUPPORTING DOCUMENTS */}
          {step === 4 && (
            <Card variant="surface" padding="lg">
              <div className="wizard-step-header">
                <h3>Supporting Documents & Reference Sheets</h3>
                <p className="text-muted text-sm">
                  Attach your target specifications, reference Certificate of Analysis (CoA), or formulation requirements. (Optional)
                </p>
              </div>

              <div className="file-dropzone">
                <input
                  type="file"
                  id="docUpload"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                  accept=".pdf,.doc,.docx,.jpg,.png"
                />
                <label htmlFor="docUpload" style={{ cursor: 'pointer', display: 'block' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-2)' }}>📎</div>
                  <h5>Click to attach file or drag & drop</h5>
                  <p className="text-xs text-muted" style={{ margin: 0 }}>
                    Supported formats: PDF, Word (DOC/DOCX), JPG, PNG (Max 10MB)
                  </p>
                </label>
              </div>

              {uploadError && (
                <div style={{ color: 'var(--color-error)', fontSize: 'var(--font-size-xs)', marginTop: 'var(--space-2)' }}>
                  ⚠️ {uploadError}
                </div>
              )}

              {/* Uploaded Documents List */}
              {documents.length > 0 && (
                <div style={{ marginTop: 'var(--space-6)' }}>
                  <h6>Attached Documents ({documents.length})</h6>
                  {documents.map((doc) => (
                    <div key={doc.id} className="file-meta-item">
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 'var(--font-size-sm)' }}>{doc.name}</div>
                        <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                          {(doc.sizeBytes / 1024).toFixed(1)} KB
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveDoc(doc.id)}
                        style={{ color: 'var(--color-error)', fontSize: 'var(--font-size-xs)', cursor: 'pointer', border: 'none', background: 'none' }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="wizard-actions">
                <Button type="button" variant="outline" onClick={handleBack}>
                  ← Back
                </Button>
                <Button type="button" variant="primary" size="lg" onClick={handleNext}>
                  Continue to Final Step →
                </Button>
              </div>
            </Card>
          )}

          {/* STEP 5: CONTACT & FULFILMENT */}
          {step === 5 && (
            <Card variant="surface" padding="lg">
              <form onSubmit={handleSubmit}>
                <div className="wizard-step-header">
                  <h3>Contact & Fulfilment Details</h3>
                  <p className="text-muted text-sm">
                    Where should our technical sourcing team direct the specification proposal and quotation?
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: customerType === 'b2b' ? '1fr 1fr' : '1fr', gap: 'var(--space-4)' }}>
                  <div className="wizard-input-group">
                    <label className="wizard-label" htmlFor="fullName">Your Full Name *</label>
                    <input
                      id="fullName"
                      type="text"
                      className="wizard-input"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>

                  {customerType === 'b2b' && (
                    <div className="wizard-input-group">
                      <label className="wizard-label" htmlFor="compName">Company / Enterprise Name *</label>
                      <input
                        id="compName"
                        type="text"
                        className="wizard-input"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        required
                      />
                    </div>
                  )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                  <div className="wizard-input-group">
                    <label className="wizard-label" htmlFor="contactEmail">Business Email *</label>
                    <input
                      id="contactEmail"
                      type="email"
                      className="wizard-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="wizard-input-group">
                    <label className="wizard-label" htmlFor="contactPhone">Phone / WhatsApp Number *</label>
                    <input
                      id="contactPhone"
                      type="tel"
                      className="wizard-input"
                      placeholder="+Country Code and Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                  <div className="wizard-input-group">
                    <label className="wizard-label" htmlFor="country">Country *</label>
                    <input
                      id="country"
                      type="text"
                      className="wizard-input"
                      placeholder="e.g. United States, Germany, India..."
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      required
                    />
                  </div>

                  <div className="wizard-input-group">
                    <label className="wizard-label" htmlFor="cityPort">Destination City or Port</label>
                    <input
                      id="cityPort"
                      type="text"
                      className="wizard-input"
                      placeholder="e.g. Hamburg, Long Beach, Mumbai..."
                      value={cityOrPort}
                      onChange={(e) => setCityOrPort(e.target.value)}
                    />
                  </div>
                </div>

                <div className="wizard-input-group">
                  <label className="wizard-label" htmlFor="notes">Additional Instructions or Testing Requirements</label>
                  <textarea
                    id="notes"
                    className="wizard-textarea"
                    rows={3}
                    placeholder="Any specific microbial limits, heavy metal limits, or delivery schedule notes..."
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                  />
                </div>

                <div className="wizard-actions">
                  <Button type="button" variant="outline" onClick={handleBack} disabled={isSubmitting}>
                    ← Back
                  </Button>
                  <Button type="submit" variant="primary" size="lg" isLoading={isSubmitting}>
                    Submit Requirement
                  </Button>
                </div>
              </form>
            </Card>
          )}
        </div>
      </Container>
    </div>
  );
};
