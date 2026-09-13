import { CustomerRequirement } from '../types';

export const initialRequirements: CustomerRequirement[] = [
  {
    id: 'req-001',
    referenceNumber: 'YN-REQ-2026-0042',
    createdAt: '2026-03-01T09:24:00Z',
    customerType: 'b2b',
    requirementType: 'herbal-extract',
    productName: 'Ashwagandha Root Extract (Standardized)',
    botanicalOrInciName: 'Withania somnifera',
    requiredQuantity: '500',
    quantityUnit: 'kg',
    applicationUse: 'Capsule Formulation for Adaptogen Dietary Supplement',
    specificationStandard: 'USP Standard, Withanolides >= 5% by HPLC',
    packagingPreference: '25 kg Fiber Drums',
    documents: [
      {
        id: 'doc-spec-01',
        name: 'Target_Specification_Doc_V2.pdf',
        sizeBytes: 245000,
        mimeType: 'application/pdf',
        uploadedAt: '2026-03-01T09:23:00Z',
      }
    ],
    contact: {
      fullName: 'Dr. Marcus Vance',
      companyName: 'Apex Botanical Labs LLC',
      email: 'm.vance@apexbotanicals.example.com',
      phone: '+1 555-019-2834',
      country: 'United States',
      cityOrPort: 'Long Beach, CA',
    },
    additionalNotes: 'Need preliminary Certificate of Analysis for heavy metals (lead, arsenic, cadmium) and pesticide screen before placing commercial PO.',
    status: 'new',
    adminNotes: ['Reviewing CoA availability with quality team.'],
    updatedAt: '2026-03-01T09:24:00Z',
  },
  {
    id: 'req-002',
    referenceNumber: 'YN-REQ-2026-0039',
    createdAt: '2026-02-28T14:15:00Z',
    customerType: 'b2c',
    requirementType: 'herbal-powder',
    productName: 'Moringa Leaf Powder (Organic Micro-Milled)',
    botanicalOrInciName: 'Moringa oleifera',
    requiredQuantity: '5',
    quantityUnit: 'kg',
    applicationUse: 'Direct wellness tea and smoothie blending',
    packagingPreference: '1 kg vacuum sealed pouches',
    documents: [],
    contact: {
      fullName: 'Aisha Patel',
      email: 'aisha.p@example.com',
      phone: '+44 7700 900123',
      country: 'United Kingdom',
      cityOrPort: 'London',
    },
    additionalNotes: 'Looking for continuous monthly delivery if quality is satisfactory.',
    status: 'in-review',
    updatedAt: '2026-02-28T15:00:00Z',
  }
];
