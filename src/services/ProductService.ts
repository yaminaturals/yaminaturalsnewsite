import { Product } from '../types';
import { initialProducts } from '../data/products.data';
import { storageService } from './StorageService';

export interface ProductFilterOptions {
  categoryId?: string;
  categorySlug?: string;
  searchQuery?: string;
  isFeatured?: boolean;
  b2bOnly?: boolean;
  b2cOnly?: boolean;
}

export interface IProductService {
  getProducts(filters?: ProductFilterOptions): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | null>;
  getProductById(id: string): Promise<Product | null>;
  createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product>;
  updateProduct(id: string, updates: Partial<Product>): Promise<Product | null>;
  deleteProduct(id: string): Promise<boolean>;
}

class ProductService implements IProductService {
  private storageKey = 'products_list';

  private getStoredProducts(): Product[] {
    return storageService.getItem<Product[]>(this.storageKey, initialProducts);
  }

  private saveStoredProducts(products: Product[]): void {
    storageService.setItem(this.storageKey, products);
  }

  async getProducts(filters?: ProductFilterOptions): Promise<Product[]> {
    let products = this.getStoredProducts();

    if (filters) {
      if (filters.categoryId) {
        products = products.filter(p => p.categoryId === filters.categoryId);
      }
      if (filters.isFeatured !== undefined) {
        products = products.filter(p => p.featured === filters.isFeatured);
      }
      if (filters.b2bOnly) {
        products = products.filter(p => p.b2bAvailable);
      }
      if (filters.b2cOnly) {
        products = products.filter(p => p.b2cAvailable);
      }
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase().trim();
        products = products.filter(p => 
          p.name.toLowerCase().includes(q) ||
          p.botanicalName.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          (p.categoryName && p.categoryName.toLowerCase().includes(q)) ||
          p.applications.some(app => app.toLowerCase().includes(q))
        );
      }
    }

    return products;
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    const products = this.getStoredProducts();
    return products.find(p => p.slug === slug) || null;
  }

  async getProductById(id: string): Promise<Product | null> {
    const products = this.getStoredProducts();
    return products.find(p => p.id === id) || null;
  }

  async createProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    const products = this.getStoredProducts();
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    products.unshift(newProduct);
    this.saveStoredProducts(products);
    return newProduct;
  }

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
    const products = this.getStoredProducts();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;

    products[index] = {
      ...products[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.saveStoredProducts(products);
    return products[index];
  }

  async deleteProduct(id: string): Promise<boolean> {
    const products = this.getStoredProducts();
    const filtered = products.filter(p => p.id !== id);
    if (filtered.length === products.length) return false;
    this.saveStoredProducts(filtered);
    return true;
  }
}

export const productService = new ProductService();
