export interface JournalEntry {
  feeling: string;
  thinking: string;
  doing: string;
  intensity: number;
}

export interface MorningEntry {
  gratitude: string;
  date: Date;
}

export interface EveningEntry {
  reflection: string;
  date: Date;
}

export type IntensityLevel = 'Tolerable' | 'Challenging' | 'Difficult' | 'Unbearable';

export interface IntensityRange {
  level: IntensityLevel;
  min: number;
  max: number;
}