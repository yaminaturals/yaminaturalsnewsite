import { CustomerRequirement, RequirementStatus } from '../types';
import { initialRequirements } from '../data/mockRequirements.data';
import { storageService } from './StorageService';

export interface IRequirementService {
  submitRequirement(data: Omit<CustomerRequirement, 'id' | 'referenceNumber' | 'createdAt' | 'status' | 'updatedAt'>): Promise<CustomerRequirement>;
  getRequirements(statusFilter?: RequirementStatus): Promise<CustomerRequirement[]>;
  getRequirementById(id: string): Promise<CustomerRequirement | null>;
  updateStatus(id: string, status: RequirementStatus, note?: string): Promise<CustomerRequirement | null>;
  deleteRequirement(id: string): Promise<boolean>;
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
    // Collect all existing numerical sequence IDs
    const existingNumbers = new Set<number>();

    existingReqs.forEach(r => {
      // Extracts trailing digits from formats like '00001', 'YN-REQ-2026-0042', or pure numbers
      const match = r.referenceNumber.match(/\d+$/);
      if (match) {
        const num = parseInt(match[0], 10);
        if (!isNaN(num)) {
          existingNumbers.add(num);
        }
      }
    });

    // Check last stored counter sequence or calculate from existing items
    const storedCounter = storageService.getItem<number>('yn_req_seq_counter', 0);
    const maxExisting = existingNumbers.size > 0 ? Math.max(...Array.from(existingNumbers)) : 0;
    
    // Determine next sequential number
    let nextSeq = Math.max(storedCounter, maxExisting) + 1;
    while (existingNumbers.has(nextSeq)) {
      nextSeq++;
    }

    // Persist latest counter in storage
    storageService.setItem('yn_req_seq_counter', nextSeq);

    // Return zero-padded 5-digit sequential reference number: 00001, 00002, 00003...
    return String(nextSeq).padStart(5, '0');
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

  async deleteRequirement(id: string): Promise<boolean> {
    const reqs = this.getStoredRequirements();
    const filtered = reqs.filter(r => r.id !== id);
    if (filtered.length === reqs.length) return false;
    this.saveStoredRequirements(filtered);
    return true;
  }
}

export const requirementService = new RequirementService();
