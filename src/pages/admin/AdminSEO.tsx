import React, { useState } from 'react';
import { Card } from '../../components/ui/Card/Card';
import { Button } from '../../components/ui/Button/Button';
import { Badge } from '../../components/ui/Badge/Badge';

export const AdminSEO: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sitemap' | 'pages-meta' | 'robots'>('sitemap');
  const [saveStatus, setSaveStatus] = useState(false);

  const sitemapUrls = [
    { loc: 'https://yaminaturals.com/', lastmod: '2026-09-15', changefreq: 'daily', priority: '1.0' },
    { loc: 'https://yaminaturals.com/products', lastmod: '2026-09-15', changefreq: 'daily', priority: '0.9' },
    { loc: 'https://yaminaturals.com/submit-requirement', lastmod: '2026-09-15', changefreq: 'weekly', priority: '0.9' },
    { loc: 'https://yaminaturals.com/about', lastmod: '2026-09-15', changefreq: 'monthly', priority: '0.8' },
    { loc: 'https://yaminaturals.com/b2b-solutions', lastmod: '2026-09-15', changefreq: 'weekly', priority: '0.8' },
    { loc: 'https://yaminaturals.com/b2c-solutions', lastmod: '2026-09-15', changefreq: 'weekly', priority: '0.7' },
    { loc: 'https://yaminaturals.com/services', lastmod: '2026-09-15', changefreq: 'monthly', priority: '0.7' },
    { loc: 'https://yaminaturals.com/how-it-works', lastmod: '2026-09-15', changefreq: 'monthly', priority: '0.7' },
    { loc: 'https://yaminaturals.com/faq', lastmod: '2026-09-15', changefreq: 'monthly', priority: '0.6' },
    { loc: 'https://yaminaturals.com/contact', lastmod: '2026-09-15', changefreq: 'monthly', priority: '0.8' }
  ];

  const pages = [
    {
      path: '/',
      name: 'Homepage',
      title: 'Yami Naturals | Pure Botanical Extracts, Herbal Powders & Essential Oils',
      metaDesc: 'Leading Exporter & Bulk Supplier of 100% Pure Botanical Extracts, Herbal Powders, and Essential Oils. Certified ISO & GMP manufacturing facility in India.',
      canonical: 'https://yaminaturals.com/'
    },
    {
      path: '/products',
      name: 'Botanical Catalog',
      title: 'Botanical Products & Raw Materials Catalog | Yami Naturals',
      metaDesc: 'Explore our complete catalog of certified standardized herbal extracts, micro-milled powders, cold-pressed oils, and cosmetic clays.',
      canonical: 'https://yaminaturals.com/products'
    },
    {
      path: '/submit-requirement',
      name: 'Submit RFQ Portal',
      title: 'Submit Custom Material Requirement & RFQ | Yami Naturals',
      metaDesc: 'Request direct B2B pricing, custom mesh sizes, standardized extract specifications, and batch Certificate of Analysis (CoA).',
      canonical: 'https://yaminaturals.com/submit-requirement'
    },
    {
      path: '/b2b-solutions',
      name: 'B2B Solutions',
      title: 'B2B Sourcing Solutions & Private Labelling | Yami Naturals',
      metaDesc: 'Comprehensive OEM private labelling, contract manufacturing, custom formulation blending, and international export logistics.',
      canonical: 'https://yaminaturals.com/b2b-solutions'
    }
  ];

  const handleSave = () => {
    setSaveStatus(true);
    setTimeout(() => setSaveStatus(false), 3000);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1000px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid #E5E7EB', paddingBottom: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#111827', margin: 0 }}>SEO & Sitemap Tools</h1>
          <p style={{ fontSize: '0.875rem', color: '#6B7280', margin: '0.25rem 0 0' }}>
            Monitor and calibrate search engine metadata, XML sitemap generation, and robots indexing directives.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {[
            { id: 'sitemap', label: '🗺️ Sitemap.xml' },
            { id: 'pages-meta', label: '🏷️ Page Meta Tags' },
            { id: 'robots', label: '🤖 Robots.txt' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '0.45rem 0.85rem',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 600,
                border: '1px solid #E5E7EB',
                backgroundColor: activeTab === tab.id ? '#0D5C3A' : '#FFFFFF',
                color: activeTab === tab.id ? '#FFFFFF' : '#374151',
                cursor: 'pointer'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {saveStatus && (
        <div style={{ padding: '0.85rem 1.25rem', backgroundColor: '#DCFCE7', color: '#15803D', borderRadius: '8px', fontSize: '0.875rem', fontWeight: 600, border: '1px solid #86EFAC' }}>
          ✓ SEO configurations saved and updated.
        </div>
      )}

      {/* 1. Sitemap.xml Tab */}
      {activeTab === 'sitemap' && (
        <Card variant="surface" padding="lg">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0, color: '#0D5C3A' }}>
                XML Sitemap Index ({sitemapUrls.length} Indexed Routes)
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#6B7280', margin: '0.25rem 0 0' }}>
                Google Search Console and Bing Webmaster autodiscovery index.
              </p>
            </div>
            <Button variant="primary" size="sm" onClick={handleSave}>
              Generate & Ping Sitemap
            </Button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ textAlign: 'left', color: '#6B7280', borderBottom: '1px solid #E5E7EB', fontSize: '0.78rem' }}>
                  <th style={{ padding: '0.65rem 0.5rem' }}>Route URL</th>
                  <th style={{ padding: '0.65rem 0.5rem' }}>Change Frequency</th>
                  <th style={{ padding: '0.65rem 0.5rem' }}>Priority</th>
                  <th style={{ padding: '0.65rem 0.5rem', textAlign: 'right' }}>Indexing</th>
                </tr>
              </thead>
              <tbody>
                {sitemapUrls.map((s, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #F3F4F6' }}>
                    <td style={{ padding: '0.65rem 0.5rem', fontWeight: 600, color: '#111827' }}>
                      <a href={s.loc} target="_blank" rel="noopener noreferrer" style={{ color: '#0D5C3A', textDecoration: 'none' }}>
                        {s.loc} ↗
                      </a>
                    </td>
                    <td style={{ padding: '0.65rem 0.5rem', color: '#6B7280' }}>
                      {s.changefreq}
                    </td>
                    <td style={{ padding: '0.65rem 0.5rem', fontWeight: 700, color: '#0D5C3A' }}>
                      {s.priority}
                    </td>
                    <td style={{ padding: '0.65rem 0.5rem', textAlign: 'right' }}>
                      <Badge variant="success">200 OK</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* 2. Page Meta Tags Tab */}
      {activeTab === 'pages-meta' && (
        <Card variant="surface" padding="lg">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0, color: '#0D5C3A' }}>
              Meta Title & Description Editor
            </h3>
            <Button variant="primary" size="sm" onClick={handleSave}>
              Save All Metadata
            </Button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {pages.map((p, idx) => (
              <div key={idx} style={{ padding: '1.25rem', border: '1px solid #E5E7EB', borderRadius: '8px', backgroundColor: '#FAFAFA' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0D5C3A' }}>
                    {p.name} ({p.path})
                  </span>
                  <Badge variant="success">Index: True</Badge>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#374151', marginBottom: '0.25rem' }}>
                      Page Title Tag (Meta Title):
                    </label>
                    <input
                      type="text"
                      defaultValue={p.title}
                      style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.85rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#374151', marginBottom: '0.25rem' }}>
                      Meta Description:
                    </label>
                    <textarea
                      rows={2}
                      defaultValue={p.metaDesc}
                      style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.82rem' }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* 3. Robots.txt Tab */}
      {activeTab === 'robots' && (
        <Card variant="surface" padding="lg">
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 1rem 0', color: '#0D5C3A' }}>
            Robots.txt Crawler Directives
          </h3>
          <div style={{ backgroundColor: '#1E293B', color: '#F8FAFC', padding: '1rem', borderRadius: '6px', fontFamily: 'monospace', fontSize: '0.85rem', lineHeight: 1.6 }}>
            <div>User-agent: *</div>
            <div>Allow: /</div>
            <div>Disallow: /admin/</div>
            <div>Disallow: /admin/login</div>
            <div style={{ marginTop: '0.5rem', color: '#38BDF8' }}>Sitemap: https://yaminaturals.com/sitemap.xml</div>
          </div>
        </Card>
      )}
    </div>
  );
};
