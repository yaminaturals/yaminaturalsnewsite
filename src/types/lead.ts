export type LeadStatus = 'new' | 'contacted' | 'resolved' | 'spam';

export interface CustomerLead {
  id: string;
  fullName: string;
  companyName?: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  sourceUrl: string;
  createdAt: string;
  status: LeadStatus;
}
