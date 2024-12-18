export interface JournalEntry {
  feeling: string;
  thinking: string;
  doing: string;
  intensity: number;
}

export type IntensityLevel = 'Tolerable' | 'Challenging' | 'Difficult' | 'Unbearable';

export interface IntensityRange {
  level: IntensityLevel;
  min: number;
  max: number;
}