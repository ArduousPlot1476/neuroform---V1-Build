import React from 'react';

interface IntensitySliderProps {
  value: number;
  onChange: (value: number) => void;
}

const IntensitySlider: React.FC<IntensitySliderProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">Level: {value === 1 ? 'Tolerable' : value === 10 ? 'Unbearable' : `Level ${value}`}</span>
        <span className="text-sm text-gray-600">{value}/10</span>
      </div>
      <input
        type="range"
        min="1"
        max="10"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
      />
      <div className="flex justify-between text-sm text-gray-500">
        <span>Tolerable</span>
        <span>Unbearable</span>
      </div>
    </div>
  );
};

export default IntensitySlider;