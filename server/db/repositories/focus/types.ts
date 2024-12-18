export interface FocusSessionFilters {
  userId: string;
  startDate?: Date;
  endDate?: Date;
  completed?: boolean;
}

export interface FocusSessionStats {
  totalSessions: number;
  totalMinutes: number;
  completedSessions: number;
  averageDuration: number;
}

export interface CreateFocusSessionData {
  userId: string;
  startTime: Date;
  duration: number;
}