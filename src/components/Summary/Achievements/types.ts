export type AchievementType = 
  | 'productivity'
  | 'learning'
  | 'health'
  | 'focus'
  | 'social'
  | 'milestone';

export interface Achievement {
  id: string;
  text: string;
  type: AchievementType;
  metric?: string;
  date: Date;
}