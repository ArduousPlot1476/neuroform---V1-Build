import React from 'react';
import { Switch } from '../../common/Switch';
import { LoadingSpinner } from '../../common/LoadingSpinner';

interface SettingsSectionProps {
  title: string;
  description: string;
  settings: Record<string, boolean>;
  isLoading: boolean;
  onUpdate: (settings: Record<string, boolean>) => void;
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({
  title,
  description,
  settings,
  isLoading,
  onUpdate,
}) => {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-gray-600 text-sm mt-1">{description}</p>
      
      <div className="mt-4 space-y-4">
        {Object.entries(settings).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              {key.split('_').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ')}
            </span>
            <Switch
              checked={value}
              onChange={(checked) => onUpdate({ ...settings, [key]: checked })}
            />
          </div>
        ))}
      </div>
    </div>
  );
};