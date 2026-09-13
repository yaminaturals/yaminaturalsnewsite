export interface ProductSpecification {
  appearance?: string;
  botanicalName?: string;
  activeCompound?: string;
  standardization?: string;
  meshSize?: string;
  moistureContent?: string;
  solubility?: string;
  shelfLife?: string;
  storageInstructions?: string;
  countryOfOrigin?: string;
  grade?: string;
}

export interface ProductDocument {
  id: string;
  title: string;
  fileUrl: string;
  fileType: 'pdf' | 'doc' | 'image';
  fileSizeBytes?: number;
  isDownloadable: boolean;
}

export type ProductAvailability = 'in-stock' | 'procurement-on-demand' | 'seasonal-harvest';

export interface Product {
  id: string;
  slug: string;
  name: string;
  botanicalName: string;
  categoryId: string;
  categoryName?: string;
  shortDescription: string;
  fullDescription: string;
  images: string[];
  primaryImage: string;
  applications: string[];
  specifications: ProductSpecification;
  packagingOptions: string[];
  documents: ProductDocument[];
  availability: ProductAvailability;
  featured: boolean;
  b2bAvailable: boolean;
  b2cAvailable: boolean;
  minimumOrderQuantity?: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  createdAt: string;
  updatedAt: string;
}
