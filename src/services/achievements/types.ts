export type AchievementTrigger = 
  | 'COMPLETE_FOCUS_SESSION'
  | 'MAINTAIN_JOURNAL_STREAK'
  | 'COMPLETE_COURSE'
  | 'REACH_TASK_COMPLETION_RATE'
  | 'MAINTAIN_EXERCISE_ROUTINE'
  | 'COMPLETE_MENTOR_SESSION';

export interface AchievementProgress {
  focusSessions: number;
  journalStreak: number;
  coursesCompleted: number;
  taskCompletionRate: number;
  weeklyWorkouts: number;
  mentorSessions: number;
}

export interface AchievementCriteria {
  type: AchievementTrigger;
  threshold: number;
  text: string;
  metric: string;
}