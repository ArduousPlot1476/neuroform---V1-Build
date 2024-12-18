export type TimeFormatOptions = '12h' | '24h';

export interface TimeBlock {
  id: string;
  time: string;
  activity: string;
  icon?: string;
  color: string;
  dayType: 'daily' | 'saturday' | 'sunday';
}

export interface ScheduleColumn {
  id: string;
  title: string;
  blocks: TimeBlock[];
}