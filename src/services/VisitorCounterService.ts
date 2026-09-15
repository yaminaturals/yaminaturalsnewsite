import { storageService } from './StorageService';

class VisitorCounterService {
  private storageKey = 'yn_actual_visitor_count';

  /**
   * Records a visit whenever the website is opened.
   * Increments the actual count for every visit / session.
   */
  recordVisit(): number {
    try {
      const currentCount = storageService.getItem<number>(this.storageKey, 0);
      const newCount = currentCount + 1;
      storageService.setItem(this.storageKey, newCount);
      return newCount;
    } catch {
      return 1;
    }
  }

  /**
   * Retrieves the current actual visitor count.
   */
  getVisitorCount(): number {
    try {
      const count = storageService.getItem<number>(this.storageKey, 0);
      return count > 0 ? count : 1;
    } catch {
      return 1;
    }
  }
}

export const visitorCounterService = new VisitorCounterService();
