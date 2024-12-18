import React from 'react';
import { useEmotionalState } from '../../hooks/useEmotionalState';

interface ProgressBarProps {
  label: string;
  value: string | number;
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ label, value, progress }) => {
  const moodData = useEmotionalState();

  // If this is the Daily Mood progress bar, use the emotional tracker data
  if (label === 'Daily Mood') {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-sm font-medium text-gray-600 mb-2">{label}</h3>
        <div className="space-y-2">
          <div className="text-2xl font-bold">{moodData.label}</div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gray-900 rounded-full transition-all duration-500"
              style={{ width: `${moodData.progress}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  // For other progress bars, use the provided values
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-sm font-medium text-gray-600 mb-2">{label}</h3>
      <div className="space-y-2">
        <div className="text-2xl font-bold">{value}</div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gray-900 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;