import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card/Card';
import { Button } from '../../components/ui/Button/Button';
import { siteSettingsService, SiteCompanySettings } from '../../services/SiteSettingsService';
import { AUTHORIZED_ADMIN_EMAIL } from '../../services/AuthService';

export const AdminSettings: React.FC = () => {
  const [formData, setFormData] = useState<SiteCompanySettings>(() => siteSettingsService.getSettings());
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setFormData(siteSettingsService.getSettings());
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    siteSettingsService.saveSettings(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1000px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid #E5E7EB', paddingBottom: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#111827', margin: 0 }}>Company & Website Settings</h1>
          <p style={{ fontSize: '0.875rem', color: '#6B7280', margin: '0.25rem 0 0' }}>
            Manage official company details, contact channels, working hours, and Google Maps link displayed on the public website.
          </p>
        </div>

        <Button type="button" variant="primary" onClick={handleSave}>
          💾 Save & Update Website
        </Button>
      </div>

      {savedSuccess && (
        <div style={{ padding: '0.85rem 1.25rem', backgroundColor: '#DCFCE7', color: '#15803D', borderRadius: '8px', fontSize: '0.875rem', fontWeight: 600, border: '1px solid #86EFAC' }}>
          ✓ Company settings saved successfully! All website footer, header, and contact endpoints are updated.
        </div>
      )}

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* 1. Brand & Corporate Identity */}
        <Card variant="surface" padding="lg">
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 1.25rem 0', color: '#0D5C3A' }}>
            🏢 Corporate & Brand Information
          </h3>

          <div className="grid grid-cols-1 tablet-grid-cols-2 gap-4">
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>
                Brand Name:
              </label>
              <input
                type="text"
                name="brandName"
                value={formData.brandName}
                onChange={handleChange}
                style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.875rem', outline: 'none' }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>
                Legal Registered Entity Name:
              </label>
              <input
                type="text"
                name="legalName"
                value={formData.legalName}
                onChange={handleChange}
                style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.875rem', outline: 'none' }}
                required
              />
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>
                Brand Tagline:
              </label>
              <input
                type="text"
                name="tagline"
                value={formData.tagline}
                onChange={handleChange}
                style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.875rem', outline: 'none' }}
              />
            </div>
          </div>
        </Card>

        {/* 2. Official Communication Channels */}
        <Card variant="surface" padding="lg">
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 1.25rem 0', color: '#0D5C3A' }}>
            📞 Contact Endpoints & Working Hours
          </h3>

          <div className="grid grid-cols-1 tablet-grid-cols-2 gap-4">
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>
                Official Inquiry Email:
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.875rem', outline: 'none' }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>
                Direct Telephone / Mobile:
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.875rem', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>
                WhatsApp Business Number:
              </label>
              <input
                type="text"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.875rem', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>
                Business Working Hours:
              </label>
              <input
                type="text"
                name="businessHours"
                value={formData.businessHours}
                onChange={handleChange}
                style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.875rem', outline: 'none' }}
              />
            </div>
          </div>
        </Card>

        {/* 3. Physical Address & Google Maps Location */}
        <Card variant="surface" padding="lg">
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 1.25rem 0', color: '#0D5C3A' }}>
            📍 Physical Facility Address & Google Maps Link
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>
                Headquarters & Processing Plant Address:
              </label>
              <textarea
                rows={3}
                name="address"
                value={formData.address}
                onChange={handleChange}
                style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.875rem', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>
                Google Maps Location / Embed URL:
              </label>
              <input
                type="text"
                name="googleMapsUrl"
                value={formData.googleMapsUrl}
                onChange={handleChange}
                placeholder="https://maps.google.com/?q=..."
                style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.875rem', outline: 'none' }}
              />
            </div>
          </div>
        </Card>

        {/* 4. Security & Administrator Overview */}
        <Card variant="surface" padding="lg">
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 1rem 0', color: '#0D5C3A' }}>
            🔒 Access & Authentication Security
          </h3>
          <div className="grid grid-cols-1 tablet-grid-cols-2 gap-4" style={{ fontSize: '0.85rem' }}>
            <div style={{ padding: '0.75rem', backgroundColor: '#F9FAFB', borderRadius: '6px', border: '1px solid #E5E7EB' }}>
              <span style={{ color: '#6B7280', fontSize: '0.75rem' }}>Authorized Administrator:</span>
              <div style={{ fontWeight: 700, color: '#111827', marginTop: '2px' }}>{AUTHORIZED_ADMIN_EMAIL}</div>
            </div>
            <div style={{ padding: '0.75rem', backgroundColor: '#F9FAFB', borderRadius: '6px', border: '1px solid #E5E7EB' }}>
              <span style={{ color: '#6B7280', fontSize: '0.75rem' }}>Authentication Protocol:</span>
              <div style={{ fontWeight: 700, color: '#0D5C3A', marginTop: '2px' }}>Firebase Google OAuth Active</div>
            </div>
          </div>
        </Card>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '0.5rem' }}>
          <Button type="submit" variant="primary" size="lg">
            💾 Save & Update Website
          </Button>
        </div>
      </form>
    </div>
  );
};
