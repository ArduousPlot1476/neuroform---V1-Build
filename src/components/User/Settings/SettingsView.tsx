import React from 'react';
import { SettingsSection } from './SettingsSection';
import { useSettings } from '../../../hooks/useSettings';

const SettingsView: React.FC = () => {
  const { settings, updateSettings, isLoading } = useSettings();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <div className="space-y-6">
        <SettingsSection
          title="Notifications"
          description="Configure how you receive notifications"
          isLoading={isLoading}
          settings={settings.notifications}
          onUpdate={(value) => updateSettings({ notifications: value })}
        />

        <SettingsSection
          title="Privacy"
          description="Manage your privacy preferences"
          isLoading={isLoading}
          settings={settings.privacy}
          onUpdate={(value) => updateSettings({ privacy: value })}
        />

        <SettingsSection
          title="Theme"
          description="Customize your visual experience"
          isLoading={isLoading}
          settings={settings.theme}
          onUpdate={(value) => updateSettings({ theme: value })}
        />
      </div>
    </div>
  );
};

export default SettingsView;