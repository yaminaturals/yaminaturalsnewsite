/**
 * Storage Service - Local Persistence Abstraction
 * Handles safe client-side caching and state persistence during prototype phase.
 */
class StorageService {
  private prefix = 'yami_naturals_';

  getItem<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(this.prefix + key);
      if (!item) return defaultValue;
      return JSON.parse(item) as T;
    } catch (e) {
      console.warn(`Error reading ${key} from storage:`, e);
      return defaultValue;
    }
  }

  setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(this.prefix + key, JSON.stringify(value));
    } catch (e) {
      console.warn(`Error writing ${key} to storage:`, e);
    }
  }

  removeItem(key: string): void {
    try {
      localStorage.removeItem(this.prefix + key);
    } catch (e) {
      console.warn(`Error removing ${key} from storage:`, e);
    }
  }
}

export const storageService = new StorageService();
