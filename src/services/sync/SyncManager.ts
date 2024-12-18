import { apiClient } from '../api/client';
import { ENDPOINTS } from '../api/config';
import type { SyncData } from '../api/types';
import { getLastSyncTimestamp, setLastSyncTimestamp } from './storage';

class SyncManager {
  private syncInProgress = false;
  private syncQueue: Array<() => Promise<void>> = [];

  public async syncData(): Promise<void> {
    if (this.syncInProgress) {
      return new Promise((resolve) => {
        this.syncQueue.push(async () => {
          await this.performSync();
          resolve();
        });
      });
    }

    this.syncInProgress = true;

    try {
      await this.performSync();
    } finally {
      this.syncInProgress = false;
      this.processSyncQueue();
    }
  }

  private async performSync(): Promise<void> {
    const lastSync = getLastSyncTimestamp();
    const localData = this.getLocalData();

    try {
      const { data } = await apiClient.post<SyncData>(ENDPOINTS.data.sync, {
        lastSync,
        ...localData,
      });

      await this.processServerUpdates(data);
      setLastSyncTimestamp(Date.now());
    } catch (error) {
      console.error('Sync failed:', error);
      throw error;
    }
  }

  private async processSyncQueue(): Promise<void> {
    const nextSync = this.syncQueue.shift();
    if (nextSync) {
      await nextSync();
    }
  }

  private getLocalData(): Partial<SyncData> {
    return {
      tasks: this.getLocalTasks(),
      journal: this.getLocalJournal(),
      focus: this.getLocalFocus(),
    };
  }

  private getLocalTasks(): unknown[] {
    // Implement local task data retrieval
    return [];
  }

  private getLocalJournal(): unknown[] {
    // Implement local journal data retrieval
    return [];
  }

  private getLocalFocus(): unknown[] {
    // Implement local focus data retrieval
    return [];
  }

  private async processServerUpdates(data: SyncData): Promise<void> {
    // Implement server data processing
    // Update local storage with new data
    // Handle conflicts if any
  }
}

export const syncManager = new SyncManager();