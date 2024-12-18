import type { IntensityLevel, IntensityRange } from '../types';

export const INTENSITY_RANGES: IntensityRange[] = [
  { level: 'Tolerable', min: 1, max: 3 },
  { level: 'Challenging', min: 4, max: 6 },
  { level: 'Difficult', min: 7, max: 8 },
  { level: 'Unbearable', min: 9, max: 10 },
];

export const getIntensityLevel = (value: number): IntensityLevel => {
  const range = INTENSITY_RANGES.find(
    range => value >= range.min && value <= range.max
  );
  return range?.level || 'Tolerable';
};

export const getIntensityColor = (level: IntensityLevel): string => {
  const colors: Record<IntensityLevel, string> = {
    'Tolerable': 'text-green-600',
    'Challenging': 'text-yellow-600',
    'Difficult': 'text-orange-600',
    'Unbearable': 'text-red-600',
  };
  return colors[level];
};