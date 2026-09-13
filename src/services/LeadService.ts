import { CustomerLead } from '../types';
import { storageService } from './StorageService';

export interface ILeadService {
  captureLead(leadData: Omit<CustomerLead, 'id' | 'createdAt' | 'status'>): Promise<CustomerLead>;
  getLeads(): Promise<CustomerLead[]>;
}

class LeadService implements ILeadService {
  private storageKey = 'customer_leads';

  async captureLead(leadData: Omit<CustomerLead, 'id' | 'createdAt' | 'status'>): Promise<CustomerLead> {
    const leads = storageService.getItem<CustomerLead[]>(this.storageKey, []);
    const newLead: CustomerLead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'new'
    };
    leads.unshift(newLead);
    storageService.setItem(this.storageKey, leads);
    return newLead;
  }

  async getLeads(): Promise<CustomerLead[]> {
    return storageService.getItem<CustomerLead[]>(this.storageKey, []);
  }
}

export const leadService = new LeadService();
