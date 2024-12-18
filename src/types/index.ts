export interface Mentor {
  id: string;
  name: string;
  expertise: string;
  rating: number;
  reviewCount: number;
  nextAvailable: string;
  sessionLength: number;
  avatarUrl: string;
  bio: string;
  calendarUrl?: string;
}

export interface WallPost {
  id: string;
  author: {
    name: string;
    type: 'user' | 'mentor' | 'system';
    avatarUrl: string;
  };
  content: {
    type: 'text' | 'weekly_summary';
    date: string;
    likes: number;
    comments: number;
    text?: string;
    title?: string;
    report?: {
      title: string;
      content: string[];
    };
  };
}

export interface Task {
  id: string;
  title: string;
  category: 'inbox' | 'next' | 'projects' | 'waiting' | 'someday';
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
}

export interface WeeklySummary {
  weekStart: Date;
  weekEnd: Date;
  achievements: string[];
  challenges: string[];
  insights: string[];
  focusTimeProgress: number;
  journalingStreak: number;
}