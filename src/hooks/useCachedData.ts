import { useState, useEffect } from 'react';
import { cacheManager } from '../services/cache/CacheManager';

interface UseCachedDataOptions<T> {
  key: string;
  fetchFn: () => Promise<T>;
  ttl?: number;
  deps?: any[];
}

export function useCachedData<T>({
  key,
  fetchFn,
  ttl,
  deps = []
}: UseCachedDataOptions<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Check cache first
        const cachedData = cacheManager.get<T>(key);
        if (cachedData) {
          setData(cachedData);
          setLoading(false);
          return;
        }

        // Fetch fresh data
        setLoading(true);
        const freshData = await fetchFn();
        
        // Cache the result
        cacheManager.set(key, freshData, ttl);
        
        setData(freshData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch data'));
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, deps);

  return { data, loading, error };
}