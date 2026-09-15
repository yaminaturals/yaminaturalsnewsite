import { siteConfig } from '../config/siteConfig';
import { storageService } from './StorageService';

export interface SiteCompanySettings {
  brandName: string;
  legalName: string;
  tagline: string;
  mission: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  googleMapsUrl: string;
  businessHours: string;
}

const DEFAULT_SETTINGS: SiteCompanySettings = {
  brandName: siteConfig.brand.name,
  legalName: siteConfig.brand.legalName,
  tagline: siteConfig.brand.tagline,
  mission: siteConfig.brand.mission,
  email: siteConfig.contact.email,
  phone: siteConfig.contact.phone,
  whatsapp: siteConfig.contact.whatsapp,
  address: siteConfig.contact.address,
  googleMapsUrl: siteConfig.contact.googleMapsUrl,
  businessHours: siteConfig.contact.businessHours
};

class SiteSettingsService {
  private storageKey = 'yn_site_company_settings';

  getSettings(): SiteCompanySettings {
    return storageService.getItem<SiteCompanySettings>(this.storageKey, DEFAULT_SETTINGS);
  }

  saveSettings(updates: Partial<SiteCompanySettings>): SiteCompanySettings {
    const current = this.getSettings();
    const updated = { ...current, ...updates };
    storageService.setItem(this.storageKey, updated);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('yami:settings-updated', { detail: updated }));
    }
    return updated;
  }
}

export const siteSettingsService = new SiteSettingsService();
