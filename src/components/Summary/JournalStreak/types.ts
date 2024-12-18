export interface JournalStreakStats {
  currentStreak: number;
  longestStreak: number;
  totalEntries: number;
  weeklyGoal: number;
  progress: number;
}

export interface JournalStreakProps {
  stats: JournalStreakStats;
}