export interface FocusTimeStats {
  totalSessions: number;
  totalMinutes: number;
  weeklyGoal: number;
  progress: number;
}

export interface FocusTimeProps {
  stats: FocusTimeStats;
}