import { UserSettings } from '../../types';
import { apiClient } from '../api/client';

class SettingsService {
  private readonly BASE_PATH = '/api/settings';

  public async getSettings(): Promise<UserSettings> {
    const { data } = await apiClient.get<UserSettings>(this.BASE_PATH);
    return data;
  }

  public async updateSettings(updates: Partial<UserSettings>): Promise<UserSettings> {
    const { data } = await apiClient.patch<UserSettings>(this.BASE_PATH, updates);
    return data;
  }
}

export const settingsService = new SettingsService();