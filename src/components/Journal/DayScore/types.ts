export interface DayScore {
  date: string;
  score: 'challenging' | 'average' | 'good' | 'excellent' | null;
}

export interface ScoreLegendItem {
  score: DayScore['score'];
  title: string;
  description: string;
}

export interface CalendarDay {
  date: string;
  weekIndex: number;
  dayName: string;
}