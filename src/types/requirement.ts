export type CustomerType = 'b2b' | 'b2c';

export type RequirementCategoryType = 
  | 'herbal-powder'
  | 'herbal-extract'
  | 'oil'
  | 'cosmetic-clay'
  | 'nutraceutical-ingredient'
  | 'capsule'
  | 'custom-formula'
  | 'finished-product'
  | 'other';

export interface UploadedDocumentMetadata {
  id: string;
  name: string;
  sizeBytes: number;
  mimeType: string;
  previewUrl?: string;
  uploadedAt: string;
}

export type RequirementStatus = 'new' | 'in-review' | 'quoted' | 'archived';

export interface CustomerRequirement {
  id: string;
  referenceNumber: string; // e.g. "YN-REQ-2026-0841"
  createdAt: string;
  customerType: CustomerType;
  
  // Step 2
  requirementType: RequirementCategoryType;
  productName: string;
  botanicalOrInciName?: string;
  
  // Step 3
  requiredQuantity: string;
  quantityUnit: string; // 'kg' | 'metric-ton' | 'units' | 'grams'
  applicationUse: string; // cosmetic, supplement, tea, pharma, etc.
  specificationStandard?: string; // e.g. USP, EP, Organic
  packagingPreference?: string; // Drums, vacuum foil, jars, custom
  
  // Step 4
  documents: UploadedDocumentMetadata[];
  
  // Step 5
  contact: {
    fullName: string;
    companyName?: string;
    email: string;
    phone: string;
    country: string;
    cityOrPort?: string;
  };
  additionalNotes?: string;
  
  // Admin workflow
  status: RequirementStatus;
  adminNotes?: string[];
  assignedTo?: string;
  updatedAt: string;
}
