import { storageService } from './StorageService';

class VisitorCounterService {
  private localKey = 'yn_global_visitor_count';
  private sessionTrackKey = 'yn_session_visitor_registered';
  private namespace = 'yaminaturals_official_prod';
  private key = 'visits';

  /**
   * Registers a new visitor session globally in the database.
   * Only increments on a new visitor session (no false count on page refresh).
   */
  async recordNewVisitor(): Promise<number> {
    const isSessionCounted = typeof window !== 'undefined' && sessionStorage.getItem(this.sessionTrackKey);

    if (!isSessionCounted) {
      try {
        const res = await fetch(`https://abacus.jasoncameron.dev/hit/${this.namespace}/${this.key}`, {
          signal: AbortSignal.timeout(4000)
        });
        if (res.ok) {
          const data = await res.json();
          if (typeof data.value === 'number') {
            if (typeof window !== 'undefined') {
              sessionStorage.setItem(this.sessionTrackKey, 'true');
            }
            storageService.setItem(this.localKey, data.value);
            return data.value;
          }
        }
      } catch (err) {
        console.warn('Live counter hit error, using cached count:', err);
      }
    }

    // If already counted in this session or fallback, get current count
    return this.fetchLatestCount();
  }

  /**
   * Fetches the latest actual visitor count from the global database without incrementing.
   */
  async fetchLatestCount(): Promise<number> {
    try {
      const res = await fetch(`https://abacus.jasoncameron.dev/get/${this.namespace}/${this.key}`, {
        signal: AbortSignal.timeout(3500)
      });
      if (res.ok) {
        const data = await res.json();
        if (typeof data.value === 'number') {
          storageService.setItem(this.localKey, data.value);
          return data.value;
        }
      }
    } catch {
      // Fallback to local cache if network/offline
    }

    return storageService.getItem<number>(this.localKey, 1);
  }

  /**
   * Returns locally cached count synchronously
   */
  getCachedCount(): number {
    return storageService.getItem<number>(this.localKey, 1);
  }
}

export const visitorCounterService = new VisitorCounterService();

