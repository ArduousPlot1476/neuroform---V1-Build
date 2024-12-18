import React from 'react';
import { getIntensityLevel, getIntensityColor } from '../utils/intensityUtils';
import type { IntensityLevel } from '../types';

interface IntensityDisplayProps {
  value: number;
}

const IntensityDisplay: React.FC<IntensityDisplayProps> = ({ value }) => {
  const level: IntensityLevel = getIntensityLevel(value);
  const colorClass = getIntensityColor(level);

  return (
    <div className="flex justify-between items-center">
      <span className="text-sm">
        Level: <span className={`font-medium ${colorClass}`}>{level}</span>
      </span>
      <span className="text-sm text-gray-600">{value}/10</span>
    </div>
  );
};

export default IntensityDisplay;