import { ProductCategory, Product } from '../types';
import { initialCategories } from '../data/categories.data';
import { initialProducts } from '../data/products.data';
import { storageService } from './StorageService';

export interface ICategoryService {
  getCategories(): Promise<ProductCategory[]>;
  getCategoryBySlug(slug: string): Promise<ProductCategory | null>;
  getCategoryById(id: string): Promise<ProductCategory | null>;
  saveCategories(categories: ProductCategory[]): Promise<ProductCategory[]>;
  updateCategory(id: string, updates: Partial<ProductCategory>): Promise<ProductCategory | null>;
  subscribe(listener: (categories: ProductCategory[]) => void): () => void;
}

class CategoryService implements ICategoryService {
  private storageKey = 'categories_list';
  private productsStorageKey = 'products_list';
  private listeners: Set<(categories: ProductCategory[]) => void> = new Set();

  constructor() {
    // Listen for storage events across tabs
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (e) => {
        if (e.key === this.storageKey || e.key === this.productsStorageKey) {
          this.notifyListeners();
        }
      });
      window.addEventListener('yami:categories-updated', () => {
        this.notifyListeners();
      });
      window.addEventListener('yami:products-updated', () => {
        this.notifyListeners();
      });
    }
  }

  private getStoredCategories(): ProductCategory[] {
    const stored = storageService.getItem<ProductCategory[]>(this.storageKey, initialCategories);
    const products = storageService.getItem<Product[]>(this.productsStorageKey, initialProducts);

    return stored.map((cat) => {
      const initial = initialCategories.find((ic) => ic.id === cat.id);
      
      // Calculate actual count of products assigned to this category
      const actualProductCount = products.filter(
        (p) => p.categoryId === cat.id || (cat.slug && p.categoryId === `cat-${cat.slug}`)
      ).length;

      return {
        ...cat,
        productCount: actualProductCount,
        imageUrl: cat.imageUrl || initial?.imageUrl,
        shortDescription: initial?.shortDescription || cat.shortDescription,
      };
    });
  }

  private notifyListeners(): void {
    const cats = this.getStoredCategories().sort((a, b) => a.displayOrder - b.displayOrder);
    this.listeners.forEach((listener) => {
      try {
        listener(cats);
      } catch (err) {
        console.error('Error in category listener:', err);
      }
    });
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

  async saveCategories(categories: ProductCategory[]): Promise<ProductCategory[]> {
    storageService.setItem(this.storageKey, categories);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('yami:categories-updated', { detail: categories }));
    }
    this.notifyListeners();
    return categories.sort((a, b) => a.displayOrder - b.displayOrder);
  }

  async updateCategory(id: string, updates: Partial<ProductCategory>): Promise<ProductCategory | null> {
    const categories = this.getStoredCategories();
    const index = categories.findIndex(c => c.id === id);
    if (index === -1) return null;

    categories[index] = { ...categories[index], ...updates };
    await this.saveCategories(categories);
    return categories[index];
  }

  subscribe(listener: (categories: ProductCategory[]) => void): () => void {
    this.listeners.add(listener);
    // Initial call with computed actual counts
    listener(this.getStoredCategories().sort((a, b) => a.displayOrder - b.displayOrder));
    return () => {
      this.listeners.delete(listener);
    };
  }
}

export const categoryService = new CategoryService();
