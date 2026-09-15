import React, { useState } from 'react';
import { SEO } from '../../components/common/SEO';
import { Container } from '../../components/ui/Container/Container';
import { Button } from '../../components/ui/Button/Button';
import { generateBreadcrumbSchema } from '../../utils/seoSchemas';
import './CareerPage.css';

interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements: string[];
}

const OPEN_POSITIONS: JobPosition[] = [
  {
    id: 'job-sourcing-specialist',
    title: 'Botanical Sourcing & Procurement Specialist',
    department: 'Procurement & Supply Chain',
    location: 'Surat / Gujarat, India (On-site / Hybrid)',
    type: 'Full-time',
    experience: '2 - 5 Years',
    description: 'Lead farm-level and aggregator procurement for raw herbs, roots, extracts, and seeds with a focus on batch purity, CoA verification, and traceability.',
    requirements: [
      'Degree in Agriculture, Botany, Chemistry, or Supply Chain Management',
      'Hands-on experience in agricultural mandi sourcing or botanical procurement',
      'Knowledge of FSSAI, APEDA, and organic export compliance standards',
      'Strong vendor relationship management and negotiation skills',
    ],
  },
  {
    id: 'job-qa-analyst',
    title: 'Quality Assurance & Regulatory Executive',
    department: 'Quality & Compliance',
    location: 'Surat / Gujarat, India',
    type: 'Full-time',
    experience: '3 - 6 Years',
    description: 'Ensure all incoming and exported batches meet stringent HPLC active-compound assay specs, microbiological thresholds, heavy metal limits, and export dossier standards.',
    requirements: [
      'M.Sc / B.Tech in Analytical Chemistry, Microbiology, or Pharmacy',
      'Expertise with TDS, CoA, MSDS, GMP, ISO 22000, and HACCP documentation',
      'Experience in 3rd party laboratory audits and HPLC/GCMS report validation',
      'High attention to regulatory compliance and traceability protocols',
    ],
  },
  {
    id: 'job-b2b-sales',
    title: 'International B2B Business Development Manager',
    department: 'Global Sales & Partnerships',
    location: 'Remote / Hybrid (India)',
    type: 'Full-time',
    experience: '3 - 7 Years',
    description: 'Drive institutional client acquisition across nutraceutical compounders, cosmetic formulators, and bulk ingredient distributors in USA, EU, Middle East, and Asia.',
    requirements: [
      'Proven track record in raw botanical ingredient or bulk chemical exports',
      'Deep understanding of B2B procurement workflows and buyer technical needs',
      'Excellent international communication and consultative sales abilities',
      'Familiarity with export documentation, Incoterms, and global logistics',
    ],
  },
  {
    id: 'job-supply-chain',
    title: 'Logistics & Export Documentation Coordinator',
    department: 'Operations',
    location: 'Surat / Gujarat, India',
    type: 'Full-time',
    experience: '2 - 4 Years',
    description: 'Manage shipping documentation, customs clearance, freight forwarding coordination, and air/sea dispatch tracking for international procurement consignments.',
    requirements: [
      'Experience with DGFT, IEC, phytosanitary certificates, and export invoicing',
      'Coordination experience with freight forwarders and customs house agents (CHA)',
      'Proficiency in ERP / spreadsheet tracking systems and dispatch scheduling',
    ],
  },
];

