// Sync utilities
export const calculateSyncDiff = <T extends { id: string }>(
  localItems: T[],
  serverItems: T[]
): {
  toAdd: T[];
  toUpdate: T[];
  toDelete: string[];
} => {
  const localById = new Map(localItems.map(item => [item.id, item]));
  const serverById = new Map(serverItems.map(item => [item.id, item]));

  const toAdd: T[] = [];
  const toUpdate: T[] = [];
  const toDelete: string[] = [];

  // Find items to add or update
  serverItems.forEach(serverItem => {
    const localItem = localById.get(serverItem.id);
    if (!localItem) {
      toAdd.push(serverItem);
    } else if (JSON.stringify(localItem) !== JSON.stringify(serverItem)) {
      toUpdate.push(serverItem);
    }
  });

  // Find items to delete
  localItems.forEach(localItem => {
    if (!serverById.has(localItem.id)) {
      toDelete.push(localItem.id);
    }
  });

  return { toAdd, toUpdate, toDelete };
};

export const batchSync = async <T>(
  items: T[],
  batchSize: number,
  syncFn: (batch: T[]) => Promise<void>
): Promise<void> => {
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    await syncFn(batch);
  }
};