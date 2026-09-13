export interface ProductCategory {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription?: string;
  iconName?: string;
  imageUrl?: string;
  productCount: number;
  featured: boolean;
  displayOrder: number;
}
