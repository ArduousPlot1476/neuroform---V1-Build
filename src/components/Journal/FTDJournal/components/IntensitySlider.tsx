import React from 'react';
import IntensityDisplay from './IntensityDisplay';
import { INTENSITY_RANGES } from '../utils/intensityUtils';

interface IntensitySliderProps {
  value: number;
  onChange: (value: number) => void;
}

const IntensitySlider: React.FC<IntensitySliderProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <IntensityDisplay value={value} />
      
      <input
        type="range"
        min="1"
        max="10"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
      />
      
      <div className="flex justify-between text-sm text-gray-500">
        <span>{INTENSITY_RANGES[0].level}</span>
        <span>{INTENSITY_RANGES[INTENSITY_RANGES.length - 1].level}</span>
      </div>
    </div>
  );
};

export default IntensitySlider;