export const CareerPage: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<string>('job-sourcing-specialist');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: 'Botanical Sourcing & Procurement Specialist',
    experienceYears: '',
    portfolioLink: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  const activeJob = OPEN_POSITIONS.find((j) => j.id === selectedJob) || OPEN_POSITIONS[0];

  return (
    <div className="career-page animate-fade-in">
      <SEO
        title="Careers & Opportunities | Yami Naturals"
        description="Join the team at Yami Naturals. Explore exciting careers in botanical procurement, herbal science, regulatory quality assurance, and international B2B ingredient trade."
        canonicalPath="/career"
        structuredData={generateBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Careers', url: '/career' },
        ])}
      />

      {/* Hero Section */}
      <section className="career-hero">
        <Container size="default">
          <div className="career-hero-content animate-fade-up">
            <span className="career-eyebrow">🌿 CAREERS AT YAMI NATURALS</span>
            <h1 className="career-hero-title">
              Shape the Future of Verified Natural Procurement
            </h1>
            <p className="career-hero-subtitle">
              We are building a transparent, specification-backed bridge between organic botanical cultivation and global nutraceutical, cosmetic, and wellness manufacturing.
            </p>
          </div>
        </Container>
      </section>

      {/* Culture & Values */}
      <section className="career-values-section">
        <Container size="default">
          <div className="career-section-header">
            <h2 className="career-section-title">Why Build Your Career with Us</h2>
            <p className="career-section-desc">
              A collaborative, quality-first environment where scientific rigor meets authentic botanical heritage.
            </p>
          </div>

          <div className="career-values-grid">
            <div className="career-value-card">
              <div className="career-value-icon">🔬</div>
              <h3>Purity &amp; Science-First</h3>
              <p>We do not compromise on technical testing, HPLC standardization, or laboratory validation.</p>
            </div>
            <div className="career-value-card">
              <div className="career-value-icon">🌐</div>
              <h3>Global Trade Exposure</h3>
              <p>Work directly with international clients, cross-border supply chains, and export compliance.</p>
            </div>
            <div className="career-value-card">
              <div className="career-value-icon">🌱</div>
              <h3>Sustainable Cultivation</h3>
              <p>Direct farmer empowerment, ethical harvesting practices, and eco-conscious botanical sourcing.</p>
            </div>
            <div className="career-value-card">
              <div className="career-value-icon">🚀</div>
              <h3>Empowered Growth</h3>
              <p>Fast-track leadership opportunities in an agile, rapidly scaling botanical procurement platform.</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Open Positions Section */}
      <section className="career-openings-section" id="open-positions">
        <Container size="default">
          <div className="career-section-header">
            <span className="career-eyebrow">CURRENT OPPORTUNITIES</span>
            <h2 className="career-section-title">Explore Open Roles</h2>
            <p className="career-section-desc">
              Find your next role in botanical sourcing, analytical testing, or global business operations.
            </p>
          </div>

          <div className="career-openings-layout">
            {/* Roles List */}
            <div className="career-roles-list">
              {OPEN_POSITIONS.map((job) => (
                <button
                  key={job.id}
                  type="button"
                  className={`career-role-btn ${selectedJob === job.id ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedJob(job.id);
                    setFormData((prev) => ({ ...prev, position: job.title }));
                  }}
                >
                  <div className="career-role-btn-top">
                    <span className="career-role-dept">{job.department}</span>
                    <span className="career-role-type">{job.type}</span>
                  </div>
                  <h3 className="career-role-title">{job.title}</h3>
                  <div className="career-role-meta">
                    <span>📍 {job.location}</span>
                    <span>⏳ {job.experience}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Selected Role Detail & Apply Form */}
            <div className="career-detail-card">
              <div className="career-detail-header">
                <span className="career-role-dept">{activeJob.department}</span>
                <h3 className="career-detail-title">{activeJob.title}</h3>
                <div className="career-detail-pills">
                  <span className="career-pill">📍 {activeJob.location}</span>
                  <span className="career-pill">💼 {activeJob.type}</span>
                  <span className="career-pill">⏳ {activeJob.experience} Exp</span>
                </div>
              </div>

              <div className="career-detail-body">
                <h4>Role Overview</h4>
                <p>{activeJob.description}</p>

                <h4>Key Qualifications &amp; Skills</h4>
                <ul className="career-req-list">
                  {activeJob.requirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>

              {/* Application Form */}
              <div className="career-form-wrap" id="apply-form">
                <h4>Apply for this Position</h4>
                {submitted ? (
                  <div className="career-success-state">
                    <div className="career-success-icon">✓</div>
                    <h3>Application Submitted Successfully!</h3>
                    <p>
                      Thank you for applying for the <strong>{formData.position}</strong> position. Our HR and recruitment team will review your profile and contact you shortly.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          fullName: '',
                          email: '',
                          phone: '',
                          position: activeJob.title,
                          experienceYears: '',
                          portfolioLink: '',
                          message: '',
                        });
                      }}
                    >
                      Submit Another Application
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="career-form">
                    <div className="career-form-grid">
                      <div className="career-input-group">
                        <label htmlFor="fullName">Full Name *</label>
                        <input
                          id="fullName"
                          type="text"
                          required
                          placeholder="Your complete name"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        />
                      </div>

                      <div className="career-input-group">
                        <label htmlFor="email">Email Address *</label>
                        <input
                          id="email"
                          type="email"
                          required
                          placeholder="name@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>

                      <div className="career-input-group">
                        <label htmlFor="phone">Phone Number *</label>
                        <input
                          id="phone"
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>

                      <div className="career-input-group">
                        <label htmlFor="experienceYears">Years of Experience</label>
                        <input
                          id="experienceYears"
                          type="text"
                          placeholder="e.g. 3.5 Years"
                          value={formData.experienceYears}
                          onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                        />
                      </div>

                      <div className="career-input-group full-width">
                        <label htmlFor="portfolioLink">LinkedIn Profile / Portfolio / Resume Link</label>
                        <input
                          id="portfolioLink"
                          type="url"
                          placeholder="https://linkedin.com/in/yourprofile or drive link"
                          value={formData.portfolioLink}
                          onChange={(e) => setFormData({ ...formData, portfolioLink: e.target.value })}
                        />
                      </div>

                      <div className="career-input-group full-width">
                        <label htmlFor="message">Cover Note / Key Strengths</label>
                        <textarea
                          id="message"
                          rows={4}
                          placeholder="Tell us briefly about your domain background and why you want to join Yami Naturals..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="career-form-actions">
                      <Button
                        type="submit"
                        variant="primary"
                        size="md"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Submitting Application...' : 'Send Application →'}
                      </Button>
                      <span className="career-form-note">
                        Or email your CV directly to <a href="mailto:careers@yaminaturals.com">careers@yaminaturals.com</a>
                      </span>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
