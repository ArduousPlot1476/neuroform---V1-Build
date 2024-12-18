export interface FocusSessionStats {
  totalSessions: number;
  totalMinutes: number;
  completedSessions: number;
}

export interface FocusSessionFilters {
  startDate: Date;
  endDate: Date;
  userId: string;
}