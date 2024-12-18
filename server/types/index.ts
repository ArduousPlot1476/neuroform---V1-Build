// Extend the existing types.ts file with new interfaces
export interface JournalEntry {
  id: string;
  type: 'morning' | 'evening' | 'ftd';
  content: string;
  userId: string;
  createdAt: Date;
}

export interface FocusSession {
  id: string;
  startTime: Date;
  duration: number;
  completed: boolean;
  userId: string;
}

export interface MentorSession {
  id: string;
  mentorId: string;
  userId: string;
  startTime: Date;
  duration: number;
  notes?: string;
  completed: boolean;
}