import { useState, useEffect } from 'react';
import { settingsService } from '../services/settings';
import type { UserSettings } from '../types';

export const useSettings = () => {
  const [settings, setSettings] = useState<UserSettings>({
    notifications: {
      email_updates: true,
      push_notifications: true,
      weekly_summary: true,
    },
    privacy: {
      show_profile: true,
      share_progress: false,
    },
    theme: {
      dark_mode: false,
      high_contrast: false,
    },
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const userSettings = await settingsService.getSettings();
      setSettings(userSettings);
    } catch (error) {
      console.error('Failed to load settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateSettings = async (updates: Partial<UserSettings>) => {
    setIsLoading(true);
    try {
      const updatedSettings = await settingsService.updateSettings(updates);
      setSettings(updatedSettings);
    } catch (error) {
      console.error('Failed to update settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    settings,
    updateSettings,
    isLoading,
  };
};