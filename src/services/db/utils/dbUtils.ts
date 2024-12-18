// Database utilities
export const retryOperation = async <T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  let lastError: Error | undefined;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error');
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
      }
    }
  }

  throw lastError;
};

export const validateStoreExists = (
  db: IDBDatabase,
  storeName: string
): boolean => {
  return db.objectStoreNames.contains(storeName);
};

export const createTransaction = (
  db: IDBDatabase,
  storeNames: string | string[],
  mode: IDBTransactionMode = 'readonly'
): IDBTransaction => {
  const stores = Array.isArray(storeNames) ? storeNames : [storeNames];
  if (!stores.every(store => validateStoreExists(db, store))) {
    throw new Error('One or more stores do not exist');
  }
  return db.transaction(stores, mode);
};