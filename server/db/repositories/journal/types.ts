export interface JournalEntryFilters {
  userId: string;
  type?: 'morning' | 'evening' | 'ftd';
  startDate?: Date;
  endDate?: Date;
}

export interface JournalStats {
  totalEntries: number;
  entriesByType: {
    morning: number;
    evening: number;
    ftd: number;
  };
  currentStreak: number;
  longestStreak: number;
}

export interface CreateJournalEntryData {
  userId: string;
  type: 'morning' | 'evening' | 'ftd';
  content: string;
}

export interface UpdateJournalEntryData {
  content: string;
}