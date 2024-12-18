export interface FTDEntry {
  id: string;
  date: Date;
  intensity: number;
  feeling: string;
}

export interface FocusSession {
  id: string;
  startTime: Date;
  duration: number;
  completed: boolean;
}

export interface JournalEntry {
  id: string;
  date: Date;
  type: 'morning' | 'evening' | 'ftd';
}

export interface TaskProgress {
  completed: number;
  total: number;
  rate: number;
}