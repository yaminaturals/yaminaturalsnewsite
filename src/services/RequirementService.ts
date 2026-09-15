import { CustomerRequirement, RequirementStatus } from '../types';
import { initialRequirements } from '../data/mockRequirements.data';
import { storageService } from './StorageService';

export interface IRequirementService {
  submitRequirement(data: Omit<CustomerRequirement, 'id' | 'referenceNumber' | 'createdAt' | 'status' | 'updatedAt'>): Promise<CustomerRequirement>;
  getRequirements(statusFilter?: RequirementStatus): Promise<CustomerRequirement[]>;
  getRequirementById(id: string): Promise<CustomerRequirement | null>;
  updateStatus(id: string, status: RequirementStatus, note?: string): Promise<CustomerRequirement | null>;
}

class RequirementService implements IRequirementService {
  private storageKey = 'customer_requirements';

  private getStoredRequirements(): CustomerRequirement[] {
    return storageService.getItem<CustomerRequirement[]>(this.storageKey, initialRequirements);
  }

  private saveStoredRequirements(reqs: CustomerRequirement[]): void {
    storageService.setItem(this.storageKey, reqs);
  }

  private generateReferenceNumber(existingReqs: CustomerRequirement[]): string {
    const year = new Date().getFullYear();
    const existingRefs = new Set(existingReqs.map(r => r.referenceNumber));

    // Try generating a random 4-digit unique reference (1000 - 9999)
    for (let i = 0; i < 1000; i++) {
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const candidate = `YN-REQ-${year}-${randomSuffix}`;
      if (!existingRefs.has(candidate)) {
        return candidate;
      }
    }

    // If 4-digit collision occurs, use timestamp milliseconds suffix for guaranteed uniqueness
    const timeSuffix = (Date.now() % 90000 + 10000).toString();
    let candidate = `YN-REQ-${year}-${timeSuffix}`;
    while (existingRefs.has(candidate)) {
      const extra = Math.floor(1000 + Math.random() * 9000);
      candidate = `YN-REQ-${year}-${extra}`;
    }

    return candidate;
  }

  async submitRequirement(data: Omit<CustomerRequirement, 'id' | 'referenceNumber' | 'createdAt' | 'status' | 'updatedAt'>): Promise<CustomerRequirement> {
    const reqs = this.getStoredRequirements();
    const now = new Date().toISOString();
    const uniqueRef = this.generateReferenceNumber(reqs);

    const newRequirement: CustomerRequirement = {
      ...data,
      id: `req-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      referenceNumber: uniqueRef,
      createdAt: now,
      status: 'new',
      updatedAt: now,
      adminNotes: []
    };

    reqs.unshift(newRequirement);
    this.saveStoredRequirements(reqs);
    return newRequirement;
  }

  async getRequirements(statusFilter?: RequirementStatus): Promise<CustomerRequirement[]> {
    const reqs = this.getStoredRequirements();
    if (statusFilter) {
      return reqs.filter(r => r.status === statusFilter);
    }
    return reqs;
  }

  async getRequirementById(id: string): Promise<CustomerRequirement | null> {
    const reqs = this.getStoredRequirements();
    return reqs.find(r => r.id === id) || null;
  }

  async updateStatus(id: string, status: RequirementStatus, note?: string): Promise<CustomerRequirement | null> {
    const reqs = this.getStoredRequirements();
    const index = reqs.findIndex(r => r.id === id);
    if (index === -1) return null;

    const notes = reqs[index].adminNotes || [];
    if (note) {
      notes.push(`[${new Date().toLocaleDateString()}] ${note}`);
    }

    reqs[index] = {
      ...reqs[index],
      status,
      adminNotes: notes,
      updatedAt: new Date().toISOString()
    };

    this.saveStoredRequirements(reqs);
    return reqs[index];
  }
}

export const requirementService = new RequirementService();
