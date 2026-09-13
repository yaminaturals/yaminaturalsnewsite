import { ProductCategory } from '../types';
import { initialCategories } from '../data/categories.data';
import { storageService } from './StorageService';

export interface ICategoryService {
  getCategories(): Promise<ProductCategory[]>;
  getCategoryBySlug(slug: string): Promise<ProductCategory | null>;
  getCategoryById(id: string): Promise<ProductCategory | null>;
}

class CategoryService implements ICategoryService {
  private storageKey = 'categories_list';

  private getStoredCategories(): ProductCategory[] {
    return storageService.getItem<ProductCategory[]>(this.storageKey, initialCategories);
  }

  async getCategories(): Promise<ProductCategory[]> {
    return this.getStoredCategories().sort((a, b) => a.displayOrder - b.displayOrder);
  }

  async getCategoryBySlug(slug: string): Promise<ProductCategory | null> {
    const categories = this.getStoredCategories();
    return categories.find(c => c.slug === slug) || null;
  }

  async getCategoryById(id: string): Promise<ProductCategory | null> {
    const categories = this.getStoredCategories();
    return categories.find(c => c.id === id) || null;
  }
}

export const categoryService = new CategoryService();
